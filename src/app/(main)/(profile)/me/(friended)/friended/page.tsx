'use client';

import { sCurUserProfileSignal } from '../../../signal/curUserProfileSignal';
import Image from 'next/image';

const Page = () => {
  const { user } = sCurUserProfileSignal.use();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {user?.friends?.map((friend) => (
        <div
          key={friend.id}
          className='flex flex-col items-center w-full max-w-[255px] h-48 p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200'
        >
          {/* Avatar */}
          <div className='w-16 h-16 rounded-full overflow-hidden border border-gray-300'>
            <Image
              src={friend?.avatarUrl || '/images/git.png'}
              alt={`Avatar of ${friend.fullName}`}
              width={64}
              height={64}
              className='w-full h-full object-cover'
            />
          </div>

          {/* Thông tin bạn bè */}
          <div className='mt-3 text-center w-full'>
            <p className='text-gray-900 font-medium truncate'>
              {friend.fullName}
            </p>
            <p className='text-gray-500 text-sm truncate'>{friend.handle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
