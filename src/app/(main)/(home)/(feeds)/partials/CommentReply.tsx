import Avatar from '@/components/common/Avatar';
import { useAuth } from '@/store/authSignal';
import { Replies } from '@/types/post';
import Image from 'next/image';
import Link from 'next/link';
import { useListImageDetail } from '../signal/listImageDetail';
import { sModalConfirm, useModalConfirm } from './ModalConfirm';

export interface CommentReplyModalProps {
  ReplyComment: Replies;
  postId: string;
}

const CommentReply = ({ ReplyComment, postId }: CommentReplyModalProps) => {
  const { user } = useAuth();
  const { openConfirm } = useModalConfirm();
  const { showModal, setImages, setCurIndex } = useListImageDetail();
  const showDetail = (image: string) => () => {
    setImages([image]);
    setCurIndex(0);
    showModal();
  };
  console.log('reply', ReplyComment);

  const openConfirmDeleteComment = async (id: string) => {
    openConfirm();
    sModalConfirm.set((n) => (n.value.Id = id));
    sModalConfirm.set((n) => (n.value.Type = 'comment'));
    sModalConfirm.set((n) => (n.value.postId = postId));
  };

  return (
    <div className='flex py-1'>
      {/* user comment */}
      <Link
        href={`/${ReplyComment?.author?.id}`}
        className='flex justify-center'
      >
        <Avatar
          className='w-[40px] h-[40px] rounded-[50%]'
          src={ReplyComment.author?.avatarUrl}
          fallBack={ReplyComment.author?.fullName}
        />
      </Link>
      {/* user comment */}
      {/* show comment */}
      <div className='w-auto h-auto'>
        <div className='bg-gray-50 rounded-lg ml-3 py-2 px-3'>
          <Link
            href={`/${ReplyComment?.author?.id}`}
            className='text-neutral-900 '
          >
            <p className='font-normal'>{ReplyComment.author?.fullName}</p>
          </Link>
          <div className='text-gray-900'> {ReplyComment?.content}</div>
          {ReplyComment.media && (
            <div className='py-1 pl-[12px]'>
              <Image
                src={ReplyComment?.mediaUrl}
                onClick={showDetail(ReplyComment?.mediaUrl)}
                alt=''
                className='max-h-[150px] w-auto rounded-lg'
                width={1000}
                height={1000}
              />
            </div>
          )}
        </div>
        {/* show comment */}

        <div className='flex justify-end items-center px-1 gap-5 text-neutral-600 text-[14px] font-medium'>
          {ReplyComment.author.id === user?.id && (
            <button
              onClick={() => openConfirmDeleteComment(ReplyComment.id)}
              className='hover:text-error-500 hover:duration-300'
            >
              Xóa
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentReply;
