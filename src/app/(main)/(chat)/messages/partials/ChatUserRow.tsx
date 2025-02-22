import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { toDuration } from '@/utils/date';
import { getFirstCharacter } from '@/utils/nameUtilts';
import Link from 'next/link';

type ChatUserRowProps = {
  id: string;
  avatar: string;
  name: string;
  lastMessage: string;
  selected?: boolean;
  isSeen?: boolean;
  onClick?: () => void;
  updatedAt?: string;
};
const ChatUserRow = ({
  id,
  avatar,
  lastMessage,
  name,
  selected,
  isSeen,
  onClick,
  updatedAt: createdAt,
}: ChatUserRowProps) => {
  return (
    <Link href={`/messages/?roomId=${id}`}>
      <div
        className={cn(
          'px-4 py-2 flex gap-2 hover:bg-gray-200/40 cursor-pointer',
          {
            'bg-gray-200/80': selected,
          },
        )}
        onClick={onClick}
      >
        <Avatar className='h-[48px] w-[48px]'>
          <AvatarImage src={avatar} />
          <AvatarFallback>{getFirstCharacter(name)}</AvatarFallback>
        </Avatar>
        <div className='flex-1'>
          <h3 className='font-semibold text-neutral-800'>{name}</h3>
          <p
            className={cn('text-sm truncate text-ellipsis', {
              'font-bold text-neutral-900': !isSeen,
              'text-neutral-600/70': isSeen,
            })}
          >
            {lastMessage}
          </p>
          {createdAt && (
            <p className='text-sm text-neutral-600/70'>
              {toDuration(createdAt)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ChatUserRow;
