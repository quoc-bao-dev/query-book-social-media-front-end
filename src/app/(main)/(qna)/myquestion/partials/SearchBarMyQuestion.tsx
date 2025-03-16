'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBarMyQuestion: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
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
    </div>
  );
};

export default SearchBarMyQuestion;
