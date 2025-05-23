'use client';

import User from '@/components/icons/User';
import { sCurUserProfileSignal } from '../../../signal/curUserProfileSignal';

const page = () => {
  const { user } = sCurUserProfileSignal.use();

  return (
    <div>
      {/* About */}
      <div className='md:w-[698px] h-fit mt-4 border border-b rounded-2xl bg-card'>
        <div className='py-4 px-4 space-y-5'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center space-x-3'>
              <User className='fill-primary-500' />
              <span className='text-base font-semibold text-neutral-800'>
                Công việc:{' '}
                <span className='font-bold text-neutral-950'>
                  {user?.professional || 'chưa có'}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* About */}
    </div>
  );
};

export default page;
