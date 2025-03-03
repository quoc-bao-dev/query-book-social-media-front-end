'use client';

import { Button } from '@/components/common/Button';
import Drawer from '@/components/common/Drawer';
import Cog6Tooth from '@/components/icons/Cog6Tooth';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { sSocket } from '@/provider/SocketProvider';
import { useFriendRequestQuery } from '@/queries/friend';
import { useNotificationQuery } from '@/queries/notification';
import { swal } from '@/utils/swal';
import { useEffect } from 'react';
import { signify } from 'react-signify';
import { useNotification } from '../Layout/Header';
import NotifyRow from './NotifyRow';

type UserDrawerType = {
  isShow: boolean;
};
export const sNotifyDrawer = signify<UserDrawerType>({ isShow: false });

export const useNotifyDrawer = () => ({
  open: () => sNotifyDrawer.set((n) => (n.value.isShow = true)),
  close: () => sNotifyDrawer.set((n) => (n.value.isShow = false)),
});

const NotifyDrawer = () => {
  const { setNotifyCount } = useNotification();
  const { data: friendRequests, refetch } = useFriendRequestQuery();
  const { data: notification, refetch: refetchNotification } =
    useNotificationQuery();

  const { isShow } = sNotifyDrawer.use();

  const { close } = useNotifyDrawer();

  const { socket } = sSocket.use();

  const toggleDrawer = () => {
    close();
  };

  const lsNotification = [
    ...(notification || []),
    ...(friendRequests?.map((item) => ({
      ...item,
      type: 'friend_request',
    })) || []),
  ].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  useEffect(() => {
    if (socket) {
      socket.on('receive_friend_request', (data) => {
        swal.fire({
          toast: true,
          position: 'top-end', // Vị trí góc phải trên
          icon: 'success',
          title: `${data?.firstName} ${data?.lastName} sent you a friend request!`,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          showClass: {
            popup: 'animate__animated animate__fadeInRight',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutLeft',
          },
        });
        refetch();
      });

      socket.on('accept_friend_request', (data) => {
        swal.fire({
          toast: true,
          position: 'top-end', // Vị trí góc phải trên
          icon: 'success',
          title: `${data?.firstName} ${data?.lastName} accepted your friend request!`,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          showClass: {
            popup: 'animate__animated animate__fadeInRight',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutLeft',
          },
        });
      });

      socket.on('receive_follow', (data) => {
        swal.fire({
          toast: true,
          position: 'top-end', // Vị trí góc phải trên
          icon: 'success',
          title: `${data?.firstName} ${data?.lastName} followed you!`,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          showClass: {
            popup: 'animate__animated animate__fadeInRight',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutLeft',
          },
        });
        refetchNotification();
      });
    }
    return () => {
      socket?.off('receive_friend_request');
      socket?.off('accept_friend_request');
      socket?.off('receive_follow');
      sNotifyDrawer.reset();
    };
  }, [socket]);

  useEffect(() => {
    setNotifyCount((friendRequests?.length || 0) + (notification?.length || 0));
  }, [friendRequests, notification, setNotifyCount]);
  return (
    <>
      <Drawer isOpen={isShow} onOpenChange={toggleDrawer}>
        <div className='w-[400px] h-screen flex flex-col bg-card right-0 top-0 z-50 shadow-5'>
          <div className='px-3 py-6 flex justify-between items-center'>
            <p className='font-semibold text-neutral-900'>Notification</p>
            <Cog6Tooth className='font-semibold text-neutral-900' />
          </div>

          {/* number */}
          <div className='px-3 py-2 bg-gray-300'>
            <div className='grid grid-cols-3 gap-2'>
              {/* item */}
              <div className='px-3 py-2 rounded-sm bg-card flex items-center justify-between text-neutral-900/70'>
                <p className='text-sm font-semibold'>All</p>
                <div className='py-1 px-2 rounded-sm text-xs font-semibold text-gray-50 bg-neutral-900/70'>
                  22
                </div>
              </div>
              {/* item */}

              {/* item */}
              <div className='px-3 py-2 rounded-sm bg-card flex items-center justify-between text-neutral-900/70'>
                <p className='text-sm font-semibold'>All</p>
                <div className='py-1 px-2 rounded-sm text-xs font-semibold text-gray-50 bg-neutral-900/70'>
                  22
                </div>
              </div>
              {/* item */}

              {/* item */}
              <div className='px-3 py-2 rounded-sm bg-card flex items-center justify-between text-neutral-900/70'>
                <p className='text-sm font-semibold'>All</p>
                <div className='py-1 px-2 rounded-sm text-xs font-semibold text-gray-50 bg-neutral-900/70'>
                  22
                </div>
              </div>
              {/* item */}
            </div>
          </div>
          {/* number */}

          <ScrollArea className='flex-1 pt-4 '>
            <div className='flex flex-col gap-3'>
              {/* row */}
              {lsNotification?.map((notify) => (
                <NotifyRow key={notify._id} notify={notify} />
              ))}
              {/* row */}
            </div>
            <ScrollBar orientation='vertical' />
          </ScrollArea>

          <div className='px-3 py-6'>
            <Button className='w-full bg-neutral-900 hover:bg-neutral-700 dark:bg-neutral-200 dark:hover:bg-neutral-200/90'>
              See all
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default NotifyDrawer;
