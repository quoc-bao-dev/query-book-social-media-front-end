import { useAuth } from '@/store/authSignal';
import { RoomChatResponse } from '@/types/chat';
import { UserProfileResponse } from '@/types/user';
import { signify } from 'react-signify';

export type ChatSignal = {
    curUser: UserProfileResponse | null;
    curMembers: UserProfileResponse[];
    curMemberInfo: { [key: string]: UserProfileResponse };
    curRoomId: string;
};
export const sChat = signify<ChatSignal>({
    curUser: null,
    curMembers: [],
    curMemberInfo: {},
    curRoomId: '',
});

export const useChatSignal = () => {
    const { user } = useAuth();
    return {
        setCurUser: (user: UserProfileResponse) => {
            sChat.set((n) => (n.value.curUser = user));
        },
        setCurMembers: (members: UserProfileResponse[]) => {
            sChat.set((n) => (n.value.curMembers = members));
        },
        setCurMemberInfo: (members: UserProfileResponse[]) => {
            const memberInfo: { [key: string]: UserProfileResponse } = {};
            members.forEach((member) => {
                memberInfo[member.id] = member;
            });
            sChat.set((n) => (n.value.curMemberInfo = memberInfo));
        },
        setCurRoomId: (id: string) => {
            sChat.set((n) => (n.value.curRoomId = id));
        },

        setCurRoom: (room: RoomChatResponse) => {
            const membersInfo: { [key: string]: UserProfileResponse } = {};
            room.members.forEach((member) => {
                membersInfo[member.id] = member;
            });
            sChat.set({
                curRoomId: room._id,
                curMembers: room.members,
                curUser: room.members.find((m) => m.id !== user?.id)!,
                curMemberInfo: membersInfo,
            });
        },
    };
};
