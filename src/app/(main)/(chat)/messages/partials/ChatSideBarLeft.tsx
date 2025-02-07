'use client';

import { config } from '@/config';
import axiosClient from '@/httpClient';
import { useCreateRoomChatMutation, useRoomsChatQuery } from '@/queries/chat';
import { useSearchUserQuery } from '@/queries/search';
import { useAuth } from '@/store/authSignal';
import { UserProfileResponse } from '@/types/user';
import { useEffect, useState } from 'react';
import { sChat, useChatSignal } from '../signal/chatSignal';
import ChatSearchRow from './ChatSearchRow';
import ChatUserRow from './ChatUserRow';

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

    const user = useAuth().user;

    const { curUser } = sChat.use();

    const { data } = useSearchUserQuery(keyword);

    const { data: roomsChat } = useRoomsChatQuery(user?.id || '');

    const { mutateAsync } = useCreateRoomChatMutation();

    const lsUser = data?.data.data;

    const lsRoomChat = roomsChat?.map((item) => {
        const userRoom = item.members.find(
            (member: UserProfileResponse) => member.id !== user?.id
        );
        return {
            id: item._id,
            member: userRoom,
            members: item.members,
            name: item.isGroup ? item.name : userRoom?.fullName,
            avatar: item.isGroup ? item.groupAvatar : userRoom?.avatarUrl,
            lastMessage:
                item.messages[item.messages.length - 1]?.content ??
                'Chat with you',
        };
    });

    const selectRoomChat = (room: RoomRow) => () => {
        console.log('[select room] ', room);

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

        console.log('[get userId] ', user?.id);
        console.log('[get friendId] ', friendId);

        if (!roomChat) {
            mutateAsync({
                friendId,
                friendName,
                user: user!,
            });
        }
    };

    useEffect(() => {
        if (lsRoomChat && lsRoomChat.length > 0 && !curUser) {
            setCurUser(lsRoomChat[0].member!);
            setCurMembers(lsRoomChat[0].members);
            setCurRoomId(lsRoomChat[0].id);
            setCurMemberInfo(lsRoomChat[0].members);
        }
    }, [lsRoomChat]);
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
            <div className="relative pt-2 flex flex-col gap-2 flex-1">
                {lsRoomChat?.map((room) => (
                    <ChatUserRow
                        key={room.id}
                        onClick={selectRoomChat(room as RoomRow)}
                        avatar={room.avatar ?? ''}
                        name={room.name ?? 'User name'}
                        lastMessage={room.lastMessage}
                        selected={room.member?.id === curUser?.id}
                    />
                ))}

                {isShowSearch && (
                    <div className="absolute inset-0  px-4 py-2">
                        <div className="w-full h-full bg-card flex flex-col gap-2">
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
