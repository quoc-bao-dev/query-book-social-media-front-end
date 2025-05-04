'use client';

import At from '@/components/icons/At-symbol';
import Inbox from '@/components/icons/Inbox';
import User from '@/components/icons/User';
import React from 'react';
import { sCurUserProfileSignal } from '../../../signal/curUserProfileSignal';
import MapPin from '@/components/icons/Map-pin';
import { useAddressIdQuery } from '@/queries/address';
import { useParams } from 'next/navigation';

const page = () => {
  const { user } = sCurUserProfileSignal.use();

  const params = useParams();
  const userId = params.userId as string;

  const { data: address } = useAddressIdQuery(userId);

  return (
    <div>
      {/* About */}
      <div className='h-fit md:w-[698px] mt-4 border border-b rounded-2xl bg-card'>
        <div className='pt-4 px-4 space-y-5'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center space-x-3'>
              <User className='fill-primary-500' />
              <span className='text-base font-semibold text-neutral-800'>
                Họ tên:{' '}
                <span className='font-bold text-neutral-950'>
                  {user?.fullName || 'chưa có'}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className='px-4 py-4 space-y-5'>
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
          </div>
        </div>

        <div className='px-4 pb-4 space-y-5'>
          <div className='flex items-center justify-between w-full'>
            {/* Thông tin liên hệ */}
            <div className='flex items-center space-x-3'>
              <Inbox className='fill-primary-500' />
              <span className='text-base font-semibold text-neutral-800'>
                Email:{' '}
                <span className='font-bold text-neutral-950'>
                  {user?.email}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className='px-4 pb-4 space-y-5'>
          <div className='flex items-center justify-between w-full'>
            {/* Thông tin liên hệ */}
            <div className='flex items-center space-x-3'>
              <MapPin className='fill-primary-500' />
              <span className='text-base font-semibold text-neutral-800'>
                <div className='flex items-center space-x-3'>
                  <span className='text-base font-semibold text-neutral-800'>
                    Địa chỉ:{''}
                    {!address && (
                      <span className='font-bold text-neutral-950'>
                        {''} Chưa có địa chỉ
                      </span>
                    )}
                  </span>
                  {address && (
                    <div className='font-bold text-neutral-950'>
                      {address.address}, {address.ward}, {address.district},
                      {address.province}
                    </div>
                  )}
                </div>
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
