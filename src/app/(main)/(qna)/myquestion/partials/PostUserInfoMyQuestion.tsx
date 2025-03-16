'use client';
import { formatDistanceToNow } from 'date-fns';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import AvatarUser from '../../partials/AvatarUser';
import DropdownMenu from '../../partials/DropdownMenu';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { enUS, vi } from 'date-fns/locale';

interface PostUserInfoProps {
  avatarUrl?: string;
  fullName: string;
  createdAt: string;
}

const PostUserInfoMyQuestion = ({
  avatarUrl,
  fullName = '', // Giá trị mặc định để tránh undefined
  createdAt,
}: PostUserInfoProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);
  const t = useTranslations('CardQuestion');
  const locale = t('locale'); // Ví dụ: "en" hoặc "vi"
  const getLocale = (locale: string) => {
    return locale === 'vi' ? vi : enUS;
  };

  // Kiểm tra nếu fullName không rỗng trước khi tách chuỗi
  const nameParts = fullName ? fullName.split(' ') : [''];

  return (
    <div className='flex items-center justify-between mt-3'>
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
                ? t('justnow') // Hiển thị "Vừa xong" hoặc "Just now"
                : formatDistanceToNow(new Date(createdAt), {
                    addSuffix: true,
                    locale: getLocale(locale),
                  }))}
          </p>
        </div>
      </div>

      <button onClick={toggleMenu} className='relative'>
        <EllipsisVerticalIcon className='h-6 w-6 text-gray-500' />
        {showMenu && <DropdownMenu />}
      </button>
    </div>
  );
};

export default PostUserInfoMyQuestion;
