'use client';

import { useParams } from 'next/navigation';
import Users from '@/components/icons/Users';

interface FriendStatusButtonProps {
  onClick?: (id: string) => void; // Hàm xử lý sự kiện
}

const FriendStatusButton: React.FC<FriendStatusButtonProps> = ({ onClick }) => {
  const params = useParams(); // Lấy params từ URL
  const id = params.userId as string; // Lấy userId từ URL params

  return (
    <button
      onClick={() => onClick?.(id)} // Gọi hàm onClick và truyền id
      className='relative flex flex-col items-center cursor-pointer p-2 px-4 bg-gray-50 rounded-lg w-fit'
    >
      <div className='flex items-center space-x-2'>
        <Users className='fill-primary-500' />
        <span className='text-base font-bold text-neutral-800'>Bạn bè</span>
      </div>
    </button>
  );
};

export default FriendStatusButton;
