'use client';

import Pen from '@/components/icons/Pencil';
import User from '@/components/icons/User';
import { useAuth } from '@/store/authSignal';
import { useState } from 'react';
import SetCurUserProfileSignal from '../../../partials/SetCurUserProfileSignal';
import LinkForm from '../partials/LinkForm';
import LinkList from '../partials/LinkList';

const ManageLinks = () => {
  const { user } = useAuth();
  const [isAddingLink, setIsAddingLink] = useState(false);

  console.log('User Data:', user);

  return user ? (
    <>
      <SetCurUserProfileSignal user={user} />
      <div className='md:w-[698px] h-fit mt-4 border border-b rounded-2xl bg-card py-4 px-4 space-y-5'>
        <div className='flex justify-between items-center mb-6'>
          <div className='flex items-center space-x-2'>
            <User className='text-primary-500' />
            <span className='text-base font-semibold'>Quản lý liên kết</span>
          </div>
          <button
            onClick={() => setIsAddingLink(!isAddingLink)}
            className='p-1 hover:bg-gray-100 rounded-full'
            title={isAddingLink ? 'Đóng form' : 'Thêm liên kết'}
          >
            <Pen className='w-6 h-6 ' />
          </button>
        </div>

        {isAddingLink && <LinkForm onClose={() => setIsAddingLink(false)} />}

        <div className='border-t pt-2'>
          <h3 className='text-lg font-medium mb-4'>Liên kết hiện có</h3>
          <LinkList />
        </div>
      </div>
    </>
  ) : (
    <div className='text-center py-8 text-gray-500'>Đang tải thông tin...</div>
  );
};

export default ManageLinks;
