'use client';

import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchBarPost = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');
  const [searchedQuery, setSearchedQuery] = useState<string | null>(null);

  const handleSearch = () => {
    onSearch(query);
    setSearchedQuery(query);
  };

  return (
    <div className='mb-6'>
      <div className='relative flex items-center gap-4'>
        {/* Icon Search */}
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <MagnifyingGlassIcon className='h-6 w-6 text-gray-500' />
        </div>

        {/* Ô input */}
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Tìm kiếm bài viết...'
          className='w-full pl-10 px-4 py-2 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all'
        />

        {/* Nút Search */}
        <Button onClick={handleSearch}>Tìm kiếm</Button>
      </div>
      {/* Hiển thị kết quả tìm kiếm */}
      {searchedQuery && (
        <p className='mt-4 text-gray-700 text-lg font-semibold'>
          Kết quả tìm kiếm:{' '}
          <span className='text-green-600'>{searchedQuery}</span>
        </p>
      )}
    </div>
  );
};

export default SearchBarPost;
