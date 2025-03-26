'use client';
import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const t = useTranslations('SearchBarQnA');
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className='mb-6 relative flex items-center gap-4'>
      {/* Icon Search */}
      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
        <MagnifyingGlassIcon className='h-6 w-6 text-gray-500' />
      </div>

      {/* Ô input */}
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('placeholder')}
        className='w-full pl-10 px-4 py-2 placeholder-gray-500 placeholder-opacity-70 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all'
      />

      {/* Nút Search */}
      <Button onClick={handleSearch}>{t('button')}</Button>
    </div>
  );
};

export default SearchBar;
