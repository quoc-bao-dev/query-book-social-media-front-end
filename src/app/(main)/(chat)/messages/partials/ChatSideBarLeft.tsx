'use client';

import { config } from '@/config';
import axiosClient from '@/httpClient';
import { useMessageSocket } from '@/provider/SocketProvider';
import { useCreateRoomChatMutation, useRoomsChatQuery } from '@/queries/chat';
import { useSearchUserQuery } from '@/queries/search';
import { useAuth } from '@/store/authSignal';
import { UserProfileResponse } from '@/types/user';
import { useEffect, useState } from 'react';
import { sChat, useChatSignal } from '../signal/chatSignal';
import ChatSearchRow from './ChatSearchRow';
import ChatUserRow from './ChatUserRow';
import { useSearchParams } from 'next/navigation';

type RoomRow = {
    id: string;
    member: UserProfileResponse;
    members: UserProfileResponse[];
};

const ChatSideBarLeft = () => {
    const [isShowSearch, setIsShowSearch] = useState(false);
    const [keyword, setKeyword] = useState('');

    const { setCurUser, setCurMembers, setCurMemberInfo, setCurRoomId } =
        useChatSignal();

    const roomId = useSearchParams().get('roomId');
    console.log('[roomId]', roomId);

    const user = useAuth().user;

    const { curUser } = sChat.use();

    const { data } = useSearchUserQuery(keyword);

    const { data: roomsChat, refetch } = useRoomsChatQuery(user?.id || '');

    const { mutateAsync } = useCreateRoomChatMutation();

    const { socket } = useMessageSocket();

    const lsUser = data?.data.data;

    const lsRoomChat = roomsChat
        ?.filter((item) =>
            item.members.find(
                (member: UserProfileResponse) => member.id !== user?.id
            )
        )
        .map((item) => {
            const userRoom = item.members.find(
                (member: UserProfileResponse) => member.id !== user?.id
            );
            return {
                id: item._id,
                member: userRoom,
                members: item.members,
                name: item.isGroup ? item.name : userRoom?.fullName,
                avatar: item.isGroup ? item.groupAvatar : userRoom?.avatarUrl,
                lastMessage: item?.lastMessage
                    ? item?.lastMessage[0]?.content || 'Message...'
                    : 'Message...',
                updatedAt: item?.updatedAt,
            };
        });

    const selectRoomChat = (room: RoomRow) => () => {
        setCurUser(room.member);
        setCurMembers(room.members);
        setCurRoomId(room.id);
        setCurMemberInfo(room.members);
    };

    const getRoomChat = async (friendId: string, friendName: string) => {
        const roomChat = await axiosClient
            .get(`/room-chat/user/${user?.id}/friend/${friendId}`, {
                baseURL: config.MESSAGE_SERVER_URL,
            })
            .then((response) => response.data);

        if (!roomChat) {
            mutateAsync({
                friendId,
                friendName,
                user: user!,
            });
        }
    };

    useEffect(() => {
        if (socket) {
            socket.on('receive_message', () => {
                refetch();
            });
        }
        return () => {
            socket?.off('receive_message');
            socket?.disconnect();
        };
    }, [socket]);
    useEffect(() => {
        if (lsRoomChat && lsRoomChat.length > 0) {
            console.log('[lsRoomChat]', lsRoomChat);

            const indexRoom = lsRoomChat?.findIndex(
                (room) => room.id === roomId
            );
            const index = indexRoom > -1 ? indexRoom : 0;
            setCurUser(lsRoomChat[index].member!);
            setCurMembers(lsRoomChat[index].members);
            setCurRoomId(lsRoomChat[index].id);
            setCurMemberInfo(lsRoomChat[index].members);
        }
    }, [lsRoomChat, roomId]);
    return (
        <div className="w-[286px] lg:w-[350px] h-[calc(100vh-var(--header-height))] sticky top-0 bg-card flex flex-col">
            <h1 className="text-xl font-semibold text-neutral-800 px-4 pt-4">
                Messages
            </h1>
            <div className="px-4 pt-2">
                <div className="w-full">
                    <input
                        type="text"
                        className="w-full border border-gray-300 ring-info-500 outline-info-500 px-4 py-2 rounded-full"
                        placeholder="Search messages"
                        onChange={(e) => setKeyword(e.target.value)}
                        onFocus={() => setIsShowSearch(true)}
                        onBlur={() =>
                            setTimeout(() => {
                                setIsShowSearch(false);
                            }, 200)
                        }
                    />
                </div>
            </div>

            {/* user rows */}
            <div className="relative py-2 flex flex-col gap-2 flex-1 mb-[56px] md:mb-0 scrollbar-custom ">
                {lsRoomChat?.map((room) => (
                    <ChatUserRow
                        key={room.id}
                        id={room.id}
                        onClick={() => {}}
                        avatar={room.avatar ?? ''}
                        name={room.name ?? 'User name'}
                        lastMessage={room.lastMessage}
                        selected={room.member?.id === curUser?.id}
                        updatedAt={room.updatedAt}
                    />
                ))}

                {isShowSearch && (
                    <div className="absolute inset-0 bg-red-400">
                        <div className="w-full h-full bg-card flex flex-col gap-2 px-4 py-2">
                            {(lsUser?.length === 0 || !lsUser) && (
                                <p className="text-sm text-center text-neutral-600/70 font-semibold">
                                    No user found
                                </p>
                            )}
                            {lsUser?.map((user) => (
                                <ChatSearchRow
                                    key={user.id}
                                    user={user}
                                    onGetRoomChat={getRoomChat}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {/* user rows */}
        </div>
    );
};

export default ChatSideBarLeft;
