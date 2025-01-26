import axiosClient from '@/httpClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const postFollow = (id: string) => axiosClient.post(`/follow/${id}`);
export const useFollowMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId: string) => postFollow(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['follow_suggest'] });
        },
    });
};
