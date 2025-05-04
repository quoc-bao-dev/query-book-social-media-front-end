'use client';

import { cn } from '@/lib/utils';
import { useGetAllTopic } from '@/queries/topic';
import { TopicResponse } from '@/types/topic';
import { Bookmark, ChevronDown, Home, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SidebarQnA() {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [hashtag, setHashtag] = useState('');

  const pathname = usePathname();
  const t = useTranslations('SidebarQnA');
  const { data, error: fetchError } = useGetAllTopic();
  const router = useRouter();

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopic(topicId);
    const searchParams = new URLSearchParams(window.location.search);
    if (topicId) {
      searchParams.set('topic', topicId);
    } else {
      searchParams.delete('topic');
    }
    router.push(`/qna?${searchParams.toString()}`);
  };

  useEffect(() => {
    const topicFromParam = new URLSearchParams(window.location.search).get(
      'topic',
    );
    if (topicFromParam) setSelectedTopic(topicFromParam);
  }, []);

  return (
    <div className='bg-card h-full p-6 flex flex-col'>
      <nav className='mt-6'>
        <ul className='space-y-2'>
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
              className={
                pathname.startsWith('/qna')
                  ? 'text-primary-500'
                  : 'text-gray-700'
              }
            />
            {t('qna')}
          </Link>
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
              className={
                pathname === '/myquestion'
                  ? 'text-primary-500'
                  : 'text-gray-700'
              }
            />
            {t('myquestion')}
          </Link>
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
              className={
                pathname === '/mysave' ? 'text-primary-500' : 'text-gray-700'
              }
            />
            {t('mysave')}
          </Link>
        </ul>
      </nav>

      <div className='my-6 border-t border-gray-300'></div>

      <div className='mt-6 p-4 bg-background rounded-xl'>
        <div className='flex justify-center font-semibold text-xl pb-5'>
          {t('filter')}
        </div>
        <div className='mb-4'>
          <label className='text-sm font-medium text-neutral-700 mb-1 block'>
            {t('searchhashtag')}
          </label>
          <div className='flex justify-around items-center gap-2'>
            <input
              type='text'
              value={hashtag}
              onChange={(e) => setHashtag(e.target.value)}
              placeholder={t('enterhashtag')}
              className='w-full px-4 py-2 placeholder:text-neutral-500 rounded-lg shadow-sm focus:ring-2 focus:ring-neutral-500 focus:outline-none'
            />
          </div>
        </div>

        <div>
          <label className='text-sm font-medium text-neutral-700 mb-1 block'>
            {t('selecttopic')}
          </label>
          {fetchError ? (
            <p className='text-red-500'>Failed to load topics</p>
          ) : (
            <div className='relative'>
              <select
                value={selectedTopic}
                onChange={(e) => handleSelectTopic(e.target.value)}
                className='w-full p-2 rounded-lg appearance-none focus:ring-2 focus:ring-neutral-500'
              >
                <option value='' hidden>
                  {t('selectatopic')}
                </option>
                {data?.map((topic: TopicResponse) => (
                  <option key={topic._id} value={topic._id}>
                    {topic.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className='absolute right-3 top-3 text-neutral-700 pointer-events-none'
                size={18}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
