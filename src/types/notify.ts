import { UserResponse } from './user';

export type NotifyType = FriendRequestNotify | RelationNotify;

type FriendRequestNotify = UserResponse & {
    type: 'friend_request';
};

interface RelationNotify {
    _id: string;
    type: 'relationship';
    relationType: 'accept_request' | 'follow';
    senderId: string;
    targetId: string;
    recipients: Recipient[];
    message: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface Recipient {
    userId: string;
    isRead: boolean;
    _id: string;
}
