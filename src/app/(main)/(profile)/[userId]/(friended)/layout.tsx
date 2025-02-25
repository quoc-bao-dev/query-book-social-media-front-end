'use client';

import GlobeAlt from '@/components/icons/Globe-alt';
import UserCircle from '@/components/icons/User-circle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import SetCurUserProfileSignal from '../../partials/SetCurUserProfileSignal';
import { sCurUserProfileSignal } from '../../signal/curUserProfileSignal';

const layout = ({ children }: PropsWithChildren) => {
  const { user } = sCurUserProfileSignal.use(); // Lấy dữ liệu user
  const friended = `/${user?.id || ''}/me/friended`; // Đường dẫn đến trang profile
  const followers = `/${user?.id || ''}/followers`; // Đường dẫn đến trang personal
  const followings = `/${user?.id || ''}/followings`; // Đường dẫn đến trang personal

  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  return (
    <div className='block md:flex md:justify-between md:gap-4 px-4 md:px-0'>
      {/* About - Phần chứa các liên kết điều hướng */}
      <div className='w-full space-y-4 md:w-[1024px] md:flex-col'>
        <SetCurUserProfileSignal user={user} /> {/* Cập nhật thông tin user */}
        <div className='rounded-2xl overflow-relative border-b border p-4 pt-4 h-auto bg-card '>
          <div className='block '>
            <span className='text-xl text-neutral-900 font-semibold'>
              Bạn bè
            </span>
          </div>
          <div className='mt-4 mb-4 flex flex-row space-x-4'>
            <Link href={friended} className='block'>
              <div
                className={`h-10 md:w-48 flex items-center mt-2 pl-2 space-x-2.5 mx-auto my-auto rounded-md hover:bg-primary-100/50 hover:text-primary-500
        ${
          pathname === '/me/friended'
            ? 'bg-primary-100/50 text-primary-500'
            : 'text-neutral-800'
        }`}
              >
                <UserCircle />
                <span className='lg:block font-semibold text-sm'>
                  Tất cả bạn bè
                </span>
              </div>
            </Link>

            <Link href={followers} className='block'>
              <div
                className={`h-10 md:w-48 flex items-center mt-2 pl-2 space-x-2.5 mx-auto my-auto rounded-md hover:bg-primary-100/50 hover:text-primary-500
        ${
          pathname === '/me/followers'
            ? 'bg-primary-100/50 text-primary-500'
            : 'text-neutral-800'
        }`}
              >
                <GlobeAlt />
                <span className='lg:block font-semibold text-sm '>
                  Người theo dõi
                </span>
              </div>
            </Link>
            <Link href={followings} className='block'>
              <div
                className={`h-10 md:w-48 flex items-center mt-2 pl-2 space-x-2.5 mx-auto my-auto rounded-md hover:bg-primary-100/50 hover:text-primary-500
        ${
          pathname === '/me/followings'
            ? 'bg-primary-100/50 text-primary-500'
            : 'text-neutral-800'
        }`}
              >
                <GlobeAlt />
                <span className='lg:block font-semibold text-sm '>
                  Đang theo dõi
                </span>
              </div>
            </Link>
          </div>
          <div className='border-t border-gray-500'></div>
          <div className='w-full pt-4 flex '>{children}</div>
        </div>
      </div>

      {/* Content - Phần giao diện con được render tại đây */}
    </div>
  );
};
export default layout;
