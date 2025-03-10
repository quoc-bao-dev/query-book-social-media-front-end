import Avatar from '@/components/common/Avatar';
import { PostResponse } from '@/types/post';
import Image from 'next/image';
import { useListImageDetail } from '../signal/listImageDetail';
import { useCommentDetail } from '../signal/commentDetail';
import { useDeleteCommentMutation } from '@/queries/comment';
import { useAuth } from '@/store/authSignal';
import { useState } from 'react';
import { parseISO } from 'date-fns';
import LoadingIcon from '@/components/icons/LoadingIcon';
import Link from 'next/link';

export interface CommentReplyModalProps {
  ReplyComment: Pick<PostResponse, 'id' | 'author' | 'content'>;
  mode: 'onPage' | 'onModal';
}

const CommentReplyModal = ({ ReplyComment }: CommentReplyModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [commentId, setCommentId] = useState('');
  const { user } = useAuth();
  const { mutateAsync: deleteComment } = useDeleteCommentMutation();
  const { showModal, setImages, setCurIndex } = useListImageDetail();

  // const showDetail = (image: string) => () => {
  //   setImages([image]);
  //   setCurIndex(0);
  //   showModal();
  // };

  const handleDeleteComment = async (id: string) => {
    if (isLoading) return;
    setIsLoading(true);
    setCommentId(id);
    await deleteComment(id);
    setIsLoading(false);
  };

  return (
    <div className='flex py-1'>
      {/* user comment */}
      <Link href={`/${ReplyComment.author.id}`} className='flex justify-center'>
        <Avatar
          className='w-[40px] h-[40px] rounded-[50%]'
          src={ReplyComment.author.avatarUrl}
          fallBack={ReplyComment.author.fullName}
        />
      </Link>
      {/* user comment */}
      {/* show comment */}
      <div className='w-auto h-auto'>
        <div className='bg-gray-50 rounded-lg ml-3 py-2 px-3'>
          <Link
            href={`/${ReplyComment.author.id}`}
            className='text-neutral-900 '
          >
            <p className='font-normal'>{ReplyComment.author.fullName}</p>
          </Link>
          <div className='text-gray-900'> {ReplyComment.content}</div>
        </div>

        {/* {ReplyComment.mediaUrls && (
        <div className='py-1 pl-[12px]'>
          <Image
            src={ReplyComment.mediaUrls[0]}
            alt=''
            className='max-h-[150px] w-auto rounded-lg'
            width={1000}
            height={1000}
          />
        </div>
      )} */}
        {/* show comment */}

        {/* <div className='flex justify-end items-center px-1 gap-5 text-neutral-600 text-[14px] font-medium'>
          {ReplyComment.author.id === user?.id && (
            <>
              {isLoading && ReplyComment.id === commentId ? (
                <LoadingIcon size={15} color='#0abf7e' />
              ) : (
                <button
                  onClick={() => handleDeleteComment(ReplyComment.id)}
                  className='hover:text-error-500 hover:duration-300'
                >
                  Xóa
                </button>
              )}
            </>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default CommentReplyModal;
