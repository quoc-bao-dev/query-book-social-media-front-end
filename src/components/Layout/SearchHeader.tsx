'use client';

import { useSearchUserQuery } from '@/queries/search';
import { useState } from 'react';
import Glass from '../icons/Glass';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import SearchResultRow from './SearchResultRow';

function SearchHeader() {
  const [isShow, setIsShow] = useState(false);
  const [keyword, setKeyword] = useState('');
  const { data } = useSearchUserQuery(keyword);

  const lsUserResult = data?.data.data;
  return (
    <div className='relative'>
      {/* search input */}
      <div className='relative'>
        <input
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          onFocus={() => setIsShow(true)}
          onBlur={() => {
            setTimeout(() => {
              setIsShow(false);
            }, 200);
          }}
          type='text'
          className='bg-background pr-6 pl-12 py-2 border-none outline-none ring-blue-500 rounded-md focus:w-[300px] duration-300 transition-all w-full group'
          placeholder='Search...'
        />
        <div className='absolute top-[50%] translate-y-[-50%] left-3'>
          <Glass />
        </div>
      </div>
      {/* search input */}

      {/* search result */}
      {isShow && (
        <div className='w-full max-h-[400px] h-[400px] absolute top-[100%] mt-2 transition-all duration-300 text-neutral-900/70'>
          <ScrollArea className='w-full h-full p-4 bg-card rounded-md'>
            {/* no result */}
            {lsUserResult?.length === 0 && (
              <p className='text-center text-sm font-semibold'>No result</p>
            )}
            {/* no result */}

            {/* recommend */}
            {!keyword && (
              <p className='text-center text-sm font-semibold'>Recommend</p>
            )}
            {/* recommend */}

            {/* result */}
            <div className='flex flex-col gap-2'>
              {lsUserResult?.map((_item) => (
                <SearchResultRow
                  key={_item.id}
                  id={_item.id}
                  name={`${_item.firstName} ${_item.lastName}`}
                  avatar={_item.avatarUrl}
                  title={_item.handle}
                  email={_item.email}
                  onClick={() => {}}
                />
              ))}
            </div>
            {/* result */}
            <ScrollBar orientation='vertical' />
          </ScrollArea>
        </div>
      )}
      {/* search result */}
    </div>
  );
}

export default SearchHeader;
