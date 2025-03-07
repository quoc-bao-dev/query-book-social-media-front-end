import { formatDistanceToNow } from 'date-fns';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import AvatarUser from '../../partials/AvatarUser';
import DropdownMenu from '../../partials/DropdownMenu';
import { useState } from 'react';

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
            {createdAt
              ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
              : 'Vừa xong'}
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
