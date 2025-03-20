'use client';
import Rss from '@/components/icons/Rss';
import { useUnfollowMutation } from '@/queries/follow';
import { useState, useEffect, useRef } from 'react';
import LoadingIcon from '@/components/icons/LoadingIcon';
import { ChevronDown, X, Flag } from 'lucide-react';

interface FollowedButtonProps {
  userId: string;
  onUnfollow?: (id: string) => void;
}

const FollowedButton: React.FC<FollowedButtonProps> = ({
  userId,
  onUnfollow,
}) => {
  const { mutateAsync: removeFollow, isPending: isRemoveFollowPending } =
    useUnfollowMutation();
  const [isUnfollowing, setIsUnfollowing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null); // ✅ Thêm ref cho dropdown

  const handleRemoveFollow = async () => {
    if (!userId || isRemoveFollowPending || isUnfollowing) return;
    try {
      setIsUnfollowing(true);
      await removeFollow(userId);
      onUnfollow?.(userId);
    } catch (error) {
      console.error('Lỗi khi hủy theo dõi:', error);
    } finally {
      setIsUnfollowing(false);
      setIsDropdownOpen(false);
    }
  };

  // ✅ Đóng dropdown khi click bên ngoài
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative inline-block' ref={dropdownRef}>
      {/* Nút chính */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        disabled={isRemoveFollowPending || isUnfollowing}
        className='relative flex items-center p-1 px-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all'
      >
        {isUnfollowing ? (
          <LoadingIcon size={20} />
        ) : (
          <Rss className='fill-primary-500' />
        )}
        <span className='ml-2 text-base font-bold text-neutral-800'>
          Đã theo dõi
        </span>
        <ChevronDown className='ml-2 w-4 h-4 text-gray-600' />
      </button>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className='z-10 absolute right-0 mt-2 w-60 bg-gray-50 border border-gray-100 rounded-lg overflow-hidden'>
          {/* Hủy theo dõi */}
          <button
            onClick={handleRemoveFollow}
            className='flex items-center w-full px-4 py-2 text-left text-error-600 hover:bg-gray-300'
          >
            <X className='w-5 h-5 mr-2 text-error-500 ' />
            <div className='font-bold'>Hủy theo dõi</div>
          </button>

          {/* Báo cáo - đặt dưới cùng */}
          <button className='flex items-center w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-300'>
            <Flag className='w-4 h-4 mr-3 text-error-500' />
            <div className='font-bold'>Báo cáo</div>
          </button>
        </div>
      )}
    </div>
  );
};

export default FollowedButton;
