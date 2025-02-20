import { useAcceptRequestMutation } from '@/queries/friend';
import { Button } from '../common/Button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { getFirstCharacter } from '@/utils/nameUtilts';

type FriendRequestRowProps = {
    id: string;
    avatar: string;
    name: string;
    createdAt: string;
};
const FriendRequestRow = ({
    avatar,
    name,
    id,
    createdAt,
}: FriendRequestRowProps) => {
    const { mutateAsync } = useAcceptRequestMutation();
    const accept = () => {
        mutateAsync(id);
    };
    return (
        <div className="py-4 px-3 flex gap-4 border-b border-gray-200">
            <div className="">
                <Avatar>
                    <AvatarImage src={avatar} />
                    <AvatarFallback>{getFirstCharacter(name)}</AvatarFallback>
                </Avatar>
            </div>
            <div className="">
                <p className="">
                    <span className="font-semibold">{name} </span> has sent a
                    friend request
                </p>
                <p className="text-neutral-900/30">
                    {formatDistanceToNow(createdAt, { addSuffix: true })}
                </p>
                <div className="pt-2 flex gap-3 ">
                    <Button size="sm" className="px-5" onClick={accept}>
                        Accept
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="px-5 bg-primary-100/70"
                    >
                        Reject
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FriendRequestRow;
