import UserPlus from '@/components/icons/User-plus';

const FriendButton = ({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) => (
  <button
    disabled={disabled}
    className=' flex flex-col items-center cursor-pointer p-2 px-4 bg-gray-50 rounded-lg w-fit h-fit'
  >
    <div className='flex items-center' onClick={onClick}>
      <UserPlus className='fill-primary-500' />
      <span className='text-base font-bold text-neutral-800'>Thêm bạn bè</span>
    </div>
  </button>
);

export default FriendButton;
