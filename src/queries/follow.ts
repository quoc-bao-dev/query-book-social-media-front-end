import { sCurUserProfileSignal } from '@/app/(main)/(profile)/signal/curUserProfileSignal';
import axiosClient from '@/httpClient';
import { HttpResponse } from '@/types/common';
import { UserProfileResponse } from '@/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const postFollow = (id: string) => axiosClient.post(`/follow/${id}`);
export const useFollowMutation = (
  { mode, userId }: { mode?: 'default' | 'userPage'; userId?: string } = {
    mode: 'default',
  },
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => postFollow(userId),
    onSuccess: async () => {
      if (mode === 'userPage') {
        queryClient.invalidateQueries({ queryKey: ['follow_suggest'] });

        const user = (
          await axiosClient.get<HttpResponse<UserProfileResponse>>(
            `/users/profile/${userId}`,
          )
        ).data.data;
        sCurUserProfileSignal.set({ user });
      }
    },
  });
};
