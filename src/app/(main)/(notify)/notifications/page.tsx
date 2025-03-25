'use client';

import React, { useState, useEffect } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useNotification } from '@/components/Layout/Header';
import { useFriendRequestQuery } from '@/queries/friend';
import { useNotificationQuery } from '@/queries/notification';
import NotifyRow from '@/components/NotifyDrawer/NotifyRow';

const Page = () => {
  const { setNotifyCount } = useNotification();
  const {
    data: friendRequests,
    error: friendRequestError,
    refetch,
  } = useFriendRequestQuery();
  const {
    data: notification,
    error: notificationError,
    refetch: refetchNotification,
  } = useNotificationQuery();
  const [activeTab, setActiveTab] = useState('all');

  const lsNotification = [
    ...(notification || []),
    ...(friendRequests?.map((item) => ({
      ...item,
      type: 'friend_request',
    })) || []),
  ].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  useEffect(() => {
    if (setNotifyCount) {
      setNotifyCount(lsNotification?.filter((n) => !n.isRead).length);
    }
  }, [lsNotification, setNotifyCount]);

  if (friendRequestError || notificationError) {
    return <div className='text-red-500'>Lỗi khi tải thông báo!</div>;
  }

  return (
    <div className='w-[648px] mx-auto bg-card rounded-lg p-4 mt-6'>
      <div className='pb-2 mb-3 bg-card'>
        <span className='text-xl text-neutral-900 font-semibold'>
          Thông báo
        </span>
        <div className='border-b border-gray-700 mt-2'></div>
      </div>

      <div className='flex gap-4'>
        <div
          className={`cursor-pointer font-medium transition ${
            activeTab === 'all' ? 'text-primary-800' : 'text-gray-700'
          }`}
          onClick={() => setActiveTab('all')}
        >
          Tất cả
        </div>
        <div
          className={`cursor-pointer font-medium transition ${
            activeTab === 'new' ? 'text-primary-800' : 'text-gray-700'
          }`}
          onClick={() => setActiveTab('new')}
        >
          Mới
        </div>
      </div>

      <ScrollArea className='flex-1 pt-4'>
        <div className='flex flex-col gap-3'>
          {lsNotification.length > 0 ? (
            lsNotification.map((notify) => (
              <NotifyRow key={notify._id} notify={notify} />
            ))
          ) : (
            <div className='text-gray-500 text-center mt-3'>
              Không có thông báo nào.
            </div>
          )}
        </div>
        <ScrollBar orientation='vertical' />
      </ScrollArea>
    </div>
  );
};

export default Page;
