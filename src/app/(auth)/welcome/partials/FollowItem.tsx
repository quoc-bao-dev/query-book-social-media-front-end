'use client';

import Avatar from '@/components/common/Avatar';
import { Button } from '@/components/common/Button';
import { cn } from '@/lib/utils';
import { sFollowIdSignal } from '../signal/followIdSginal';
type FollowItemProps = {
  avatar?: string;
  name: string;
  title?: string;
  id: string;
  onFollow: (id: string) => void;
};

const FollowItem = ({ avatar, name, title, id, onFollow }: FollowItemProps) => {
  const followIds = sFollowIdSignal.use();
  const isFollowing = followIds.includes(id);
  const handleFollow = () => {
    if (!id) return;
    if (isFollowing) return;
    sFollowIdSignal.set((n) => n.value.push(id));
    onFollow(id);
  };
  return (
    <div className=' flex gap-4 w-full '>
      <div className='w-[60px] aspect-square rounded-lg overflow-hidden'>
        <Avatar
          src={avatar}
          className='w-full h-full object-cover size-[60px]'
          fallBack={name}
        />
      </div>
      <div className=''>
        <p className='text-lg font-semibold'>{name}</p>
        <p className='text-gray-600'>{title}</p>
      </div>
      <div className='ml-auto'>
        <Button
          onClick={handleFollow}
          type='button'
          className={cn({
            'bg-primary-100 text-primary-500 hover:bg-primary-200/70':
              isFollowing,
          })}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
      </div>
    </div>
  );
};

export default FollowItem;
