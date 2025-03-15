import UserMinus from '@/components/icons/User-Minus';

interface CancelinvitationButtonProps {
  onClick?: () => void;
}

const CancelinvitationButton: React.FC<CancelinvitationButtonProps> = ({
  onClick,
}) => (
  <button
    onClick={onClick} // Thêm sự kiện onClick vào button
    className='relative flex flex-col items-center cursor-pointer p-2 px-4 bg-gray-50 rounded-lg w-fit'
  >
    <div className='flex items-center space-x-2'>
      <UserMinus className='fill-primary-500' />
      <span className='text-base font-bold text-neutral-800'>Hủy lời mời</span>
    </div>
  </button>
);

export default CancelinvitationButton;
