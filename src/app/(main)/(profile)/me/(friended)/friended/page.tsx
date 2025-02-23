'use client';

import { useAuth } from '@/store/authSignal';

const page = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className='w-72 h-16 flex items-center p-2 rounded-lg bg-muted'>
        {user?.friends?.map((friend) => (
          <div
            key={friend.id}
            className='flex-shrink-0 flex items-center space-x-3 p-2 rounded-lg mr-3'
          >
            {/* Ảnh đại diện */}
            <div className='w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center'>
              <img
                src={friend.avatarUrl}
                alt={`Avatar `}
                className='w-full h-full object-cover rounded-full'
              />
            </div>

            {/* Tên */}
            <p className='text-black font-medium'>{friend.fullName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
