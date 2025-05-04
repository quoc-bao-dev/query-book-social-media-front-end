/* eslint-disable @next/next/no-img-element */
'use client';

import { Button } from '@/components/ui/button';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  location: string;
  position: string;
}

const CardUser = ({ users }: { users: User[] }) => {
  return (
    <div>
      <h2 className='text-lg font-semibold text-neutral-900 mt-4'>Users</h2>

      {/* Kiểm tra nếu không có user */}
      {users.length === 0 ? (
        <div className='flex justify-center items-center h-40'>
          <p className='text-gray-500 text-lg font-medium'>No users found</p>
        </div>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
          {users.map((user) => (
            <div
              key={user.id}
              className='bg-background rounded-xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 border-2 border-info-300 w-full'
            >
              {/* Avatar */}
              <img
                src={user.avatar}
                alt={user.name}
                className='w-20 h-20 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 transition-transform duration-300 hover:scale-105'
              />

              {/* Thông tin user */}
              <div className='flex flex-col items-center justify-center min-h-[90px] mt-3'>
                <h3 className='text-base font-semibold text-gray-900 dark:text-white'>
                  {user.name}
                </h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  {user.position}
                </p>
                <p className='text-xs text-gray-400 dark:text-gray-500'>
                  {user.location}
                </p>
              </div>

              {/* Nút CTA */}
              <div className='mt-auto'>
                <Button className='text-white text-sm px-3 py-1.5 rounded-lg hover:bg-primary-400 transition-all duration-300 shadow'>
                  Xem hồ sơ
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardUser;
