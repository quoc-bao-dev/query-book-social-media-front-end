'use client';

import { useUserDrawer } from '@/app/(main)/partials/UserDrawer';
import { useNotifyDrawer } from '@/components/NotifyDrawer/NotifyDrawer';
import Image from 'next/image';
import Link from 'next/link';
import { signify } from 'react-signify';
import Bar3 from '../icons/Bar3';
import Bell from '../icons/Bell';
import ChatBubbleOvalLeftEllipsis from '../icons/ChatBubbleOvalLeftEllipsis';
import Cog6Tooth from '../icons/Cog6Tooth';
import Avatar from './Avatar';
import LocaleSwitcher from './LocaleSwitcher';
import NavMenu from './NavMenu';
import SearchHeader from './SearchHeader';
import { useSettingDrawer } from '@/app/(main)/partials/SettingDrawer';

export const sNotification = signify<{ count: number }>({ count: 0 });

export const useNotification = () => ({
  setNotifyCount: (count: number) =>
    sNotification.set((n) => (n.value.count = count)),
});

const Header = () => {
  const { open: openNotifyDrawer } = useNotifyDrawer();
  const { open: openUserDrawer } = useUserDrawer();

  const { open } = useSettingDrawer();

  return (
    <>
      <header className='flex items-center bg-card border-b border-gray-500/40 fixed top-0 left-0 w-full z-50 h-[var(--header-height)]'>
        <div className='w-full mx-auto px-4 flex justify-between items-center relative'>
          {/* logo & search */}
          <div className='flex gap-6 items-center'>
            <Link href='/'>
              <Image
                src={'/images/logo_QBook.png'}
                alt='logo-qbook'
                className='w-[120px]'
                width={200}
                height={0}
              />
            </Link>
            <SearchHeader />
          </div>
          {/* logo & search */}

          {/* Nav */}

          <div className='absolute left-[50%] translate-x-[-50%] hidden lg:block'>
            <NavMenu />
          </div>
          {/* Nav */}

          {/* action buttons */}
          <div className='flex gap-6 items-center justify-center z-50'>
            <div
              onClick={open}
              className='hidden md:block p-2 rounded-full hover:bg-gray-200 transition-all duration-200'
            >
              <Cog6Tooth className='size-6 text-primary-500' />
            </div>

            <div className='hidden md:block z-50'>
              <LocaleSwitcher />
            </div>
            <div className='hidden md:block p-2 rounded-full hover:bg-gray-200 transition-all duration-200'>
              <Link href={'/messages'}>
                <ChatBubbleOvalLeftEllipsis className='size-6 text-primary-500' />
              </Link>
            </div>

            <div
              className='relative hidden md:block p-2 rounded-full hover:bg-gray-200 transition-all duration-200'
              onClick={openNotifyDrawer}
            >
              <Bell className='size-6 text-primary-500' />

              {
                <sNotification.HardWrap>
                  {({ count }) => (
                    <>
                      {count > 0 && (
                        <div className='absolute top-0 right-0 size-5 text-white font-medium text-xs flex bg-error-500 rounded-full'>
                          <p className='m-auto'>{count}</p>
                        </div>
                      )}
                    </>
                  )}
                </sNotification.HardWrap>
              }
            </div>

            <div className='hidden lg:block' onClick={openUserDrawer}>
              <Avatar />
            </div>

            <div className='block md:hidden p-2 rounded-full hover:bg-gray-200 transition-all duration-200'>
              <Bar3 className='size-6 text-primary-500' />
            </div>
          </div>
          {/* action buttons */}
        </div>
      </header>
    </>
  );
};

export default Header;
