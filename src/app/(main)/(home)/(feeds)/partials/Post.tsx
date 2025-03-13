'use client';
import Avatar from '@/components/common/Avatar';
import Tooltip from '@/components/common/Tooltip';
import CommentIcon from '@/components/icons/CommentIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';
import EditIcon from '@/components/icons/EditIcon';
import EllipsisVerticalIcon from '@/components/icons/EllipsisVerticalIcon';
import HeartIcon from '@/components/icons/HeartIcon';
import LoadingIcon from '@/components/icons/LoadingIcon';
import LockIcon from '@/components/icons/LockIcon';
import ReportIcon from '@/components/icons/ReportIcon';
import ShareIcon from '@/components/icons/ShareIcon';
import UsersIcon from '@/components/icons/UsersIcon';
import WorldIcon from '@/components/icons/WorldIcon';
import { cn } from '@/lib/utils';
import {
  useDeleteCommentMutation,
  useGetCommentQuery,
} from '@/queries/comment';
import { useLikeMutation } from '@/queries/like';
import { useAuth } from '@/store/authSignal';
import { Comment, PostResponse } from '@/types/post';
import { formatDistanceToNow, parseISO } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useCommentDetail } from '../signal/commentDetail';
import { useListImageDetail } from '../signal/listImageDetail';
import CommentReply from './CommentReply';
import { sModalCreatePost, useModalCreatePost } from './ModalCreatePost';
import PostComment from './PostComment';
import PostImage from './PostImage';

// FIXME: fix interface of post

export interface PostProps {
  post: Pick<
    PostResponse,
    | 'id'
    | 'author'
    | 'content'
    | 'hashTags'
    | 'mediaUrls'
    | 'createdAt'
    | 'likesCount'
    | 'likes'
    | 'comments'
    | 'commentsCount'
    | 'status'
    | 'updatedAt'
    | 'media'
    | 'mediaUrls'
  >;
  mode: string;
}

export type ReplyComment = {
  name: string;
  id: string;
  media?: string;
  content?: string;
  mediaUrl?: string;
};

const Post = ({ post, mode }: PostProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [commentId, setCommentId] = useState('');
  const [repComment, setRepComment] = useState<ReplyComment>({
    name: '',
    id: '',
  });
  const [isShow, setIsShow] = useState(false);

  const { data } = useGetCommentQuery(post.id);
  const { user } = useAuth();

  const { showModal, setImages, setCurIndex } = useListImageDetail();
  const { setCurPost, open } = useCommentDetail();
  const { setEditCurPost } = useModalCreatePost();

  const { mutateAsync: likePost, isPending } = useLikeMutation();
  const { mutateAsync: deleteComment } = useDeleteCommentMutation(post.id);

  // Chuyển đổi chuỗi thành đối tượng Date
  const date = parseISO(post.createdAt);

  // Tính toán khoảng cách thời gian từ thời điểm cụ thể đến hiện tại
  const distance = formatDistanceToNow(date, { addSuffix: true });
  const isLiked = post.likes.some((like) => like.id === user?.id);

  const menuRef = useRef<HTMLDivElement | null>(null);

  // Click ra ngoài màn hình sẽ nhận sk để xử lý hiển thị
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsShow(false); // Đóng menu nếu click bên ngoài
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const showEllipsisVertical = () => {
    setIsShow(!isShow);
  };

  // Lấy comment reply
  const comments: Comment[] = useMemo(() => {
    return mode === 'onModal'
      ? data?.data?.data.map((item: Comment) => ({
          ...item,
          id: item.id,
          userId: item.author.id,
          avatarUrl: item.author.avatarUrl,
          fullName: item.author.fullName,
        }))
      : post.comments;
  }, [data, post, mode]);

  const handleLike = async () => {
    if (isPending) return;
    await likePost(post.id);
  };

  const showDetail = (image: string) => () => {
    setImages([image]);
    setCurIndex(0);
    showModal();
  };

  const showCommentDetail = () => {
    open();
    setCurPost(post);
  };

  const handleDeleteComment = async (id: string) => {
    console.log(id);
    if (isLoading) return;
    setIsLoading(true);
    setCommentId(id);
    await deleteComment(id);
    setIsLoading(false);
  };

  // Lấy id và tên user cần trả lời comment
  const RepComment = (name: string, id: string) => {
    setRepComment({ name, id });
  };

  // Sk hiển thị form chỉnh sửa bài post
  const showEditPost = () => {
    setEditCurPost(post);
    sModalCreatePost.set((n) => (n.value.isOpen = true));
  };

  return (
    <>
      <div
        className={cn('w-full gap-5 border rounded-xl py-4 bg-card', {
          'pb-24': mode === 'onModal',
        })}
      >
        <div className='px-4 pb-4'>
          <div className='flex relative'>
            <Link href={`/${post.author.id}`} className=''>
              <Avatar
                src={post.author?.avatarUrl}
                fallBack={post.author?.fullName}
                className=''
              ></Avatar>
            </Link>

            <div className='text-left px-4'>
              <div className='flex gap-1 items-center'>
                <Link href={`/${post.author.id}`}>{post.author.fullName}</Link>
                <div className='text-gray-600 text-sm flex gap-1 items-center'>
                  {post.status === 'public' && <WorldIcon className='size-4' />}
                  {post.status === 'friend' && <UsersIcon className='size-4' />}
                  {post.status === 'private' && <LockIcon className='size-4' />}
                  <p className='font-medium'>{post.status.toLowerCase()}</p>
                </div>
              </div>
              <div className='text-gray-600'>{distance}</div>
            </div>

            <div
              ref={menuRef}
              onClick={showEllipsisVertical}
              className='absolute right-0 top-0 w-8 h-8 flex justify-center items-center hover:bg-gray-100 rounded-[50%]'
            >
              <EllipsisVerticalIcon />
            </div>

            <div
              className={cn(
                'absolute right-5 top-6 z-50 bg-card w-[350px] h-auto shadow-2xl p-2 rounded-md transition-transform duration-300 ease-out scale-100 origin-top-right',
                {
                  'duration-300 scale-0': isShow === false,
                },
              )}
            >
              <div
                onClick={showEditPost}
                className='py-1  pl-2 flex items-center hover:bg-gray-100 hover:rounded-md'
              >
                <EditIcon className='size-6 fill-slate-500' />
                <button className='text-left pl-3'>
                  <div className=''>Chỉnh sửa bài viết</div>
                  <div className='text-slate-300 text-[12px] '>
                    Bạn có thể chỉnh sửa bài viết của mình!
                  </div>
                </button>
              </div>

              <div className='py-1 flex pl-2 items-center hover:bg-gray-100 hover:rounded-md'>
                <DeleteIcon className='size-6 fill-slate-500' />
                <button className='text-left pl-3'>
                  <div className=''>Xóa bài viết</div>
                  <div className='text-slate-300 text-[12px] '>
                    Bài viết này sẽ xóa khỏi trang cá nhân của bạn?
                  </div>
                </button>
              </div>
              <div className='py-1 flex pl-2 items-center hover:bg-gray-100 hover:rounded-md'>
                <ReportIcon className='size-6 fill-slate-500' />
                <button className='text-left pl-3'>
                  <div className=''>Báo cáo bài viết</div>
                  <div className='text-slate-300 text-[12px] '>
                    Bạn muốn báo cáo gì về bài viết này?
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Show content */}
          <div className='pt-4'>
            <p className=' whitespace-pre-line'>{post.content}</p>
          </div>
        </div>

        {/* Show Image post */}
        <div className='relative px-1'>
          <PostImage lsImage={post.mediaUrls} />
        </div>

        <div className='grid grid-cols-2 px-4 border-b-[1px]'>
          <div className='flex py-4 items-center'>
            <div onClick={handleLike}>
              {!isLiked ? (
                <HeartIcon />
              ) : (
                <HeartIcon className='fill-error-500 stroke-error-500' />
              )}
            </div>

            <div className='pl-1 pr-3'>{post.likesCount}</div>

            <div className='w-full flex items-center'>
              <Tooltip
                content={
                  <div className=''>
                    {post.likes
                      .sort((a) => (a.id !== user?.id ? 1 : -1))
                      .map((like) => (
                        <p className='text-xs' key={like.id}>
                          {like.name}
                        </p>
                      ))}
                  </div>
                }
              >
                <div className='flex items-center ml-2'>
                  {post.likes
                    .sort((a) => (a.id !== user?.id ? 1 : -1))
                    .slice(0, 3)
                    .map((like, index) => (
                      <Avatar
                        key={like.id}
                        src={like.avatarUrl}
                        className={cn('w-[25px] h-[25px] object-cover -ml-3', {
                          'z-30': index === 0,
                          'z-20': index === 1,
                          'z-10': index === 2,
                        })}
                        fallBack={like.name}
                      />
                    ))}
                </div>
              </Tooltip>
            </div>
          </div>
          <div className='flex text-neutral-500 justify-end py-4 gap-3'>
            <div onClick={showCommentDetail} className='flex'>
              <CommentIcon className='hover:fill-primary-500 hover:scale-125 hover:duration-300' />
              <div className='pl-1'>{post.commentsCount}</div>
            </div>
            <ShareIcon />
          </div>
        </div>
        {/* comment */}
        {/* show comment khi click vào detail comment */}
        {comments
          .sort((a) => (a.userId === user?.id ? -1 : 1))
          .slice(0, mode === 'onPage' ? 2 : comments.length)
          .map((_comment) => (
            <div key={_comment.id} className='px-4 pt-2'>
              <div className='flex'>
                {/* user comment */}
                <Link href={`/${_comment.id}`} className='flex justify-center'>
                  <Avatar
                    className='w-[40px] h-[40px] rounded-[50%]'
                    src={_comment.avatarUrl}
                    fallBack={_comment.fullName}
                  />
                </Link>
                {/* user comment */}
                {/* show comment */}
                <div className='w-auto h-auto'>
                  <div className='bg-gray-50 rounded-lg ml-3 py-2 px-3'>
                    <Link
                      href={`/${_comment.userId}`}
                      className='text-neutral-900 '
                    >
                      <p className='font-normal'>{_comment.fullName}</p>
                    </Link>
                    <div className='text-gray-900'> {_comment.content}</div>
                  </div>

                  {_comment.mediaUrl && (
                    <div className='py-1 pl-[12px]'>
                      <Image
                        src={_comment.mediaUrl}
                        onClick={showDetail(_comment.mediaUrl)}
                        alt=''
                        className='max-h-[150px] w-auto rounded-lg'
                        width={1000}
                        height={1000}
                      />
                    </div>
                  )}
                  {/* show comment */}

                  <div className='flex justify-end items-center px-1 gap-5 text-neutral-600 text-[14px] font-medium'>
                    {_comment.userId === user?.id && (
                      <>
                        {isLoading && _comment.id === commentId ? (
                          <LoadingIcon size={15} color='#0abf7e' />
                        ) : (
                          <button
                            onClick={() => handleDeleteComment(_comment.id)}
                            className='hover:text-error-500 hover:duration-300'
                          >
                            Xóa
                          </button>
                        )}
                        <button
                          onClick={() =>
                            RepComment(_comment.fullName, _comment.id)
                          }
                          className='hover:text-primary-500 hover:duration-300'
                        >
                          Trả lời
                        </button>
                      </>
                    )}

                    {/* Trả lời comment */}
                    {_comment.userId !== user?.id && (
                      <button
                        onClick={() =>
                          RepComment(_comment.fullName, _comment.id)
                        }
                        className='hover:text-primary-500 hover:duration-300'
                      >
                        Trả lời
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {/* delete & rep comment */}

              {/* Show số lượng comment Reply khi ở trang home */}
              {mode === 'onPage' && (
                <div className='text-gray-600 ml-14'>
                  {_comment.replies.length > 0 && (
                    <button>{_comment.replies.length} câu trả lời</button>
                  )}
                </div>
              )}

              {/* show comment reply trong trang detail */}
              {mode === 'onModal' && (
                <div className='text-gray-600 ml-14'>
                  {_comment.replies.length > 0 &&
                    _comment.replies.map((comment, index) => (
                      <CommentReply
                        key={index}
                        ReplyComment={comment}
                        postId={post.id}
                      />
                    ))}
                </div>
              )}
            </div>
          ))}

        {/* Mode onModal thì hiển thị trong Comment Home */}
        {mode === 'onPage' && (
          <div className='px-4 pt-3'>
            {repComment.id ? (
              <>
                <div className='flex items-center ml-12 text-neutral-500'>
                  Trả lời: {repComment.name}
                  <div
                    onClick={() => setRepComment({ id: '', name: '' })}
                    className='pl-1'
                  >
                    <DeleteIcon className='size-4' />
                  </div>
                </div>
                <PostComment
                  postId={post.id}
                  idComment={repComment!.id}
                  mode='repLy'
                  onReply={() => setRepComment({ id: '', name: '' })}
                  // Truyền ref xuống component con
                />
              </>
            ) : (
              <PostComment postId={post.id} idComment={''} mode='onPage' />
            )}
          </div>
        )}
        {/* Mode onModal thì hiển thị trong Comment Home */}

        {/* Mode onModal thì hiển thị trong Comment Detail */}
        {mode === 'onModal' && (
          <div className='absolute bottom-0 z-50 w-full bg-card px-4 py-2'>
            {repComment.id.length > 0 ? (
              <>
                <div className='flex items-center ml-12 text-neutral-500'>
                  Trả lời: {repComment.name}
                  <div
                    onClick={() => setRepComment({ id: '', name: '' })}
                    className='pl-1'
                  >
                    <DeleteIcon className='size-4' />
                  </div>
                </div>
                <PostComment
                  postId={post.id}
                  idComment={repComment!.id}
                  mode='repLy'
                  onReply={() => {
                    setRepComment({ id: '', name: '' });
                  }}
                />
              </>
            ) : (
              <PostComment postId={post.id} idComment={''} mode='onPage' />
            )}
          </div>
        )}
        {/* Mode onModal thì hiển thị trong Comment Detail */}

        {/* comment */}
      </div>
    </>
  );
};

export default Post;
