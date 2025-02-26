'use client';

import FloatInput from '@/components/common/FloatInput';
import At from '@/components/icons/At-symbol';
import Check from '@/components/icons/Check';
import Home from '@/components/icons/Home';
import Pen from '@/components/icons/Pencil';
import User from '@/components/icons/User';
import Xmark from '@/components/icons/X-mark';
import { useAuth } from '@/store/authSignal';
import { useState } from 'react';
import SetCurUserProfileSignal from '../../../partials/SetCurUserProfileSignal';
import { useUpdateUserProfileMutation } from '@/queries/user';
import Briefcase from '@/components/icons/Briefcase';
import Computer from '@/components/icons/Computer';
import DocumentText from '@/components/icons/Document-text';

const Page = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [jobtitle, setJontitle] = useState(user?.jobTitle?.title || '');
  const { mutateAsync, isError } = useUpdateUserProfileMutation();

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    // Reset giá trị khi hủy chỉnh sửa
    if (!isEditing) {
      setJontitle(user?.jobTitle?.title || 'chua co');
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        jobtitle,
      };

      await mutateAsync(payload);
      setIsEditing(false); // Tắt chế độ chỉnh sửa sau khi lưu thành công
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
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
                Chức danh:{' '}
                <span className='font-bold text-neutral-950'>
                  {user?.professional || 'chưa có'}
                </span>
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
          <div className='flex'>
            {/* Form chỉnh sửa */}
            {isEditing && (
              <div className='w-full flex space-x-4'>
                {/* Trường Họ */}
                <div className='w-1/2'>
                  <div className='relative'>
                    <FloatInput
                      label='Công việc'
                      value={jobtitle}
                      onChange={(e) => setJontitle(e.target.value)}
                    />
                  </div>
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
          </div>
          {isError && (
            <div className='text-red-500'>
              Có lỗi xảy ra khi cập nhật thông tin.
            </div>
          )}
        </div>

        {/*  */}
        <div className='px-4 pt-4'>
          {/* Thông tin người dùng */}
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center space-x-3'>
              <Computer className='fill-primary-500' />
              <span className='text-base font-semibold text-neutral-800'>
                Chuyên môn:{' '}
                <span className='font-bold text-neutral-950'>
                  {user?.professional || 'chưa có'}
                </span>
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
          <div className='flex'>
            {/* Form chỉnh sửa */}
            {isEditing && (
              <div className='w-full flex space-x-4'>
                {/* Trường Họ */}
                <div className='w-1/2'>
                  <div className='relative'>
                    <FloatInput
                      label='Công việc'
                      value={jobtitle}
                      onChange={(e) => setJontitle(e.target.value)}
                    />
                  </div>
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
          </div>
          {isError && (
            <div className='text-red-500'>
              Có lỗi xảy ra khi cập nhật thông tin.
            </div>
          )}
        </div>
        <div className='px-4 py-4'>
          {/* Thông tin người dùng */}
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center space-x-3'>
              <DocumentText className='fill-primary-500' />
              <span className='text-base font-semibold text-neutral-800'>
                Mô tả công việc:{' '}
                <span className='font-bold text-neutral-950'>
                  {user?.professional || 'chưa có'}
                </span>
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
          <div className='flex'>
            {/* Form chỉnh sửa */}
            {isEditing && (
              <div className='w-full flex space-x-4'>
                {/* Trường Họ */}
                <div className='w-1/2'>
                  <div className='relative'>
                    <FloatInput
                      label='Công việc'
                      value={jobtitle}
                      onChange={(e) => setJontitle(e.target.value)}
                    />
                  </div>
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
          </div>
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
