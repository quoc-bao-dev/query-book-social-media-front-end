'use client';

import Pen from '@/components/icons/Pencil';
import User from '@/components/icons/User';
import { useAuth } from '@/store/authSignal';
import { useState } from 'react';
import SetCurUserProfileSignal from '../../../partials/SetCurUserProfileSignal';
import LinkForm from '../../../me/(profile)/partials/LinkForm';
import LinkList from '../../../me/(profile)/partials/LinkList';
import { sCurUserProfileSignal } from '../../../signal/curUserProfileSignal';
import LinkListUserId from '../../../me/(profile)/partials/LinkListUserId';

const ManageLinks = () => {
  const { user } = sCurUserProfileSignal.use();
  const [isAddingLink, setIsAddingLink] = useState(false);

  return user ? (
    <>
      <SetCurUserProfileSignal user={user} />
      <div className='md:w-[698px] h-fit mt-4 border border-b rounded-2xl bg-card py-4 px-4 space-y-5'>
        <div className='flex justify-between items-center mb-6'>
          <div className='flex items-center space-x-3'>
            <User className='text-primary-500' />
            <span className='font-bold text-neutral-950'>
              Liên kết hiện có
            </span>{' '}
          </div>
        </div>

        <div className='border-t'>
          <LinkListUserId />
        </div>
      </div>
    </>
  ) : (
    <div className='text-center py-8 text-gray-500'>Đang tải thông tin...</div>
  );
};

export default ManageLinks;
