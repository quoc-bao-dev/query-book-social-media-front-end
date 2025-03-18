'use client';

import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBarMyQuestion: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const handleClear = () => {
    setSearchTerm('');
    if (searchRef.current) {
      searchRef.current.value = '';
      searchRef.current.focus();
    }
  };
  const t = useTranslations('SearchBarMyQuestion');

  return (
    <div className='mb-6 relative'>
      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
        <MagnifyingGlassIcon className='h-5 w-5 text-[#00A76F]' />
      </div>
      <input
        type='text'
        placeholder={t('placeholder')}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='w-full pl-10 px-4 py-2 placeholder-neutral-500 placeholder:opacity-70 border border-none rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
      />
      {searchTerm && (
        <button
          type='button'
          onClick={handleClear}
          className='absolute right-3 inset-y-0 flex items-center text-primary-600 hover:text-primary-800'
        >
          <XCircleIcon className='h-7 w-7' />
        </button>
      )}
    </div>
  );
};

export default SearchBarMyQuestion;
