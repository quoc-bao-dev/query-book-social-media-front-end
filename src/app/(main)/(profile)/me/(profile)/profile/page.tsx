'use client';

import FloatInput from '@/components/common/FloatInput';
import At from '@/components/icons/At-symbol';
import Check from '@/components/icons/Check';
import Document from '@/components/icons/Document';
import Fire from '@/components/icons/Fire';
import MapPin from '@/components/icons/Map-pin';
import Pen from '@/components/icons/Pencil';
import User from '@/components/icons/User';
import Xmark from '@/components/icons/X-mark';
import { Switch } from '@/components/ui/switch';
import {
  useAddresQuery,
  useAddressQuery,
  useCreateAddress,
} from '@/queries/address';
import { useUpdateUserProfileMutation } from '@/queries/user';
import { useAuth } from '@/store/authSignal';
import { AddressRes } from '@/types/address';
import { useEffect, useState } from 'react';
import { string } from 'zod';
import SetCurUserProfileSignal from '../../../partials/SetCurUserProfileSignal';

interface AddressOption {
  code: string;
  name: string;
}

const Page = () => {
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingHandle, setEditingHandl] = useState(false);
  const [isEditingBio, setEditingBio] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [handle, setHandle] = useState(user?.handle || '');
  const [bio, setBio] = useState(user?.bio || '');

  const { mutateAsync, isError, isPending } = useUpdateUserProfileMutation();
  const { mutateAsync: updateAddress, isError: isErrors } = useCreateAddress();

  const [province, setProvince] = useState<AddressRes | null>(null);
  const [district, setDistrict] = useState<AddressRes | null>(null);
  const [ward, setWard] = useState<AddressRes | null>(null);
  const [detail, setDetail] = useState<string>('');

  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetail(e.target.value);
  };

  const { data: provinces } = useAddressQuery({ mode: 'provinces' });

  const { data: districts } = useAddressQuery({
    mode: 'districts',
    code: province?.code,
  });

  const { data: wards } = useAddressQuery({
    mode: 'wards',
    code: district?.code,
  });

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProvince = provinces.find(
      (p: AddressOption) => p.code === e.target.value,
    );
    setProvince(selectedProvince || null);
    setDistrict(null);
    setWard(null);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDistrict = districts.find(
      (d: AddressOption) => d.code === e.target.value,
    );
    setDistrict(selectedDistrict || null);
    setWard(null);
  };

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
  const toggleEditingAddress = () => {
    setIsEditingAddress(!isEditingAddress);
    if (!isEditingAddress) {
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
  const handleSaveAddress = async () => {
    try {
      const newAddress = {
        province: province?.name || '',
        district: district?.name || '',
        ward: ward?.name || '',
        address: detail || '',
        country: 'Vietnam',
        provinceSlug: province?.slug || '',
        provinceWithType: province?.name_with_type || '',
        districtSlug: district?.slug || '',
        districtWithType: district?.name_with_type || '',
        wardSlug: ward?.slug || '',
        wardWithType: ward?.name_with_type || '',
      };

      await updateAddress(newAddress);
      toggleEditingAddress();
    } catch (error) {
      console.error('Lỗi khi cập nhật địa chỉ:', error);
    }
  };

  const toggle2FAEnable = async (val: boolean) => {
    const payload = {
      isTwoFactorAuthEnabled: val,
    };

    await mutateAsync(payload);
  };

  const { data: address } = useAddresQuery();

  return (
    <div className=''>
      <SetCurUserProfileSignal user={user} />
      <div className='h-fit md:w-[698px] mt-4 border border-b rounded-2xl bg-card'>
        <div className='px-4 pt-4'>
          {/* Header phần giới thiệu */}
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center space-x-3'>
              <Document className='fill-primary-500' />
              <div>
                <span className='font-bold text-neutral-950'>
                  Phần giới thiệu:
                </span>
                <span className='text-neutral-700 ml-1'>
                  {bio || 'Chưa có thông tin giới thiệu.'}
                </span>
              </div>
            </div>

            <button
              onClick={toggleEditingBio}
              className='flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 transition'
            >
              <Pen className='text-neutral-800' />
            </button>
          </div>

          {/* Form chỉnh sửa */}
          {isEditingBio && (
            <div className='mt-3'>
              <textarea
                className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Nhập thông tin giới thiệu của bạn (tối đa 100 kí tự)...'
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={100}
              />
              <div className='flex justify-end space-x-2 mt-2'>
                <button
                  className='w-8 h-8 bg-gray-200 flex items-center justify-center rounded-full hover:bg-gray-300 transition cursor-pointer'
                  aria-label='Hủy'
                  onClick={toggleEditingBio}
                >
                  <Xmark className='text-red-500' />
                </button>
                <button
                  className='w-8 h-8 bg-gray-200 flex items-center justify-center rounded-full hover:bg-gray-300 transition cursor-pointer'
                  aria-label='Xác nhận'
                  onClick={handleSaveBio}
                >
                  <Check className='text-primary-500' />
                </button>
              </div>
            </div>
          )}
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
        </div>

        <div className='px-4 pt-4'>
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

        <div className='px-4 pt-4'>
          <div className='flex items-center justify-between w-full'>
            {/* Thông tin liên hệ */}
            <div className='flex items-center space-x-3'>
              <MapPin className='fill-primary-500' />
              <div className='text-base font-semibold text-neutral-800'>
                Địa chỉ:{' '}
                {address ? (
                  <span className='font-bold text-neutral-950'>
                    {address.address}, {address.ward}, {address.district},{' '}
                    {address.province}
                  </span>
                ) : (
                  <span className='font-bold text-neutral-950'>
                    Chưa có địa chỉ
                  </span>
                )}
              </div>
            </div>

            {/* Nút chỉnh sửa */}
            <div className='flex'>
              <button
                onClick={toggleEditingAddress}
                className='flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 transition'
              >
                <Pen className='text-neutral-800' />
              </button>
            </div>
          </div>
          {isEditingAddress && (
            <div>
              <div className='grid grid-cols-2 gap-4 mb-6 pt-4'>
                {/* Dropdown Tỉnh/Thành phố */}
                <div className='col-span-1'>
                  <label
                    htmlFor='province'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Tỉnh/Thành phố *
                  </label>
                  <select
                    id='province'
                    value={province?.code || ''}
                    onChange={handleProvinceChange}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-card'
                  >
                    <option value=''>Chọn Tỉnh/Thành phố</option>
                    {provinces?.map((p: AddressOption) => (
                      <option key={p.code} value={p.code}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dropdown Quận/Huyện */}
                <div className='col-span-1'>
                  <label
                    htmlFor='district'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Quận/Huyện *
                  </label>
                  <select
                    id='district'
                    value={district?.code || ''}
                    onChange={handleDistrictChange}
                    disabled={!province}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-card disabled:opacity-50'
                  >
                    <option value=''>Chọn Quận/Huyện</option>
                    {districts?.map((d: AddressOption) => (
                      <option key={d.code} value={d.code}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dropdown Phường/Xã */}
                <div className='col-span-2'>
                  <label
                    htmlFor='ward'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Phường/Xã *
                  </label>
                  <select
                    id='ward'
                    value={ward?.code || ''}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setWard(
                        wards.find(
                          (w: AddressOption) => w.code === e.target.value,
                        ),
                      )
                    }
                    disabled={!district}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-card disabled:opacity-50'
                  >
                    <option value=''>Chọn Phường/Xã</option>
                    {wards?.map((w: AddressOption) => (
                      <option key={w.code} value={w.code}>
                        {w.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='w-full'>
                <FloatInput
                  label='Địa chỉ cụ thể *'
                  name='detail'
                  value={detail}
                  onChange={handleDetailChange} // Đảm bảo truyền onChange vào để cập nhật state
                />
              </div>
              {/* Nút xác nhận và hủy */}
              <div className='flex justify-end space-x-2 mt-4'>
                <button
                  onClick={toggleEditingAddress}
                  className='w-7 h-7 bg-gray-200 flex items-center justify-center rounded-full hover:bg-gray-300 transition cursor-pointer'
                  aria-label='Hủy'
                >
                  <Xmark className='text-red-500' />
                </button>
                <button
                  className='w-7 h-7 bg-gray-200 flex items-center justify-center rounded-full hover:bg-gray-300 transition cursor-pointer'
                  aria-label='Xác nhận'
                  onClick={handleSaveAddress}
                >
                  <Check className='text-primary-500' />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className='px-4 py-4'>
          {/* Phần hiển thị thông tin và nút chỉnh sửa */}
          <div className='flex items-center justify-between w-full'>
            {/* Thông tin liên hệ */}
            <div className='flex items-center space-x-3'>
              <Fire className='fill-primary-500' />
              <span className='text-base font-semibold text-neutral-800'>
                Xác thực 2 bước:{' '}
                <span className='font-bold text-neutral-950'>
                  {user?.interests?.length
                    ? user.interests.join(', ')
                    : 'Chưa bật'}
                </span>
              </span>
            </div>

            {/* Nút chỉnh sửa */}
            <div className='flex'>
              <div className='pt-1'>
                <Switch
                  checked={user?.isTwoFactorAuthEnabled}
                  onCheckedChange={toggle2FAEnable}
                  disabled={isPending}
                />
              </div>
            </div>
          </div>
        </div>

        {isError && (
          <div className='text-error-900 '>
            Có lỗi xảy ra khi cập nhật thông tin.
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
