import { Button } from '@/components/common/Button';
import Tooltip from '@/components/common/Tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getFirstCharacter } from '@/utils/nameUtilts';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type UserFollowSuggestRowProps = {
  id: string;
  fullName: string;
  avatarUrl?: string;
  professional?: string;
  handle: string;
  email: string;
  onFollow: (userId: string) => void;
};
const UserFollowSuggestRow = ({
  id,
  fullName,
  avatarUrl,
  professional,
  handle,
  email,
  onFollow,
}: UserFollowSuggestRowProps) => {
  const t = useTranslations('Sidebar');
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    if (isFollowing) return;
    setIsFollowing(true);
    onFollow(id);
  };
  return (
    <div className='flex items-center gap w-full border rounded-xl px-4 py-4 my-2 bg-card'>
      <Avatar className='w-[40px] h-[40px]'>
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>{getFirstCharacter(fullName)}</AvatarFallback>
      </Avatar>
      <div className='pl-3 w-[60%]'>
        <Tooltip content={email}>
          <p className='text-sm'>{fullName}</p>
        </Tooltip>
        <p className='text-gray-700 text-[12px]'>{professional ?? handle}</p>
      </div>
      <div className=''>
        <Button
          size='sm'
          variant={isFollowing ? 'lighten' : 'primary'}
          onClick={handleFollow}
          disabled={isFollowing}
        >
          {!isFollowing ? t('follow') : t('following')}
        </Button>
      </div>
    </div>
  );
};

export default UserFollowSuggestRow;
