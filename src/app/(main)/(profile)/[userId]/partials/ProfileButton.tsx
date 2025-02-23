'use client';

import { usePathname } from 'next/navigation';
import CreditCard from '@/components/icons/CreditCard';

const ProfileButton = () => {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  return (
    <div className='relative flex flex-col items-center py-3 px-3 group cursor-pointer'>
      <div className='flex items-center space-x-2'>
        <CreditCard className='fill-primary-500' />
        <span className='text-base font-bold text-neutral-800'>Hồ sơ</span>
      </div>
      {/* Nếu đường dẫn là /me thì luôn hiển thị border-bottom */}
      <div
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 transition-all transform rounded-md 
    ${
      pathname === '/me/profile' ||
      pathname === '/me/jobtile' ||
      pathname === '/me/socials'
        ? 'opacity-100 scale-x-100'
        : 'opacity-0'
    }
  `}
      ></div>
    </div>
  );
};

export default ProfileButton;
