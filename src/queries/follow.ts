import { sCurUserProfileSignal } from '@/app/(main)/(profile)/signal/curUserProfileSignal';
import axiosClient from '@/httpClient';
import { HttpResponse } from '@/types/common';
import { UserProfileResponse, UserResponse } from '@/types/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

/**
 * Gửi yêu cầu theo dõi người dùng
 * @param id ID của người dùng cần theo dõi
 */

const getFollow = async () => {
  const res = await axiosClient.get<HttpResponse<UserResponse[]>>('/follow');
  return res.data.data;
};

export const useFollowsQuery = () =>
  useQuery<UserResponse[]>({
    queryKey: ['follow'],
    queryFn: getFollow,
  });

const postFollow = (id: string) => axiosClient.post(`/follow/${id}`);

/**
 * Hook sử dụng để theo dõi một người dùng
 */
export const useFollowMutation = (
  { mode, userId }: { mode?: 'default' | 'userPage'; userId?: string } = {
    mode: 'default',
  },
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => postFollow(userId),
    onSuccess: async () => {
      if (mode === 'userPage' && userId) {
        // Làm mới danh sách gợi ý follow
        queryClient.invalidateQueries({ queryKey: ['follow_suggest'] });

        // Cập nhật lại thông tin hồ sơ người dùng
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

/**
 * Gửi yêu cầu hủy theo dõi người dùng
 * @param userId ID của người dùng cần hủy theo dõi
 */
const deleteFollow = (userId: string) => axiosClient.delete(`/follow/${userId}`);

/**
 */
export const useUnfollowMutation = (
  { mode, userId }: { mode?: 'default' | 'userPage'; userId?: string } = {
    mode: 'default',
  },
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteFollow(userId),
    onSuccess: async () => {
      // Làm mới danh sách người dùng được gợi ý
      queryClient.invalidateQueries({ queryKey: ['follow_suggest'] });

      // Làm mới danh sách những người đang theo dõi
      queryClient.invalidateQueries({ queryKey: ['followed_users'] });

      // Nếu ở trang cá nhân của user, cập nhật lại dữ liệu profile
      if (mode === 'userPage' && userId) {
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



