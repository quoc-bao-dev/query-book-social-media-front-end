'use client';

import FloatInput from '@/components/common/FloatInput';
import At from '@/components/icons/At-symbol';
import Check from '@/components/icons/Check';
import Pen from '@/components/icons/Pencil';
import User from '@/components/icons/User';
import Xmark from '@/components/icons/X-mark';
import { useUpdateUserProfileMutation } from '@/queries/user';
import { useAuth } from '@/store/authSignal';
import { useState } from 'react';
import SetCurUserProfileSignal from '../../../partials/SetCurUserProfileSignal';

const Page = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingHandle, setEditingHandl] = useState(false);
  const [isEditingBio, setEditingBio] = useState(false);

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [handle, setHandle] = useState(user?.handle || '');
  const [bio, setBio] = useState(user?.bio || '');

  const { mutateAsync, isError } = useUpdateUserProfileMutation();

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    // Reset giá trị khi hủy chỉnh sửa
    if (!isEditing) {
      setFirstName(user?.firstName || '');
      setLastName(user?.lastName || '');
    }
  };
  const toggleEditingHandle = () => {
    setEditingHandl(!isEditingHandle);
    // Reset giá trị khi hủy chỉnh sửa
    if (!isEditingHandle) {
      setHandle(user?.handle || '');
    }
  };

  const toggleEditingBio = () => {
    setEditingBio(!isEditingBio);
    // Reset giá trị khi hủy chỉnh sửa
    if (!isEditingBio) {
      setBio(user?.bio || '');
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        firstName,
        lastName,
      };

      await mutateAsync(payload);
      setIsEditing(false); // Tắt chế độ chỉnh sửa sau khi lưu thành công
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };
  const handleSaveHandle = async () => {
    try {
      const payload = {
        handle,
      };

      await mutateAsync(payload);
      setEditingHandl(false); // Tắt chế độ chỉnh sửa sau khi lưu thành công
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };
  const handleSaveBio = async () => {
    try {
      const payload = {
        bio,
      };

      await mutateAsync(payload);
      setEditingBio(false); // Tắt chế độ chỉnh sửa sau khi lưu thành công
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className=''>
      <SetCurUserProfileSignal user={user} />
      <div className='h-fit md:w-[698px] mt-4 border border-b rounded-2xl bg-card'>
        <div className='px-4 pt-4'>
          <div className='flex items-center justify-between w-full'>
            {/* Trạng thái xem */}
            {!isEditingBio && (
              <div className='flex items-center justify-between w-full'>
                <div className='flex items-center space-x-3'>
                  <User className='fill-primary-500' />
                  <span className='font-bold text-neutral-950'>
                    Phần giới thiệu
                  </span>
                </div>
                <button
                  onClick={toggleEditingBio}
                  className='flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 transition'
                >
                  <Pen className='text-neutral-800' />
                </button>
              </div>
            )}

            {/* Trạng thái chỉnh sửa */}
            {isEditingBio && (
              <div className='w-full space-y-4'>
                <textarea
                  className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Nhập thông tin giới thiệu của bạn (tối đa 100 kí tự)...'
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={100}
                />
                <div className='flex justify-end space-x-2'>
                  <button
                    className='w-7 h-7 bg-gray-200 flex items-center justify-center rounded-full hover:bg-gray-300 transition cursor-pointer'
                    aria-label='Hủy'
                    onClick={toggleEditingBio}
                  >
                    <Xmark className='text-red-500' />
                  </button>
                  <button
                    className='w-7 h-7 bg-gray-200 flex items-center justify-center rounded-full hover:bg-gray-300 transition cursor-pointer'
                    aria-label='Xác nhận'
                    onClick={handleSaveBio}
                  >
                    <Check className='text-primary-500' />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='pt-4 px-4'>
          {/* Thông tin người dùng */}
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center space-x-3'>
              <User className='fill-primary-500' />
              <span className='text-base font-semibold text-neutral-800'>
                Họ tên:{' '}
                <span className='font-bold text-neutral-950'>
                  {user?.fullName}
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
              <div className='w-full flex space-x-4 pt-4'>
                {/* Trường Họ */}
                <div className='w-1/2'>
                  <div className='relative'>
                    <FloatInput
                      label='Họ'
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Trường Tên */}
                <div className='w-1/2'>
                  <div className='relative'>
                    <FloatInput
                      label='Tên'
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
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
          {/* Phần hiển thị thông tin và nút chỉnh sửa */}
          <div className='flex items-center justify-between w-full'>
            {/* Thông tin liên hệ */}
            <div className='flex items-center space-x-3'>
              <At className='fill-primary-500' />
              <span className='text-base font-semibold text-neutral-800'>
                Tên người dùng:{' '}
                <span className='font-bold text-neutral-950'>
                  {user?.handle}
                </span>
              </span>
            </div>

            {/* Nút chỉnh sửa */}
            <div className='flex'>
              <button
                onClick={toggleEditingHandle}
                className='flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 transition'
              >
                <Pen className='text-neutral-800' />
              </button>
            </div>
          </div>

          {/* Form chỉnh sửa */}
          {isEditingHandle && (
            <div className='w-2/4 flex items-center pt-4 justify-between'>
              {/* Trường Họ */}
              <div className='flex-1 mr-4'>
                <div className='relative'>
                  <FloatInput
                    label='Tên người dùng'
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                  />
                </div>
              </div>

              {/* Nút xác nhận và hủy */}
              <div className='flex space-x-2'>
                <button
                  className='w-7 h-7 bg-gray-200 flex items-center justify-center rounded-full hover:bg-gray-300 transition cursor-pointer'
                  aria-label='Hủy'
                  onClick={toggleEditingHandle}
                >
                  <Xmark className='text-red-500' />
                </button>
                <button
                  className='w-7 h-7 bg-gray-200 flex items-center justify-center rounded-full hover:bg-gray-300 transition cursor-pointer'
                  aria-label='Xác nhận'
                  onClick={handleSaveHandle}
                >
                  <Check className='text-primary-500' />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
