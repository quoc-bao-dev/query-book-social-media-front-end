'use client';

import { useState, useRef, useEffect } from 'react';
import Users from '@/components/icons/Users';
import { useRemoveFriendMutation } from '@/queries/friend';
import LoadingIcon from '@/components/icons/LoadingIcon';
import { ChevronDown, X, Flag } from 'lucide-react';

interface FriendStatusButtonProps {
  userId: string; // Nhận userId từ component cha
}

const FriendStatusButton: React.FC<FriendStatusButtonProps> = ({ userId }) => {
  const { mutateAsync: removeFriend, isPending: isRemoveFriendPending } =
    useRemoveFriendMutation();
  const [isRemoving, setIsRemoving] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleRemoveFriends = async () => {
    if (isRemoving || isRemoveFriendPending) return;

    setIsRemoving(true);
    try {
      await removeFriend(userId);
    } catch (error) {
      console.error(`Lỗi khi xóa bạn bè:`, error);
    } finally {
      setIsRemoving(false);
      setIsDropdownOpen(false);
    }
  };

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative inline-block' ref={dropdownRef}>
      {/* Nút chính */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        disabled={isRemoving || isRemoveFriendPending}
        className='relative flex items-center p-1 px-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all'
      >
        {isRemoving || isRemoveFriendPending ? (
          <LoadingIcon size={20} />
        ) : (
          <Users className='fill-primary-500' />
        )}
        <span className='ml-2 text-base font-bold text-neutral-800'>
          Bạn bè
        </span>
        <ChevronDown className='ml-2 w-4 h-4 text-gray-600' />
      </button>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className='z-10 absolute right-0 mt-2 w-60 bg-gray-50 border border-gray-100 rounded-lg overflow-hidden'>
          {/* Hủy kết bạn */}
          <button
            onClick={handleRemoveFriends}
            className='flex items-center w-full px-4 py-2 text-left text-error-500 hover:bg-gray-300'
          >
            <X className='w-5 h-5 mr-2 text-error-500 ' />
            <div className='font-bold'>Hủy kết bạn</div>
          </button>
        </div>
      )}
    </div>
  );
};

export default FriendStatusButton;
