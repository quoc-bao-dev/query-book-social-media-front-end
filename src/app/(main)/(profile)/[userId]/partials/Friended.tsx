'use client';

import UserGroup from '@/components/icons/User-group';
import { usePathname } from 'next/navigation';
import { sCurUserProfileSignal } from '../../signal/curUserProfileSignal';

const Friended = () => {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại
  const { user } = sCurUserProfileSignal.use();

  return (
    <div className='relative flex flex-col items-center py-3 px-2 group cursor-pointer'>
      <div className='flex items-center space-x-2'>
        <UserGroup className='fill-primary-500' />
        <span className='text-base font-bold text-neutral-800'>Bạn bè</span>
      </div>
      <div
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 transition-all transform rounded-md 
    ${pathname === '/me/friended' ? 'opacity-100 scale-x-100' : 'opacity-0'}
  `}
      ></div>
    </div>
  );
};

export default Friended;
