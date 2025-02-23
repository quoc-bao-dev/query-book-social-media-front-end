'use client';

import Academic from '@/components/icons/Academic';
import Document from '@/components/icons/Document';
import Maill from '@/components/icons/Maill';
import UserCircle from '@/components/icons/User-circle';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import SetCurUserProfileSignal from '../../partials/SetCurUserProfileSignal';
import { sCurUserProfileSignal } from '../../signal/curUserProfileSignal';
import { usePathname } from 'next/navigation';
import GlobeAlt from '@/components/icons/Globe-alt';

const layout = ({ children }: PropsWithChildren) => {
  const { user } = sCurUserProfileSignal.use(); // Lấy dữ liệu user
  const profile = `/me/profile`; // Đường dẫn đến trang profile
  const job = `/me/jobtile`; // Đường dẫn đến trang personal
  const socials = `/me/socials`; // Đường dẫn đến trang personal

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
            <Link href={profile} className='block'>
              <div
                className={`h-10 md:w-48 flex items-center mt-2 pl-2 space-x-2.5 mx-auto my-auto rounded-md hover:bg-primary-100/50 hover:text-primary-500
        ${
          pathname === '/me/profile'
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

            {/* Các mục khác */}
            <Link href={job} className='block'>
              <div
                className={`h-10 md:w-48 flex items-center mt-2 pl-2 space-x-2.5 mx-auto my-auto rounded-md hover:bg-primary-100/50 hover:text-primary-500
        ${
          pathname === '/me/jobtile'
            ? 'bg-primary-100/50 text-primary-500'
            : 'text-neutral-800'
        }`}
              >
                <Academic />
                <span className='lg:block font-semibold text-sm '>
                  Đã thêm gần đây
                </span>
              </div>
            </Link>
            <Link href={socials} className='block'>
              <div
                className={`h-10 md:w-48 flex items-center mt-2 pl-2 space-x-2.5 mx-auto my-auto rounded-md hover:bg-primary-100/50 hover:text-primary-500
        ${
          pathname === '/me/socials'
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
            <Link href={socials} className='block'>
              <div
                className={`h-10 md:w-48 flex items-center mt-2 pl-2 space-x-2.5 mx-auto my-auto rounded-md hover:bg-primary-100/50 hover:text-primary-500
        ${
          pathname === '/me/socials'
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
          <div className='w-full pt-4'>{children}</div>
        </div>
      </div>

      {/* Content - Phần giao diện con được render tại đây */}
    </div>
  );
};
export default layout;
