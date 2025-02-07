'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getFirstCharacter } from '@/utils/nameUtilts';
import { sChat } from '../signal/chatSignal';

const ChatSideBarRight = () => {
    const { curUser } = sChat.use();
    return (
        <div className="w-[350px] h-[calc(100vh-var(--header-height))] sticky top-0 bg-card">
            <div className="pt-16 w-fit mx-auto">
                <div className="flex justify-center">
                    <Avatar className="size-[130px]">
                        <AvatarImage src={curUser?.avatarUrl} />
                        <AvatarFallback>
                            {getFirstCharacter(curUser?.fullName ?? '')}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <h2 className="text-xl font-semibold pt-2 text-neutral-800 text-center">
                    {curUser?.fullName}
                </h2>
                <p className="text-sm text-neutral-600/70 text-center">
                    Online
                </p>
                <div className="pt-3 flex justify-center">
                    <button className="px-4 py-1 font-semibold rounded-full bg-info-100/80 hover:bg-info-100 text-info-500 text-sm">
                        View Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatSideBarRight;
