'use client';

import Avatar from '@/components/common/Avatar';
import { sCurUserProfileSignal } from '../../../signal/curUserProfileSignal';
import Image from 'next/image';

const Page = () => {
  const { user } = sCurUserProfileSignal.use();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {user?.followings?.map((friend) => (
        <div
          key={friend.id}
          className='flex flex-col items-center w-full max-w-[255px] h-48 p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200'
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
            <p className='text-gray-900 font-medium text-sm truncate'>
              {friend.fullName}
            </p>
            <p className='text-gray-500 text-xs truncate'>{friend.handle}</p>
            <button
              className='bg-primary-100/50 text-neutral-900 px-5 py-2 rounded-full text-xs font-semibold transition 
                     hover:bg-primary-200 hover:text-primary-900-800'
            >
              Xem trang cá nhân
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
