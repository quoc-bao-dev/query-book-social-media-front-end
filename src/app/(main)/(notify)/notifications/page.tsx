'use client';

import React, { useState, useEffect, useMemo } from 'react';
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

  // Hàm xử lý phân nhóm thông báo
  const groupNotificationsByDate = (
    notifications: { _id: string; createdAt: string; isRead?: boolean }[],
  ) => {
    const grouped: Record<
      string,
      { _id: string; createdAt: string; isRead?: boolean }[]
    > = {};

    notifications.forEach((notify) => {
      const date = new Date(notify.createdAt);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let section: string;
      if (date.toDateString() === today.toDateString()) {
        section = 'Hôm nay';
      } else if (date.toDateString() === yesterday.toDateString()) {
        section = 'Hôm qua';
      } else if (date > new Date(today.setDate(today.getDate() - 7))) {
        section = 'Tuần này';
      } else {
        section = date.toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
      }

      if (!grouped[section]) grouped[section] = [];
      grouped[section].push(notify);
    });

    return grouped;
  };

  // Kết hợp và sắp xếp thông báo
  const lsNotification = useMemo(() => {
    const combined = [
      ...(notification || []),
      ...(friendRequests?.map((item) => ({
        ...item,
        type: 'friend_request',
      })) || []),
    ];

    return combined.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [notification, friendRequests]);

  // Lọc thông báo theo tab
  const filteredNotifications = useMemo(
    () =>
      activeTab === 'new'
        ? lsNotification.filter((n) => !n.isRead)
        : lsNotification,
    [activeTab, lsNotification],
  );

  // Nhóm thông báo đã lọc
  const groupedNotifications = useMemo(
    () => groupNotificationsByDate(filteredNotifications),
    [filteredNotifications],
  );

  useEffect(() => {
    setNotifyCount?.(lsNotification.filter((n) => !n.isRead).length);
  }, [lsNotification, setNotifyCount]);

  if (friendRequestError || notificationError) {
    return <div className='text-red-500'>Lỗi khi tải thông báo!</div>;
  }

  return (
    <div className='w-[1024px] mx-auto bg-card rounded-lg p-4 mt-6'>
      <div className='pb-2 mb-3 bg-card'>
        <span className='text-xl text-neutral-900 font-semibold'>
          Thông báo
        </span>
        <div className='border-b border-gray-700 mt-2'></div>
      </div>

      <div className='flex gap-4 mb-6 text-sm'>
        <button
          className={`px-2 py-1 rounded-lg ${
            activeTab === 'all'
              ? 'bg-primary-100 text-primary-800 font-semibold'
              : 'bg-gray-100 text-primary-600 font-semibold'
          }`}
          onClick={() => setActiveTab('all')}
        >
          Tất cả
        </button>
        <button
          className={`px-2 py-1 rounded-lg ${
            activeTab === 'new'
              ? 'bg-primary-100 text-primary-800 font-semibold'
              : 'bg-gray-100 text-primary-600 font-semibold'
          }`}
          onClick={() => setActiveTab('new')}
        >
          Chưa đọc
        </button>
      </div>

      <ScrollArea className='h-[calc(100vh-200px)]'>
        {Object.entries(groupedNotifications).map(([section, items]) => (
          <div key={section} className='mb-8'>
            <div className='flex items-center mb-4'>
              <h5 className='text-base font-semibold text-gray-900 mr-4'>
                {section}
              </h5>
              <div className='flex-1 border-t border-gray-300'></div>
            </div>

            <div className='space-y-4'>
              {items.map((notify) => (
                <NotifyRow
                  key={notify._id}
                  notify={notify}
                  time={new Date(notify.createdAt).toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                />
              ))}
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className='text-center py-8 text-gray-500'>
            Không có thông báo nào {activeTab === 'new' ? 'chưa đọc' : ''}
          </div>
        )}

        <ScrollBar orientation='vertical' />
      </ScrollArea>
    </div>
  );
};

export default Page;
