import { Button } from '@/components/common/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type UserFollowSuggestRowProps = {
    id: string;
    fullName: string;
    avatarUrl?: string;
    professional?: string;
    handle: string;
    onFollow: (userId: string) => void;
};
const UserFollowSuggestRow = ({
    id,
    fullName,
    avatarUrl,
    professional,
    handle,
    onFollow,
}: UserFollowSuggestRowProps) => {
    const handleFollow = () => {
        onFollow(id);
    };
    return (
        <div className="flex items-center gap w-full border rounded-xl px-4 py-4 my-2 bg-card">
            <Avatar className="w-[40px] h-[40px]">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback />
            </Avatar>
            <div className="pl-3 w-[60%]">
                <p className="">{fullName}</p>
                <p className="text-gray-700 text-[12px]">
                    {professional ?? handle}
                </p>
            </div>
            <div className="">
                <Button size="sm" onClick={handleFollow}>
                    Follow
                </Button>
            </div>
        </div>
    );
};

export default UserFollowSuggestRow;
