'use client';

import Avatar from '@/components/common/Avatar';
import { sCurUserProfileSignal } from '../../../signal/curUserProfileSignal';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import EllipsisHorizontalIcon from '@/components/icons/EllipsisHorizontalIcon';

const Page = () => {
  const { user } = sCurUserProfileSignal.use();

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center'>
      {user?.followings?.map((friend) => (
        <div
          key={friend.id}
          className='relative flex flex-col items-center w-full max-w-[185px] h-48 p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200'
        >
          {/* Avatar */}
          <div className='w-16 h-16 rounded-full overflow-hidden border border-gray-300'>
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
                setOpenMenuId(openMenuId === friend.id ? null : friend.id)
              }
              className='flex items-center justify-center rounded-lg text-gray-600 px-1 
               hover:bg-gray-300 transition active:scale-95'
            >
              <EllipsisHorizontalIcon />
            </button>

            {/* Menu tùy chọn */}
            {openMenuId === friend.id && (
              <div
                ref={menuRef}
                className='absolute top-10 right-2 w-40 bg-white shadow-lg rounded-lg text-sm flex flex-col gap-2 z-50'
              >
                <Link
                  href={`/${friend.id}`}
                  className='block px-3 py-2 hover:bg-gray-200 text-neutral-950'
                >
                  Xem trang cá nhân
                </Link>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
