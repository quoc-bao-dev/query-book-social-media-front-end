import LoadingIcon from '@/components/icons/LoadingIcon';
import Rss from '@/components/icons/Rss';
import { useFollowMutation } from '@/queries/follow';
import { useState } from 'react';

const FollowButton = ({ userId }: { userId: string }) => {
  const { mutateAsync, isPending } = useFollowMutation({
    mode: 'userPage',
    userId,
  });

  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    if (isPending || isFollowing) return;
    try {
      setIsFollowing(true);
      await mutateAsync(userId);
    } catch (error) {
      console.error('Lỗi khi theo dõi:', error);
    } finally {
      setIsFollowing(false);
    }
  };

  return (
    <button
      onClick={handleFollow}
      disabled={isPending || isFollowing}
      className={`relative flex flex-col items-center p-1 px-3 rounded-lg w-fit h-fit transition
        ${
          isPending || isFollowing
            ? 'bg-gray-200 cursor-not-allowed'
            : 'bg-gray-50 hover:bg-gray-100'
        }
      `}
    >
      <div className='flex items-center space-x-2'>
        {isPending || isFollowing ? (
          <LoadingIcon size={20} />
        ) : (
          <Rss className='fill-primary-500' />
        )}
        <span className='text-base font-bold text-neutral-800'>Theo dõi</span>
      </div>
    </button>
  );
};

export default FollowButton;
