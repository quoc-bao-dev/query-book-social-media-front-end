'use client';

import { cn } from '@/lib/utils';
import { Bookmark, Home, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SidebarSearch() {
  const pathname = usePathname();

  return (
    <div className=' bg-card h-full p-6 flex flex-col  '>
      <nav className='mt-10 '>
        <ul className='space-y-2 '>
          {/* Option Q&A */}
          <Link
            href='/searchpage'
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-all',
              {
                'text-primary-500 bg-primary-100/80 font-bold':
                  pathname.startsWith('/searchpage'),
                'text-neutral-700 font-semibold hover:bg-gray-200':
                  !pathname.startsWith('/searchpage'),
              },
            )}
          >
            <Home
              size={22}
              className={`${
                pathname.startsWith('/searchpage')
                  ? 'text-primary-500 '
                  : 'text-neutral-700'
              }`}
            />
            Search Page
          </Link>
          {/* Option My Question */}
          <Link
            href='/searchuser'
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-all',
              {
                'text-primary-500 bg-primary-100/80 font-bold':
                  pathname === '/searchuser',
                'text-neutral-700 font-semibold hover:bg-gray-200':
                  pathname !== '/searchuser',
              },
            )}
          >
            <User
              size={22}
              className={`${
                pathname === '/searchuser'
                  ? 'text-primary-500 '
                  : 'text-neutral-700'
              }`}
            />
            Search Users
          </Link>

          {/* Option My Save */}
          <Link
            href='/searchpost'
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-all',
              {
                'text-primary-500 bg-primary-100/80 font-bold':
                  pathname === '/searchpost',
                'text-neutral-700 font-semibold hover:bg-gray-200':
                  pathname !== '/searchpost',
              },
            )}
          >
            <Bookmark
              size={22}
              className={`${
                pathname === '/searchpost'
                  ? 'text-primary-500 '
                  : 'text-neutral-700'
              }`}
            />
            Search Posts
          </Link>
        </ul>
      </nav>
    </div>
  );
}
