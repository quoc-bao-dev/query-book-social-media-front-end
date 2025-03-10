'use client';

import { Button } from '@/components/common/Button';
import MediaIcon from '@/components/icons/MediaIcon';
import VideoIcon from '@/components/icons/VideoIcon';
import { useAuth } from '@/store/authSignal';
import { sModalCreatePost } from './ModalCreatePost';

const PostCreate = () => {
  const { user } = useAuth();
  const showModal = () => {
    sModalCreatePost.set((n) => (n.value.isOpen = true));
  };

  return (
    <div className='py-3'>
      <div
        onClick={showModal}
        className='w-full gap-5 border rounded-xl p-4 bg-card'
      >
        <div
          onClick={showModal}
          className='w-full h-[100px] border border-gray-300 rounded-xl p-2 text-gray-600'
        >
          {user?.lastName} ơi, Bạn đang nghĩ gì thế?
        </div>
        <div className='flex justify-between items-center pt-2'>
          <div className='flex gap-4'>
            <div className='flex gap-2'>
              <div className=''>
                <MediaIcon className='size-6 fill-primary-500' />
              </div>
              <p>Image</p>
            </div>
            <div className='flex gap-2'>
              <div className=''>
                <VideoIcon className='text-primary-500' />
              </div>
              <p>Video</p>
            </div>
          </div>
          <div className=''>
            <Button className='w-24' onClick={showModal}>
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCreate;
