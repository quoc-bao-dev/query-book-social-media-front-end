'use client';

import { cn } from '@/lib/utils';
import { Home, Bookmark, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SidebarQnA() {
  const pathname = usePathname();

  return (
    <div className=' bg-card h-full p-6 flex flex-col pt-10'>
      <nav className='mt-6'>
        <ul className='space-y-2 '>
          {/* Option Q&A */}
          <Link
            href='/qna'
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-all',
              {
                'text-primary-500 bg-primary-100/80 font-bold':
                  pathname.startsWith('/qna'),
                'text-gray-700 font-semibold hover:bg-gray-200':
                  !pathname.startsWith('/qna'),
              },
            )}
          >
            <Home
              size={22}
              className={`${
                pathname.startsWith('/qna')
                  ? 'text-primary-500 '
                  : 'text-gray-700'
              }`}
            />
            Q&A
          </Link>
          {/* Option My Question */}
          <Link
            href='/myquestion'
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-all',
              {
                'text-primary-500 bg-primary-100/80 font-bold':
                  pathname === '/myquestion',
                'text-gray-700 font-semibold hover:bg-gray-200':
                  pathname !== '/myquestion',
              },
            )}
          >
            <User
              size={22}
              className={`${
                pathname === '/myquestion'
                  ? 'text-primary-500 '
                  : 'text-gray-700'
              }`}
            />
            My Question
          </Link>

          {/* Option My Save */}
          <Link
            href='/mysave'
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-all',
              {
                'text-primary-500 bg-primary-100/80 font-bold':
                  pathname === '/mysave',
                'text-gray-700 font-semibold hover:bg-gray-200':
                  pathname !== '/mysave',
              },
            )}
          >
            <Bookmark
              size={22}
              className={`${
                pathname === '/mysave' ? 'text-primary-500 ' : 'text-gray-700'
              }`}
            />
            My Save
          </Link>
        </ul>
      </nav>
    </div>
  );
}
