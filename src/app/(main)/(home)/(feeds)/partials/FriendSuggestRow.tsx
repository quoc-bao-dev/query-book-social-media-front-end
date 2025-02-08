import { Button } from '@/components/common/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSendRequestMutation } from '@/queries/friend';
import { useState } from 'react';

type FriendSuggestRowProps = {
    id: string;
    avatarUrl?: string;
    fullName: string;
    professional?: string;
    handle: string;
    isFriend: boolean;
};
const FriendSuggestRow = ({
    id,
    fullName,
    handle,
    professional,
    avatarUrl,
    isFriend,
}: FriendSuggestRowProps) => {
    const [isFriendState, setIsFriendState] = useState(isFriend);

    const { isPending, mutateAsync } = useSendRequestMutation();
    const sendRequest = () => {
        mutateAsync(id);
        setIsFriendState(true);
    };
    const removeRequest = () => {
        console.log('[remove request] id: ', id);
        setIsFriendState(false);
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
            <div>
                {!isFriendState ? (
                    <Button
                        size="sm"
                        onClick={sendRequest}
                        disabled={isPending}
                    >
                        Request
                    </Button>
                ) : (
                    <Button
                        size="sm"
                        className="bg-error-100/70 hover:bg-error-100 text-error-500"
                        onClick={removeRequest}
                        disabled={isPending}
                    >
                        Remove
                    </Button>
                )}
            </div>
        </div>
    );
};

export default FriendSuggestRow;
