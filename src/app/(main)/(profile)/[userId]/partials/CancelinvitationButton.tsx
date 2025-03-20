import { useState } from 'react';
import UserMinus from '@/components/icons/User-Minus';
import LoadingIcon from '@/components/icons/LoadingIcon';
import { useRemoveRequestMutation } from '@/queries/friend';

interface CancelInvitationButtonProps {
  userId: string; // ID của người dùng cần hủy lời mời
}

const CancelInvitationButton: React.FC<CancelInvitationButtonProps> = ({
  userId,
}) => {
  const [loading, setLoading] = useState(false);
  const { mutateAsync: removeRequest, isPending } = useRemoveRequestMutation();

  const handleRemoveRequest = async () => {
    if (!userId || isPending || loading) return;
    setLoading(true);
    try {
      await removeRequest(userId);
    } catch (error) {
      console.error('Lỗi khi hủy lời mời:', error);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleRemoveRequest}
      disabled={loading || isPending}
      className={`relative flex flex-col items-center  p-1 px-3 rounded-lg w-fit transition ${
        loading || isPending
          ? 'bg-gray-200 cursor-not-allowed'
          : 'bg-gray-50 hover:bg-gray-100 cursor-pointer'
      }`}
    >
      <div className='flex items-center space-x-2'>
        {loading || isPending ? (
          <LoadingIcon size={20} />
        ) : (
          <UserMinus className='fill-primary-500' />
        )}
        <span className='text-base font-bold text-neutral-800'>
          Hủy lời mời
        </span>
      </div>
    </button>
  );
};

export default CancelInvitationButton;
