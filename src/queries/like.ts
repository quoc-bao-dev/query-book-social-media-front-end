import axiosClient from "@/httpClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const postLike = (postId: string) => axiosClient.post(`/posts/${postId}/like`);

export const useLikeMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (postId: string) => postLike(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });
};

