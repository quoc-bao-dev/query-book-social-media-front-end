'use client';
import Header from '@/components/Layout/Header';
import ChevronRightIcon2 from '@/components/icons/ChevronRightIcon2';
import { PropsWithChildren, useState } from 'react';
import SidebarQnA from './partials/SidebarQnA';

const Layout = ({ children }: PropsWithChildren) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='w-full max-w-[1200px] mx-auto relative'>
      {/* Header */}
      <Header />

      {/* Section Title */}
      <div className='pt-20 pb-3 px-8 bg-background'>
        <h1 className='text-3xl font-extrabold'>Topic</h1>
        <h2 className='text-accent-foreground'>
          Ask questions, get answers, and engage with the community
        </h2>
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
          md:sticky md:w-full md:mt-4 md:h-[calc(100vh-1rem)] md:col-span-3
          fixed top-0 left-0 h-full w-64 z-50 
          ${
            isSidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full md:translate-x-0'
          }`}
        >
          <SidebarQnA />

          {/* Button Toggle Sidebar */}
          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className='absolute top-20 -right-10 p-2 rounded-full bg-white shadow-md hover:scale-110 transition-all z-50 md:hidden'
            >
              <ChevronRightIcon2 className='w-6 h-6 text-gray-700' />
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
