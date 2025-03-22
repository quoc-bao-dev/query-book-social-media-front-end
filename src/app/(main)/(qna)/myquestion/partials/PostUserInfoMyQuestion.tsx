'use client';
import { formatDistanceToNow } from 'date-fns';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import AvatarUser from '../../partials/AvatarUser';
import DropdownMenu from '../../partials/DropdownMenu';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { enUS, vi } from 'date-fns/locale';

interface PostUserInfoProps {
  avatarUrl?: string;
  fullName: string;
  createdAt: string;
  questionId: string;
  isOwner: boolean;
}

const PostUserInfoMyQuestion = ({
  avatarUrl,
  fullName = '',
  createdAt,
  questionId,
  isOwner,
}: PostUserInfoProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const t = useTranslations('CardQuestion');
  const locale = t('locale');
  const getLocale = (locale: string) => {
    return locale === 'vi' ? vi : enUS;
  };

  console.log('DropdownMenu isOwner:', isOwner);

  const nameParts = fullName ? fullName.split(' ') : [''];

  // Xử lý click bên ngoài để đóng menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='flex items-center justify-between mt-3' ref={menuRef}>
      <div className='flex items-center space-x-2'>
        <AvatarUser
          src={avatarUrl || ''}
          firstName={nameParts[0] || ''}
          lastName={nameParts.slice(1).join(' ') || ''}
        />
        <div className='flex justify-around items-center gap-2'>
          <p className='font-semibold text-neutral-900'>{fullName}</p>
          <p className='text-2xl text-neutral-500 '>•</p>
          <p className='text-sm text-neutral-500'>
            {createdAt &&
              (new Date().getTime() - new Date(createdAt).getTime() < 60000
                ? t('justnow')
                : formatDistanceToNow(new Date(createdAt), {
                    addSuffix: true,
                    locale: getLocale(locale),
                  }))}
          </p>
        </div>
      </div>

      <div className='relative'>
        <button onClick={() => setShowMenu(!showMenu)}>
          <EllipsisVerticalIcon className='h-6 w-6 text-gray-500' />
        </button>

        {showMenu && (
          <DropdownMenu
            questionId={questionId}
            isOwner={isOwner}
            onClose={() => setShowMenu(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PostUserInfoMyQuestion;
