'use client';

import { useState, useRef, useEffect } from 'react';
import Avatar from '@/components/common/Avatar';
import EllipsisHorizontalIcon from '@/components/icons/EllipsisHorizontalIcon';
import { sCurUserProfileSignal } from '../../../signal/curUserProfileSignal';
import Link from 'next/link';

const Page = () => {
  const { user } = sCurUserProfileSignal.use();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  console.log(user);

  if (!user) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
      {user?.followings?.map((friend) => (
        <div
          key={friend.id}
          className='relative flex flex-col items-center w-full max-w-[255px] h-48 p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200'
        >
          {/* Avatar */}
          <div className='w-16 h-16 rounded-full overflow-hidden border border-gray-300 relative'>
            <Avatar
              src={`https://avatar.iran.liara.run/public?name=${encodeURIComponent(
                friend?.fullName || 'User',
              )}`}
              className='w-full h-full object-cover'
            />
          </div>

          {/* Thông tin bạn bè */}
          <div className='mt-3 w-full flex flex-col items-center text-center gap-2'>
            <p className='text-neutral-950 font-medium text-sm truncate'>
              {friend.fullName}
            </p>
            <p className='text-neutral-500 text-xs truncate'>{friend.handle}</p>
            {/* Nút menu */}
            <button
              onClick={() =>
                setOpenMenu(openMenu === friend.id ? null : friend.id)
              }
              className='flex items-center justify-center rounded-lg text-gray-600 px-2 
              hover:bg-gray-300 transition active:scale-95'
            >
              <EllipsisHorizontalIcon />
            </button>

            {/* Dropdown Menu */}
            {openMenu === friend.id && (
              <div
                ref={menuRef}
                className='absolute top-10 right-2 w-40 bg-white shadow-lg rounded-lg text-sm flex flex-col gap-2 z-50 border'
              >
                <Link
                  href={`/${friend.id}`}
                  className='block px-3 py-2 hover:bg-gray-200 text-neutral-900'
                >
                  Xem trang cá nhân
                </Link>
                <button className='w-full text-left px-3 py-2 hover:bg-gray-200 text-neutral-900'>
                  💬 Nhắn tin
                </button>
                <button className='w-full text-left px-3 py-2 hover:bg-red-100 text-red-600'>
                  ❌ Xóa kết bạn
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
