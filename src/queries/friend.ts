import axiosClient from '@/httpClient';
import { HttpResponse } from '@/types/common';
import { UserRequestResponse, UserResponse } from '@/types/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

const getSendRequests = () =>
  axiosClient
    .get<HttpResponse<UserResponse[]>>('/friends/send-requests')
    .then((data) => data.data.data);

export const useSendRequestsQuery = () => {
  return useQuery({
    queryKey: ['send_requests'],
    queryFn: getSendRequests,
  });
};

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
      queryClient.invalidateQueries({ queryKey: ['send_requests'] });
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

// remove request
const postRemoveRequest = async (userId: string) =>
  axiosClient.delete(`/friends/cancel-request/${userId}`);

export const useRemoveRequestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => postRemoveRequest(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['send_requests'] });
    },
  });
};
