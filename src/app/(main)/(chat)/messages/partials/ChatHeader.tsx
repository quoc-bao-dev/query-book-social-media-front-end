'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getFirstCharacter } from '@/utils/nameUtilts';
import { Phone } from 'lucide-react';
import { sChat } from '../signal/chatSignal';

const ChatHeader = () => {
    const { curUser } = sChat.use();
    return (
        <div className="h-[64px] px-4 border-b border-gray-300 flex justify-between items-center">
            {/* info */}
            <div className="flex gap-2">
                <Avatar className="h-[48px] w-[48px]">
                    <AvatarImage src={curUser?.avatarUrl} />
                    <AvatarFallback>
                        {getFirstCharacter(curUser?.fullName ?? 'User Name')}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <h3 className="font-semibold text-neutral-800">
                        {curUser?.fullName}
                    </h3>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <p className="text-sm text-neutral-600/70">Online</p>
                    </div>
                </div>
            </div>
            {/* info */}

            {/* button */}
            <div className="flex gap-2 items-center text-primary-500">
                <Phone className="w-6 h-6 " />
            </div>
            {/* button */}
        </div>
    );
};

export default ChatHeader;
