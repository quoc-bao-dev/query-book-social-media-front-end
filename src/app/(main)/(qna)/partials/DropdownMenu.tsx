'use client';
import {
  FlagIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { useModalReportPost } from '../../(home)/(feeds)/partials/ModalReport';

const DropdownMenu = ({
  isOwner,
  onClose,
  onEdit,
  onDelete,
}: {
  questionId: string;
  isOwner: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const t = useTranslations('DropdownMenu');
  const menuRef = useRef<HTMLDivElement>(null);
  const { openReport } = useModalReportPost(); // Lấy hàm mở modal báo cáo

  return (
    <div
      ref={menuRef}
      className='absolute right-0 top-0 mt-7 w-52 p-2 bg-background shadow-lg rounded-md border z-50'
    >
      <ul className='space-y-2'>
        {isOwner && (
          <li
            className='flex items-center py-2 px-4 text-neutral-600 hover:bg-neutral-900/10 cursor-pointer'
            onClick={() => {
              onEdit();
              onClose();
            }}
          >
            <PencilSquareIcon className='w-5 h-5 text-neutral-600 mr-2' />
            {t('edit')}
          </li>
        )}

        {isOwner && (
          <li
            className='flex items-center py-2 px-4 text-error-400 hover:bg-neutral-900/10 cursor-pointer'
            onClick={onDelete}
          >
            <TrashIcon className='w-5 h-5 text-error-400 mr-2' />
            {t('delete')}
          </li>
        )}
        <li
          className='flex items-center py-2 px-4 text-neutral-600 hover:bg-neutral-900/10 cursor-pointer'
          onClick={() => {
            openReport(); // Mở modal báo cáo
            onClose(); // Đóng menu sau khi mở modal
          }}
        >
          <FlagIcon className='w-5 h-5 text-neutral-600 mr-2' />
          {t('report')}
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
