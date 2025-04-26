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
import { useModalReportPost } from '../../(home)/(feeds)/partials/ModalReport';

interface CommentOptionsProps {
  answerId: string;
  questionId: string;
  isOwner: boolean;
  onEdit: () => void;
}

const CommentOptions = ({
  answerId,
  questionId,
  isOwner,
  onEdit,
}: CommentOptionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { mutate: deleteAnswer } = useDeleteAnswerMutation(questionId);
  const { openReport } = useModalReportPost(); // Lấy hàm mở modal báo cáo
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
                className='group flex items-center py-2 px-4 text-neutral-600 cursor-pointer rounded-md hover:bg-neutral-900/10'
                onClick={() => {
                  onEdit();
                  setIsOpen(false);
                }}
              >
                <PencilSquareIcon className='size-5 text-neutral-600 mr-2 ' />
                <span>{t('edit')}</span>
              </li>
            )}
            {isOwner && (
              <li
                className='group flex items-center py-2 px-4 text-red-600 cursor-pointer rounded-md hover:bg-neutral-900/10'
                onClick={handleDelete}
              >
                <TrashIcon className='size-5 text-red-600 mr-2 ' />
                <span>{t('delete')}</span>
              </li>
            )}
            {/* Nút mở modal báo cáo */}
            <li
              className='group flex items-center py-2 px-4 text-neutral-600 cursor-pointer rounded-md hover:bg-neutral-900/10'
              onClick={openReport}
            >
              <FlagIcon className='size-5 text-neutral-600 mr-2 ' />
              <span>{t('report')}</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CommentOptions;
