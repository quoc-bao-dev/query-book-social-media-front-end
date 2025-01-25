import axiosClient from '@/httpClient';
import { HttpResponse } from '@/types/common';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// get list friend
const getFriends = () => axiosClient.get('/friends');

export const useFriendsQuery = () =>
    useQuery({
        queryKey: ['friends'],
        queryFn: getFriends,
    });

// send friend request
const postSendRequest = async (userId: string) =>
    axiosClient.post(`/friends/send-request`, {
        targetId: userId,
    });

export const useSendRequestMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId: string) => postSendRequest(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friend_suggest'] });
        },
    });
};
