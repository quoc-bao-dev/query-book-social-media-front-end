'use client';

import Modal from '@/components/common/Modal';
import DeleteIcon from '@/components/icons/DeleteIcon';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { sCommentDetail, useCommentDetail } from '../signal/commentDetail';
import Post from './Post';

const ModalCommentDetail = () => {
  const { isOpen, curPost } = sCommentDetail.use();
  const { close } = useCommentDetail();
  console.log('curPost', curPost);

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <div className='flex z-20'>
        <div className='relative w-[700px] rounded-lg bg-card'>
          <div className='relative'>
            <div className='w-full h-12 flex items-center justify-center font-semibold text-xl'>
              <p>Bài viết của {curPost?.author.fullName}</p>
            </div>
            <div
              onClick={close}
              className='bg-neutral-200 flex items-center justify-center absolute top-1 right-1 w-[30px] h-[30px] rounded-full '
            >
              <DeleteIcon className='size-8' />
            </div>
          </div>
          <div className='max-h-[660px] h-[660px]'>
            <ScrollArea className='w-full h-full rounded-xl'>
              <Post post={curPost} mode='onModal' />
              <ScrollBar orientation='vertical' />
            </ScrollArea>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ModalCommentDetail;
