'use client';

import DocumentText from '@/components/icons/Document-text';
import { usePathname } from 'next/navigation';
import { sCurUserProfileSignal } from '../../signal/curUserProfileSignal';

const PostButton = () => {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại
  const { user } = sCurUserProfileSignal.use();

  return (
    <div className='relative flex flex-col items-center py-3 px-2 group cursor-pointer'>
      <div className='flex items-center space-x-2'>
        <DocumentText className='fill-primary-500' />
        <span className='text-base font-bold text-neutral-800'>Bài viết</span>
      </div>
      {/* Thêm border-bottom khi hover mà không thay đổi kích thước */}
      {/* Nếu đường dẫn là /me thì luôn hiển thị border-bottom */}
      <div
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 transition-all transform rounded-md 
            ${
              pathname === '/me' || pathname === `/${user?.id}`
                ? 'opacity-100 scale-x-100'
                : 'opacity-0'
            }
          `}
      ></div>
    </div>
  );
};

export default PostButton;
