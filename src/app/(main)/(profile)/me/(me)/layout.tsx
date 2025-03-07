'use client';
import GlobeAlt from '@/components/icons/Globe-alt';
import Inbox from '@/components/icons/Inbox';
import MapPin from '@/components/icons/Map-pin';
import Phone from '@/components/icons/Phone';
import { PropsWithChildren } from 'react';
import { useAuth } from '@/store/authSignal';
import SetCurUserProfileSignal from '../../partials/SetCurUserProfileSignal';

const layout = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();
  return (
    <div className='block md:flex md:justify-between md:gap-4 px-4 md:px-0'>
      {/* About */}
      <div className='w-full space-y-3 md:w-[310px] md:flex-col'>
        <SetCurUserProfileSignal user={user} />

        {/* FollowFollow */}
        <div className=' h-24 rounded-2xl overflow-hidden relative border-b border flex justify-around items-center bg-card'>
          <div className='text-center'>
            <span className='block text-3xl font-bold text-neutral-900 justify-center'>
              {user?.followerCount}
            </span>
            <span className='text-sm text-neutral-900'>Người theo dõi</span>
          </div>
          <div className='border-l border-gray-500 h-16'></div>
          {/* Đường kẻ phân cách */}
          <div className='text-center'>
            <span className='block text-3xl font-bold text-neutral-900'>
              {user?.followingCount}
            </span>
            <span className='text-sm text-neutral-900'>Đang theo dõi</span>
          </div>
        </div>
        {/* Follow */}

        {/**/}
        <div className='rounded-2xl overflow-hidden relative border-b border p-4 pt-3 h-auto bg-card '>
          <div className='px-2 block '>
            <span className='text-xl text-neutral-900 font-semibold'>
              Giới thiệu
            </span>
          </div>
          <div className='px-4 block text-center mt-2 md:w-[276px]'>
            <span className='block text-sm text-neutral-900 break-word'>
              {user?.bio || (
                <span className='flex justify-center items-center text-neutral-400 italic opacity-50'>
                  chưa có phần giới thiệu
                </span>
              )}
            </span>
          </div>
          <div className='flex items-center mt-4 px-4 space-x-3 group relative'>
            <MapPin />
            <span className="text-sm text-neutral-800 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-neutral-500 after:transition-all after:duration-300 group-hover:after:w-full">
              Binh Tan, Ho Chi Minh City
            </span>
          </div>

          <div className='flex items-center mt-4 px-4 space-x-3 group relative'>
            <Inbox />
            <span className="text-sm text-neutral-800 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-neutral-500 after:transition-all after:duration-300 group-hover:after:w-full">
              jaydondev@gmail.com
            </span>
          </div>
          <div className='flex items-center mt-4 px-4 space-x-3 group relative'>
            <Phone />
            <span className="text-sm text-neutral-800 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-neutral-500 after:transition-all after:duration-300 group-hover:after:w-full">
              0919 616 224
            </span>
          </div>
          <div className='flex items-center mt-4 px-4 space-x-3 group relative'>
            <GlobeAlt />
            <span className="text-sm text-neutral-800 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-neutral-500 after:transition-all after:duration-300 group-hover:after:w-full">
              jaydon.dev
            </span>
          </div>
        </div>
        {/**/}
      </div>
      {/* About */}
      <div className=''>{children}</div>
    </div>
  );
};

export default layout;
