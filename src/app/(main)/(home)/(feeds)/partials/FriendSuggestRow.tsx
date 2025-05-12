import { Button } from '@/components/common/Button';
import Tooltip from '@/components/common/Tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSendRequestMutation } from '@/queries/friend';
import { getFirstCharacter } from '@/utils/nameUtilts';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type FriendSuggestRowProps = {
  id: string;
  avatarUrl?: string;
  fullName: string;
  professional?: string;
  handle: string;
  isFriend: boolean;
  email: string;
};
const FriendSuggestRow = ({
  id,
  fullName,
  handle,
  professional,
  avatarUrl,
  isFriend,
  email,
}: FriendSuggestRowProps) => {
  const [isFriendState, setIsFriendState] = useState(isFriend);

  const t = useTranslations('Sidebar');

  const { isPending, mutateAsync } = useSendRequestMutation();
  const sendRequest = () => {
    mutateAsync(id);
    setIsFriendState(true);
  };
  const removeRequest = () => {
    setIsFriendState(false);
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
      <div>
        {!isFriendState ? (
          <Button size='sm' onClick={sendRequest} disabled={isPending}>
            {t('request')}
          </Button>
        ) : (
          <Button
            size='sm'
            className='bg-error-100/70 hover:bg-error-100 text-error-500'
            onClick={removeRequest}
            disabled={isPending}
          >
            {t('remove')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default FriendSuggestRow;
