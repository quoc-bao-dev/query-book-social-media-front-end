'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useNotification } from '@/components/Layout/Header';
import { useFriendRequestQuery } from '@/queries/friend';
import { useNotificationQuery } from '@/queries/notification';
import NotifyRow from '@/components/NotifyDrawer/NotifyRow';

// Tách hàm helper ra ngoài component để tránh recreate
const getDateSection = (date: Date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return 'Hôm nay';
  if (date.toDateString() === yesterday.toDateString()) return 'Hôm qua';

  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);
  return date > lastWeek
    ? 'Tuần này'
    : date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
};

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
  const [activeTab, setActiveTab] = useState<'all' | 'new'>('all');

  // Memoize combined notifications
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

  // Memoize filtered notifications
  const filteredNotifications = useMemo(
    () =>
      activeTab === 'new'
        ? lsNotification.filter((n) => !n.isRead)
        : lsNotification,
    [activeTab, lsNotification],
  );

  // Memoize grouping logic với useCallback
  const groupNotificationsByDate = useCallback(
    (notifications: typeof filteredNotifications) => {
      const grouped: Record<string, typeof filteredNotifications> = {};

      notifications.forEach((notify) => {
        const section = getDateSection(new Date(notify.createdAt));
        if (!grouped[section]) grouped[section] = [];
        grouped[section].push(notify);
      });

      return grouped;
    },
    [],
  );

  // Memoize grouped notifications
  const groupedNotifications = useMemo(
    () => groupNotificationsByDate(filteredNotifications),
    [filteredNotifications, groupNotificationsByDate],
  );

  // Cập nhật notification count
  useEffect(() => {
    const unreadCount = lsNotification.filter((n) => !n.isRead).length;
    setNotifyCount?.(unreadCount);
  }, [lsNotification, setNotifyCount]);

  // Xử lý loading state
  const isLoading = !friendRequests && !notification;

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

      <TabButtons activeTab={activeTab} onChangeTab={setActiveTab} />

      <ScrollArea className='h-[calc(100vh-200px)]'>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {Object.entries(groupedNotifications).map(([section, items]) => (
              <NotificationSection
                key={section}
                section={section}
                items={items}
              />
            ))}
            {filteredNotifications.length === 0 && (
              <EmptyState activeTab={activeTab} />
            )}
          </>
        )}
        <ScrollBar orientation='vertical' />
      </ScrollArea>
    </div>
  );
};

// Tách component con cho các phần UI lặp lại
const TabButtons = ({
  activeTab,
  onChangeTab,
}: {
  activeTab: 'all' | 'new';
  onChangeTab: (tab: 'all' | 'new') => void;
}) => (
  <div className='flex gap-4 mb-6 text-sm'>
    {(['all', 'new'] as const).map((tab) => (
      <button
        key={tab}
        className={`px-2 py-1 rounded-lg ${
          activeTab === tab
            ? 'bg-primary-100 text-primary-800 font-semibold'
            : 'bg-gray-100 text-primary-600 font-semibold'
        }`}
        onClick={() => onChangeTab(tab)}
      >
        {tab === 'all' ? 'Tất cả' : 'Chưa đọc'}
      </button>
    ))}
  </div>
);

const NotificationSection = ({
  section,
  items,
}: {
  section: string;
  items: any[];
}) => (
  <div className='mb-8'>
    <div className='flex items-center mb-4'>
      <h5 className='text-base font-semibold text-gray-900 mr-4'>{section}</h5>
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
);

const EmptyState = ({ activeTab }: { activeTab: 'all' | 'new' }) => (
  <div className='text-center py-8 text-gray-500'>
    Không có thông báo nào {activeTab === 'new' ? 'chưa đọc' : ''}
  </div>
);

const LoadingSkeleton = () => (
  <div className='space-y-4'>
    {[...Array(5)].map((_, i) => (
      <div key={i} className='animate-pulse flex items-center space-x-4'>
        <div className='rounded-full bg-gray-200 h-10 w-10'></div>
        <div className='flex-1 space-y-2'>
          <div className='h-4 bg-gray-200 rounded w-3/4'></div>
          <div className='h-4 bg-gray-200 rounded w-1/2'></div>
        </div>
      </div>
    ))}
  </div>
);

export default Page;
