'use client';

import { useDeleteAnswerMutation } from '@/queries/answer';
import {
  EllipsisVerticalIcon,
  FlagIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

interface CommentOptionsProps {
  answerId: string;
  questionId: string;
  isOwner: boolean;
  onEdit: () => void; // Nhận callback function
}

const CommentOptions = ({
  answerId,
  questionId,
  isOwner,
  onEdit, // Nhận prop onEditClick
}: CommentOptionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { mutate: deleteAnswer } = useDeleteAnswerMutation(questionId);
  const t = useTranslations('DropdownMenu');

  const handleDelete = useCallback(() => {
    deleteAnswer(answerId);
  }, [deleteAnswer, answerId]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div className='relative' ref={menuRef}>
      {/* Nút mở menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='p-2 rounded-full hover:bg-gray-200'
      >
        <EllipsisVerticalIcon className='w-5 h-5 text-gray-600' />
      </button>

      {isOpen && (
        <div className='absolute right-[-85px] top-3 mt-7 w-52 p-3 bg-background shadow-lg rounded-md border z-50'>
          <ul className='space-y-2'>
            {isOwner && (
              <li
                className='group flex items-center py-2 px-4 text-gray-700 cursor-pointer rounded-md hover:bg-neutral-900/10'
                onClick={() => {
                  onEdit();
                  console.log('jksdhjsdjgh', onEdit);

                  setIsOpen(false); // Đóng menu sau khi click
                }}
              >
                <PencilSquareIcon className='w-5 h-5 text-gray-700 mr-2 ' />
                <span>{t('edit')}</span>
              </li>
            )}
            {isOwner && (
              <li
                className='group flex items-center py-2 px-4 text-red-600 cursor-pointer rounded-md hover:bg-neutral-900/10'
                onClick={handleDelete}
              >
                <TrashIcon className='w-5 h-5 text-red-600 mr-2 ' />
                <span>{t('delete')}</span>
              </li>
            )}
            <li className='group flex items-center py-2 px-4 text-gray-700 cursor-pointer rounded-md hover:bg-neutral-900/10'>
              <FlagIcon className='w-5 h-5 text-gray-700 mr-2 ' />
              <span>{t('report')}</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CommentOptions;
