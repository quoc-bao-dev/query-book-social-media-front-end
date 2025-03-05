import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserResponse } from '@/types/user';
import { getFirstCharacter } from '@/utils/nameUtilts';

type Props = {
  user: UserResponse;
  onGetRoomChat: (id: string, name: string) => void;
};
const ChatSearchRow = ({ user, onGetRoomChat }: Props) => {
  return (
    <div
      onClick={() => onGetRoomChat(user.id, user.fullName)}
      className='px-4 py-1  bg-card rounded-lg cursor-pointer hover:bg-gray-200/40 flex gap-2'
    >
      <Avatar className='size-[48px] rounded-full overflow-hidden '>
        <AvatarImage
          className='w-full h-full object-cover'
          src={user.avatarUrl}
        />
        <AvatarFallback>{getFirstCharacter(user.fullName)}</AvatarFallback>
      </Avatar>
      <div className='flex-1'>
        <h2 className='font-semibold text-neutral-600'>{user.fullName}</h2>
        <p className='text-sm text-neutral-600/70 '>{user.email}</p>
      </div>
    </div>
  );
};

export default ChatSearchRow;
