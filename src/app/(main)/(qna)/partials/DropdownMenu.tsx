'use client';
import {
  FlagIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

const DropdownMenu = ({
  isOwner,
  onClose, // Thêm props để đóng menu
  onEdit, // ✅ Nhận thêm prop onEdit
  onDelete,
}: {
  questionId: string;
  isOwner: boolean;
  onClose: () => void;
  onEdit: () => void; // ✅ Hàm bật chế độ chỉnh sửa
  onDelete: () => void; // ✅ Hàm xóa bài viết
}) => {
  const t = useTranslations('DropdownMenu');
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={menuRef}
      className='absolute right-0 top-0 mt-7 w-52 p-2 bg-background shadow-lg rounded-md border z-50'
    >
      <ul className='space-y-2'>
        {isOwner && (
          <li
            className='flex items-center py-2 px-4 text-gray-700 hover:bg-neutral-900/10 cursor-pointer'
            onClick={() => {
              onEdit(); // ✅ Bật chế độ chỉnh sửa
              onClose();
            }}
          >
            <PencilSquareIcon className='w-5 h-5 text-gray-700 mr-2' />
            {t('edit')}
          </li>
        )}

        {isOwner && (
          <li
            className='flex items-center py-2 px-4 text-red-600 hover:bg-neutral-900/10 cursor-pointer'
            onClick={onDelete} // Gọi hàm xóa ở đây
          >
            <TrashIcon className='w-5 h-5 text-red-600 mr-2' />
            {t('delete')}
          </li>
        )}
        <li
          className='flex items-center py-2 px-4 text-gray-700 hover:bg-neutral-900/10 cursor-pointer'
          onClick={onClose} // Đóng menu khi chọn báo cáo
        >
          <FlagIcon className='w-5 h-5 text-gray-700 mr-2' />
          {t('report')}
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
