'use client';

import { usePathname } from 'next/navigation';
import CreditCard from '@/components/icons/CreditCard';
import { sCurUserProfileSignal } from '../../signal/curUserProfileSignal';

const ProfileButton = () => {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại
  const { user } = sCurUserProfileSignal.use();

  return (
    <div className='relative flex flex-col items-center py-3 px-3 group cursor-pointer'>
      <div className='flex items-center space-x-2'>
        <CreditCard className='fill-primary-500' />
        <span className='text-base font-bold text-neutral-800'>Hồ sơ</span>
      </div>
      <div
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 transition-all transform rounded-md 
    ${
      pathname === '/me/profile' ||
      pathname === '/me/jobtile' ||
      pathname === '/me/socials' ||
      pathname === `/${user?.id}/profile`
        ? 'opacity-100 scale-x-100'
        : 'opacity-0'
    }
  `}
      ></div>
    </div>
  );
};

export default ProfileButton;
