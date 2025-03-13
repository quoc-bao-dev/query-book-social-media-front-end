'use client';

import FloatInput from '@/components/common/FloatInput';
import Briefcase from '@/components/icons/Briefcase';
import Check from '@/components/icons/Check';
import Pen from '@/components/icons/Pencil';
import Xmark from '@/components/icons/X-mark';
import { useCreateWorkMutation, useGetWork } from '@/queries/workexperience';
import { useAuth } from '@/store/authSignal';
import { useState } from 'react';
import SetCurUserProfileSignal from '../../../partials/SetCurUserProfileSignal';

const Page = () => {
  const { user } = useAuth();
  const { data: work } = useGetWork();
  const [isEditing, setIsEditing] = useState(false);
  const { mutateAsync, isError } = useCreateWorkMutation();

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    console.log('Giá trị nhập vào:', nameCty); // Log dữ liệu từ form
  };

  return (
    <div className=''>
      <SetCurUserProfileSignal user={user} />
      <div className='md:w-[698px] h-fit mt-4 border border-b rounded-2xl bg-card'>
        <div className='pt-4 px-4'>
          {/* Thông tin người dùng */}
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center space-x-3'>
              <Briefcase className='fill-primary-500' />
              <span className='text-base font-semibold text-neutral-800'>
                Công ty:{' '}
                <span className='font-bold text-neutral-950'>{work?.work}</span>
              </span>
            </div>

            {/* Nút chỉnh sửa */}
            <button
              onClick={toggleEditing}
              className='flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 transition'
            >
              <Pen className='text-neutral-800' />
            </button>
          </div>

          {/* Form chỉnh sửa */}
          {isEditing && (
            <div className='w-full flex space-x-4 pt-4'>
              {/* Input Công ty */}
              <div className='w-1/2'>
                <FloatInput
                  label='Công ty'
                  value={nameCty}
                  onChange={(e) => setNameCty(e.target.value)} // Cập nhật giá trị
                />
              </div>

              {/* Nút xác nhận và hủy */}
              <div className='mt-2 flex justify-end space-x-2'>
                <button
                  className='w-7 h-7 bg-gray-200 flex items-center justify-center rounded-full hover:bg-gray-300 transition cursor-pointer'
                  aria-label='Hủy'
                  onClick={toggleEditing}
                >
                  <Xmark className='text-red-500' />
                </button>
                <button
                  className='w-7 h-7 bg-gray-200 flex items-center justify-center rounded-full hover:bg-gray-300 transition cursor-pointer'
                  aria-label='Xác nhận'
                  onClick={handleSave}
                >
                  <Check className='text-primary-500' />
                </button>
              </div>
            </div>
          )}

          {isError && (
            <div className='text-red-500'>
              Có lỗi xảy ra khi cập nhật thông tin.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
