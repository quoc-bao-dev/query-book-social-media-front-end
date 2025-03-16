'use client';
import {
  FlagIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

const DropdownMenu = () => {
  const t = useTranslations('DropdownMenu');
  return (
    <div className='absolute right-0 top-0 mt-7 w-52 p-2 bg-background shadow-lg rounded-md border z-50'>
      <ul className='space-y-2'>
        <li className='flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 cursor-pointer'>
          <PencilSquareIcon className='w-5 h-5 text-gray-700 mr-2' />
          {t('edit')}
        </li>
        <li className='flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 cursor-pointer'>
          <TrashIcon className='w-5 h-5 text-gray-700 mr-2' />
          {t('delete')}
        </li>
        <li className='flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 cursor-pointer'>
          <FlagIcon className='w-5 h-5 text-gray-700 mr-2' />
          {t('report')}
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
