'use client';
import GlobeAlt from '@/components/icons/Globe-alt';
import Inbox from '@/components/icons/Inbox';
import MapPin from '@/components/icons/Map-pin';
import { useAuth } from '@/store/authSignal';
import { PropsWithChildren } from 'react';
import SetCurUserProfileSignal from '../../partials/SetCurUserProfileSignal';
import { useAddresQuery } from '@/queries/address';

const layout = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();
  const { data: address } = useAddresQuery();

  return (
    <div className='block md:flex md:justify-between md:gap-4 px-4 md:px-0'>
      {/* About Section */}
      <div className='w-full space-y-3 md:w-[310px] md:flex-col'>
        <SetCurUserProfileSignal user={user} />

        {/* Follower and Following Section */}
        <div className='h-24 rounded-2xl overflow-hidden relative border-b border flex justify-around items-center bg-card'>
          <div className='text-center'>
            <span className='block text-3xl font-bold text-neutral-900'>
              {user?.followerCount}
            </span>
            <span className='text-sm text-neutral-900'>Người theo dõi</span>
          </div>
          <div className='border-l border-gray-500 h-16'></div>
          <div className='text-center'>
            <span className='block text-3xl font-bold text-neutral-900'>
              {user?.followingCount}
            </span>
            <span className='text-sm text-neutral-900'>Đang theo dõi</span>
          </div>
        </div>

        {/* Bio Section */}
        <div className='rounded-2xl overflow-hidden relative border-b border p-4 pt-3 h-auto bg-card'>
          <div className='px-2'>
            <span className='text-xl text-neutral-900 font-semibold'>
              Giới thiệu
            </span>
          </div>
          <div className='px-4 text-center mt-2 md:w-[276px]'>
            <span className='block text-sm text-neutral-900 break-words'>
              {user?.bio || (
                <span className='flex justify-center items-center text-neutral-400 italic opacity-50'>
                  chưa có phần giới thiệu
                </span>
              )}
            </span>
          </div>

          {/* Address Section */}
          <div className='flex items-center mt-4 px-4 space-x-3 group relative'>
            <MapPin className='w-6 h-6' />{' '}
            {/* Giữ kích thước mặc định của icon */}
            <span className="text-sm text-neutral-800 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-neutral-500 after:transition-all after:duration-300 group-hover:after:w-full">
              {!address ? (
                <span className='flex justify-center items-center text-neutral-400 italic opacity-50'>
                  Chưa có địa chỉ
                </span>
              ) : (
                <div className='block text-sm text-neutral-900 break-words'>
                  {address.province}
                </div>
              )}
            </span>
          </div>

          {/* Email Section */}
          <div className='flex items-center mt-4 px-4 space-x-3 group relative'>
            <Inbox className='w-6 h-6' />
            <span className="text-sm text-neutral-800 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-neutral-500 after:transition-all after:duration-300 group-hover:after:w-full">
              {user?.email || (
                <span className='flex justify-center items-center text-neutral-400 italic opacity-50'>
                  Chưa có Email
                </span>
              )}
            </span>
          </div>

          {/* Links Section */}
          <div className='flex items-center mt-4 px-4 space-x-3 group relative'>
            <GlobeAlt className='w-6 h-6' />
            <div className='text-sm text-neutral-800'>
              {Array.isArray(user?.links) && user.links.length > 0 ? (
                user.links.map((link, index) => (
                  <span key={index}>
                    <a
                      href={link.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-neutral-500 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {link.title}
                    </a>
                    {index < user.links.length - 1 ? ', ' : ''}{' '}
                  </span>
                ))
              ) : (
                <span className='flex justify-center items-center text-neutral-400 italic opacity-50'>
                  Chưa có liên kết
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className=''>{children}</div>
    </div>
  );
};

export default layout;
