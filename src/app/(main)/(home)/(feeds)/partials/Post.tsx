'use client';
import Tooltip from '@/components/common/Tooltip';
import CommentIcon from '@/components/icons/CommentIcon';
import EllipsisVerticalIcon from '@/components/icons/EllipsisVerticalIcon';
import HeartIcon from '@/components/icons/HeartIcon';
import ShareIcon from '@/components/icons/ShareIcon';
import { cn } from '@/lib/utils';
import { useLikeMutation } from '@/queries/like';
import { useAuth } from '@/store/authSignal';
import { PostResponse } from '@/types/post';
import { getFirstCharacter } from '@/utils/nameUtilts';
import { formatDistanceToNow, parseISO } from 'date-fns';
import Image from 'next/image';
import { useCommentDetail } from '../signal/commentDetail';
import { useListImageDetail } from '../signal/listImageDetail';
import PostComment from './PostComment';
import PostImage from './PostImage';
import Avatar from '@/components/common/Avatar';

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
  >;
  mode: 'onPage' | 'onModal';
}

const Post = ({ post, mode = 'onPage' }: PostProps) => {
  const { user } = useAuth();
  const { mutateAsync: likePost } = useLikeMutation(post.id);
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

  const showDetail = (image: string) => () => {
    setImages([image]);
    setCurIndex(0);
    showModal();
  };

  const showCommentDetail = () => {
    open();
    setCurPost(post);
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
              <div className=''>{post.author.fullName}</div>
              <div className='text-gray-600'>{distance}</div>
            </div>

            <div className=''>
              <EllipsisVerticalIcon />
            </div>
          </div>

          <div className='pt-4'>
            <p className=' whitespace-pre-line'>{post.content}</p>
          </div>
        </div>

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
                <div className='flex items-center '>
                  {post.likes
                    .sort((a) => (a.id !== user?.id ? 1 : -1))
                    .map((like, index) => (
                      // <Avatar
                      //   key={like.id}
                      //   className={cn('w-[25px] h-[25px] object-cover', {
                      //     '-ml-3': index > 0,
                      //     'rounded-[50%] z-30': index === 0,
                      //   })}
                      // >
                      //   <AvatarImage src={like.avatarUrl} />
                      //   <AvatarFallback>
                      //     <p className='text-xs'>
                      //       {getFirstCharacter(like.name)}
                      //     </p>
                      //   </AvatarFallback>
                      // </Avatar>
                      <p key={index}>{like.name}</p>
                    ))}
                </div>
              </Tooltip>
            </div>
          </div>
          <div className='flex text-neutral-500 justify-end py-4 gap-3'>
            <div onClick={showCommentDetail} className='flex'>
              <CommentIcon />
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
                    <div className=''>Xóa</div>
                    <div className=''>Trả lời</div>
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
