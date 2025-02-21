import { UserProfileResponse } from './user';

export type RoomChatResponse = {
    _id: string;
    name: string;
    members: UserProfileResponse[];
    isGroup: boolean;
    groupAvatar: string;
    messages: Message[];
    lastMessage: LastMessage;
    createdAt: string;
    updatedAt: string;
};

export type Message = {
    _id: string;
    senderId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};

type LastMessage = {
    _id: string;
    senderId: string;
    content: string;
    createdAt: string;
}[];
