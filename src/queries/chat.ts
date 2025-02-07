import { config } from '@/config';
import axiosClient from '@/httpClient';
import { Message, RoomChatResponse } from '@/types/chat';
import { UserProfileResponse } from '@/types/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const getRoomChatById = async (userId: string) =>
    axiosClient
        .get<RoomChatResponse[]>(`/room-chat/user/${userId}`, {
            baseURL: config.MESSAGE_SERVER_URL,
        })
        .then((response) => response.data);

export const useRoomsChatQuery = (userId: string) => {
    return useQuery({
        queryKey: ['roomChat'],
        queryFn: () => getRoomChatById(userId),
    });
};

const postCreateRoomChat = async (
    friendId: string,
    friendName: string,
    user: UserProfileResponse
) =>
    axiosClient
        .post(
            `/room-chat/create`,
            {
                name: `${friendName} ${user?.fullName}`,
                members: [user?.id, friendId],
                isGroup: false,
                groupAvatar: '',
            },
            {
                baseURL: config.MESSAGE_SERVER_URL,
            }
        )
        .then((response) => response.data);

export const useCreateRoomChatMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            friendId,
            friendName,
            user,
        }: {
            friendId: string;
            friendName: string;
            user: UserProfileResponse;
        }) => postCreateRoomChat(friendId, friendName, user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roomChat'] });
        },
    });
};

//message
const getMessage = async (
    roomId: string,
    limit: number = 100,
    page: number = 1
) =>
    axiosClient
        .get<Message[]>(
            `/message/roomId/${roomId}/?limit=${limit}&page=${page}`,
            {
                baseURL: config.MESSAGE_SERVER_URL,
            }
        )
        .then((response) => response.data.reverse());

export const useMessageQuery = (
    roomId: string,
    limit: number = 100,
    page: number = 1
) => {
    return useQuery({
        queryKey: ['message', roomId],
        queryFn: () => getMessage(roomId, limit, page),
    });
};
