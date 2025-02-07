import { UserProfileResponse } from './user';

export type RoomChatResponse = {
    _id: string;
    name: string;
    members: UserProfileResponse[];
    isGroup: boolean;
    groupAvatar: string;
    messages: Message[];
};


export type Message = {
  _id: string;
  senderId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}