'use client';

import { useParams } from 'next/navigation';
import Rss from '@/components/icons/Rss';

interface FollowedButtonProps {
  onClick?: (id: string) => void;
}

const FollowedButton: React.FC<FollowedButtonProps> = ({ onClick }) => {
  const params = useParams();
  const id = params?.userId as string | undefined; // Kiểm tra userId từ URL

  return (
    <button
      onClick={() => id && onClick?.(id)} // Chỉ gọi onClick nếu có userId hợp lệ
      disabled={!id} // Vô hiệu hóa nút nếu không có userId
      className={`relative flex flex-col items-center p-2 px-4 rounded-lg w-fit transition
        ${id ? 'bg-gray-50 hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'}
      `}
    >
      <div className='flex items-center space-x-2 rounded-md'>
        <Rss className='fill-primary-500' />
        <span className='text-base font-bold text-neutral-800'>
          Đã theo dõi
        </span>
      </div>
    </button>
  );
};

export default FollowedButton;
