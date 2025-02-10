import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { getFirstCharacter } from '@/utils/nameUtilts';

type ChatUserRowProps = {
    avatar: string;
    name: string;
    lastMessage: string;
    selected?: boolean;
    onClick?: () => void;
};
const ChatUserRow = ({
    avatar,
    lastMessage,
    name,
    selected,
    onClick,
}: ChatUserRowProps) => {
    return (
        <div
            className={cn(
                'px-4 py-2 flex gap-2 hover:bg-gray-200/40 cursor-pointer',
                {
                    'bg-gray-200/80': selected,
                }
            )}
            onClick={onClick}
        >
            <Avatar className="h-[48px] w-[48px]">
                <AvatarImage src={avatar} />
                <AvatarFallback>{getFirstCharacter(name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <h3 className="font-semibold text-neutral-800">{name}</h3>
                <p className="text-sm text-neutral-600/70">{lastMessage}</p>
            </div>
        </div>
    );
};

export default ChatUserRow;
