'use client';
import Header from '@/components/Layout/Header';
import ChevronRightIcon2 from '@/components/icons/ChevronRightIcon2';
import { useAuth } from '@/store/authSignal';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { PropsWithChildren, useState } from 'react';
import SidebarQnA from './partials/SidebarQnA';
import WelcomeToastModal from './partials/WelcomeToastModal';

const Layout = ({ children }: PropsWithChildren) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const t = useTranslations('Layout');
  const { user } = useAuth();

  return (
    <div className='w-full max-w-[1300px] mx-auto relative'>
      {/* Header */}
      <Header />

      {/* Section Title */}
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-8 md:px-0 pt-20 pb-6 bg-background'>
        {/* Tiêu đề và mô tả */}
        <div>
          <Link
            href='/qna'
            className='inline-block tracking-widest text-3xl font-bold mb-3 bg-primary text-white py-2 px-5 rounded-md shadow-md hover:bg-primary/90 transition'
          >
            {t('topic')}
          </Link>
          <p className='text-muted-foreground text-base'>{t('title')}</p>
        </div>

        {/* Welcome user */}
        <WelcomeToastModal user={user} t={t} />
      </div>

      {/* Layout grid */}
      <div className='grid grid-cols-10 min-h-screen bg-background relative'>
        {/* Overlay (để đóng sidebar khi click ra ngoài) */}
        {isSidebarOpen && (
          <div
            className='fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden'
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`bg-card shadow-lg transition-all duration-300 ease-in-out 
  md:sticky md:top-5 md:w-full md:h-[calc(100vh-1.25rem)] md:col-span-3
  fixed top-0 mt-4 left-0 h-full w-64 z-50 
  ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        >
          <SidebarQnA />

          {/* Button Toggle Sidebar */}
          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className='absolute top-20 -right-10 p-2 rounded-full bg-white shadow-md hover:scale-110 transition-all z-50 md:hidden'
            >
              <ChevronRightIcon2 className='w-6 h-6 text-neutral-500' />
            </button>
          )}
        </div>

        {/* Nội dung chính */}
        <div className='col-span-10 md:col-span-7 p-4'>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
