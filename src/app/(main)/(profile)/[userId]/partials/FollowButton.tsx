import Rss from '@/components/icons/Rss';
import { useFollowMutation } from '@/queries/follow';

const FollowButton = ({ userId }: { userId: string }) => {
  const { mutateAsync } = useFollowMutation({ mode: 'userPage', userId });

  const handleFollow = async () => {
    await mutateAsync(userId);
  };
  return (
    <button
      onClick={handleFollow}
      className='relative flex flex-col items-center p-2 px-4 bg-gray-50 rounded-lg w-fit h-fit'
    >
      <div className='flex items-center space-x-2'>
        <Rss className='fill-primary-500' />
        <span className='text-base font-bold text-neutral-800'>Theo dõi</span>
      </div>
    </button>
  );
};

export default FollowButton;
