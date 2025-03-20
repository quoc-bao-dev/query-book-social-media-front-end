import UserPlus from '@/components/icons/User-plus';
import LoadingIcon from '@/components/icons/LoadingIcon';

const FriendButton = ({
  onClick,
  disabled = false,
}: {
  onClick: () => void;
  disabled?: boolean;
}) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`flex flex-col items-center cursor-pointer p-1 px-3 rounded-lg w-fit h-fit transition ${
      disabled
        ? 'bg-gray-200 cursor-not-allowed'
        : 'bg-gray-50 hover:bg-gray-100'
    }`}
  >
    <div className='flex items-center gap-2'>
      {disabled ? (
        <LoadingIcon size={20} />
      ) : (
        <UserPlus className='fill-primary-500' />
      )}
      <span className='text-base font-bold text-neutral-800'>Thêm bạn bè</span>
    </div>
  </button>
);

export default FriendButton;
