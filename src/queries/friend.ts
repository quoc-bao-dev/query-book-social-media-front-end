import axiosClient from '@/httpClient';
import { HttpResponse } from '@/types/common';
import { UserRequestResponse, UserResponse } from '@/types/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

//FIXME: fix type
// get list friend
const getFriends = () =>
  axiosClient.get<HttpResponse<UserResponse[]>>('/friends');

export const useFriendsQuery = () =>
  useQuery({
    queryKey: ['friends'],
    queryFn: getFriends,
  });

// get list friend request
const getFriendRequest = () =>
  axiosClient
    .get<HttpResponse<UserRequestResponse[]>>('/friends/requests')
    .then((data) => {
      return data.data.data;
    });

export const useFriendRequestQuery = () =>
  useQuery({
    queryKey: ['friend_requests'],
    queryFn: getFriendRequest,
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

// accept friend request
const postAcceptRequest = async (userId: string) =>
  axiosClient.post(`/friends/accept-request`, {
    senderId: userId,
  });

export const useAcceptRequestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => postAcceptRequest(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friend_requests'] });
    },
  });
};
