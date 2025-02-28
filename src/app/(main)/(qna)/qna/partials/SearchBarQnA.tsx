'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';
import { Button } from '@/components/common/Button';

interface SearchBarQnAProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBarQnA: React.FC<SearchBarQnAProps> = ({ onSearch }) => {
  const searchRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    const value = searchRef.current?.value;
    onSearch(value!);
  };

  return (
    <div className='mb-6 relative flex justify-around items-center gap-4'>
      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
        <MagnifyingGlassIcon className='h-7 w-7 text-primary-600 px-1 ' />
      </div>
      <input
        type='text'
        placeholder='Search by author or tag...'
        ref={searchRef}
        className='w-full pl-10 px-4 py-2 placeholder-neutral-500 placeholder:opacity-70 border border-none rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
      />
      <Button onClick={handleClick}>Search</Button>
    </div>
  );
};

export default SearchBarQnA;
