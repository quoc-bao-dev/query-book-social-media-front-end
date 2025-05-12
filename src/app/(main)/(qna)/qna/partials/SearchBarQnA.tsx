'use client';

import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useState, useRef } from 'react';
import { Button } from '@/components/common/Button';
import { useTranslations } from 'next-intl';

interface SearchBarQnAProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBarQnA: React.FC<SearchBarQnAProps> = ({ onSearch }) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const t = useTranslations('SearchBarQnA');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    if (searchRef.current) {
      searchRef.current.value = '';
      searchRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className='mb-6 relative flex items-center gap-4 w-full'>
      {/* Icon kính lúp */}
      <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
        <MagnifyingGlassIcon className='h-6 w-6 text-primary-600' />
      </div>

      {/* Input tìm kiếm */}
      <input
        type='text'
        placeholder={t('placeholder')}
        ref={searchRef}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        className='w-full pl-10 pr-12 px-4 py-2 placeholder-neutral-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
      />

      {/* Nút clear (dấu X) */}
      {searchTerm && (
        <button
          type='button'
          onClick={handleClear}
          className='absolute right-28 inset-y-0 flex items-center text-primary-600 hover:text-primary-800'
        >
          <XCircleIcon className='h-7 w-7' />
        </button>
      )}

      {/* Nút tìm kiếm */}
      <Button onClick={handleSearch}>{t('button')}</Button>
    </div>
  );
};

export default SearchBarQnA;
