'use client';

import TypingIndicator from '@/components/icons/TypingIndicator';
import { useMessageSocket } from '@/provider/SocketProvider';
import { useMessageQuery } from '@/queries/chat';
import { useAuth } from '@/store/authSignal';
import { useEffect, useRef, useState } from 'react';
import { useChatScroll } from '../hooks/useChatScroll';
import { sChat } from '../signal/chatSignal';
import MessageLeft from './MessageLeft';
import MessageRight from './MessageRigth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getFirstCharacter } from '@/utils/nameUtilts';

const Chat = () => {
    const [isTyping, setIsTyping] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const { user } = useAuth();
    const { curRoomId, curMemberInfo, curUser } = sChat.use();
    const { socket } = useMessageSocket();
    const { data, refetch } = useMessageQuery(curRoomId);

    const scrollRef = useChatScroll([data, isTyping]);

    const handleTyping = (data: { groupId: string; senderId: string }) => {
        console.log('[data.groupId]', data.groupId);
        console.log('[curRoomId]', curRoomId);

        if (data.groupId !== curRoomId && data.senderId === user?.id) return;
        setIsTyping(true);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            setIsTyping(false);
        }, 1000);
    };

    useEffect(() => {
        if (!socket) return;

        if (socket) {
            socket.on('receive_message', () => {
                refetch();
            });

            socket.on('typing', (data) => {
                handleTyping(data);
            });
        }

        return () => {
            socket.off('receive_message');
            socket.off('typing');
        };
    }, [socket]);
    return (
        <div className="flex-1 max-h-full bg-neutral-50 ">
            <div
                className="md:h-[calc(100vh-var(--header-height)-64px-60px)] h-[calc(100vh-var(--header-height)-64px-60px-56px)] px-4 overflow-y-scroll"
                ref={scrollRef}
            >
                <div className="flex flex-col gap-3 py-3">
                    {data?.map((message) =>
                        user?.id !== message.senderId ? (
                            <MessageLeft
                                key={message._id}
                                avatar={
                                    curMemberInfo[message.senderId].avatarUrl
                                }
                                content={message.content}
                                name={curMemberInfo[message.senderId].fullName}
                            />
                        ) : (
                            <MessageRight
                                key={message._id}
                                avatar={
                                    curMemberInfo[message.senderId].avatarUrl
                                }
                                content={message.content}
                                name={curMemberInfo[message.senderId].fullName}
                            />
                        )
                    )}
                    {isTyping && (
                        <div className="flex gap-2 items-center">
                            <Avatar className="size-[40px]">
                                <AvatarImage
                                    src={
                                        curUser?.id &&
                                        curMemberInfo[curUser.id!].avatarUrl
                                    }
                                />
                                <AvatarFallback>
                                    {getFirstCharacter(
                                        (curUser?.id &&
                                            curMemberInfo[curUser.id!]
                                                .fullName)!
                                    )}
                                </AvatarFallback>
                            </Avatar>
                            <div className="py-2 px-3">
                                <TypingIndicator />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chat;
