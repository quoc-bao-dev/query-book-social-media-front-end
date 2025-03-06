'use client';
import Avatar from '@/components/common/Avatar';
import Tooltip from '@/components/common/Tooltip';
import CommentIcon from '@/components/icons/CommentIcon';
import EllipsisVerticalIcon from '@/components/icons/EllipsisVerticalIcon';
import HeartIcon from '@/components/icons/HeartIcon';
import LockIcon from '@/components/icons/LockIcon';
import ShareIcon from '@/components/icons/ShareIcon';
import UsersIcon from '@/components/icons/UsersIcon';
import WorldIcon from '@/components/icons/WorldIcon';
import { useLikeMutation } from '@/queries/like';
import { useAuth } from '@/store/authSignal';
import { PostResponse } from '@/types/post';
import { formatDistanceToNow, parseISO } from 'date-fns';
import Image from 'next/image';
import { useCommentDetail } from '../signal/commentDetail';
import { useListImageDetail } from '../signal/listImageDetail';
import PostComment from './PostComment';
import PostImage from './PostImage';
import { cn } from '@/lib/utils';
import { useDeleteCommentMutation } from '@/queries/comment';
import { Button } from '@/components/common/Button';

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
  mode: 'onPage' | 'onModal';
}

const Post = ({ post, mode = 'onPage' }: PostProps) => {
  const { user } = useAuth();
  const { mutateAsync: likePost } = useLikeMutation();
  const { mutateAsync: deleteComment } = useDeleteCommentMutation();
  const { showModal, setImages, setCurIndex } = useListImageDetail();
  const { setCurPost, open } = useCommentDetail();

  // Chuyển đổi chuỗi thành đối tượng Date
  const date = parseISO(post.createdAt);

  // Tính toán khoảng cách thời gian từ thời điểm cụ thể đến hiện tại
  const distance = formatDistanceToNow(date, { addSuffix: true });

  const isLiked = post.likes.some((like) => like.id === user?.id);

  const handleLike = () => {
    likePost(post.id);
  };
  // console.log('post.comments', post.comments);

  const showDetail = (image: string) => () => {
    setImages([image]);
    setCurIndex(0);
    showModal();
  };

  console.log('post comment', post.comments);

  const showCommentDetail = () => {
    open();
    setCurPost(post);
  };

  const handleDeleteComment = async (id: string) => {
    console.log('delete comment', id);
    await deleteComment(id);
  };

  return (
    <>
      <div className='w-full gap-5 border rounded-xl py-4 bg-card'>
        <div className='px-4 pb-4'>
          <div className='flex justify-between'>
            <div className=''>
              <Avatar
                src={post.author?.avatarUrl}
                fallBack={post.author?.fullName}
                className=''
              ></Avatar>
            </div>

            <div className='text-left w-full px-4'>
              <div className='flex gap-1 items-center'>
                <div className=''>{post.author.fullName}</div>
                <div className='text-gray-600 text-sm flex gap-1 items-center'>
                  {post.status === 'public' && <WorldIcon className='size-4' />}
                  {post.status === 'friend' && <UsersIcon className='size-4' />}
                  {post.status === 'private' && <LockIcon className='size-4' />}
                  <p className='font-medium'>{post.status.toLowerCase()}</p>
                </div>
              </div>
              <div className='text-gray-600'>{distance}</div>
            </div>

            <div className=''>
              <EllipsisVerticalIcon />
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
        {/* show n comment khi click vào detail comment */}
        {post.comments
          .slice(0, mode === 'onPage' ? 1 : post.comments.length)
          .map((_comment) => (
            <div key={_comment.id} className='px-4 pt-2'>
              <div className='flex'>
                {/* user comment */}
                <div className='flex justify-center'>
                  <Avatar
                    className='w-[40px] h-[40px] rounded-[50%]'
                    src={_comment.avatarUrl}
                    fallBack={_comment.fullName}
                  />
                </div>
                {/* user comment */}
                {/* show comment */}
                <div className='w-auto h-auto'>
                  <div className='bg-gray-50 rounded-lg ml-3 py-2 px-3'>
                    <div className='text-neutral-900 '>
                      <p className='font-normal'>{_comment.fullName}</p>
                    </div>
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
                      <div
                        onClick={() => handleDeleteComment(_comment.id)}
                        className='flex items-center gap-1'
                      >
                        <button className='hover:text-error-500 hover:duration-300'>
                          Xóa
                        </button>
                      </div>
                    )}
                    <button className='hover:text-primary-500 hover:duration-300'>
                      Trả lời
                    </button>
                  </div>
                </div>
              </div>
              {/* delete & rep comment */}
            </div>
          ))}
        {/* show n comment khi click vào detail comment */}
        {mode === 'onPage' && (
          <div className='px-4 pt-3'>
            <PostComment postId={post.id} />
          </div>
        )}
        {/* comment */}
      </div>
    </>
  );
};

export default Post;
