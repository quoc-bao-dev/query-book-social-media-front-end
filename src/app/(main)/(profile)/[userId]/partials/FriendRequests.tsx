import { useState, useCallback, useEffect, useRef } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import LoadingIcon from '@/components/icons/LoadingIcon';
import { useAcceptRequestMutation } from '@/queries/friend';

const FriendRequestsButton = ({ userId }: { userId: string }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { mutateAsync: acceptRequest, isPending } = useAcceptRequestMutation();

  const handleAccept = useCallback(async () => {
    setIsDropdownOpen(false);
    try {
      await acceptRequest(userId);
    } catch (error) {
      console.error('Lỗi khi chấp nhận:', error);
    }
  }, [acceptRequest, userId]);

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
    <div className='relative' ref={dropdownRef}>
      {/* Nút mở dropdown */}
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        aria-expanded={isDropdownOpen}
        aria-label='Phản hồi lời mời kết bạn'
        className='flex items-center gap-2 px-2 p-1 bg-gray-50 hover:bg-gray-100 rounded-lg text-neutral-800 font-bold transition-all focus:outline-none'
      >
        <Check className='w-5 h-5 text-primary-500' />
        <span>Phản hồi</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-600 transition-transform ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className='z-10 absolute right-0 mt-2 w-60 bg-gray-50 border border-gray-200 rounded-lg transition-opacity animate-fadeIn'>
          <button
            onClick={handleAccept}
            disabled={isPending}
            className='flex items-center w-full px-4 py-2 text-left text-primary-500 rounded-lg hover:bg-gray-300 disabled:cursor-not-allowed'
          >
            {isPending ? (
              <LoadingIcon size={20} />
            ) : (
              <Check className='w-5 h-5 mr-2' />
            )}
            <span className='font-bold'>Chấp nhận</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FriendRequestsButton;
