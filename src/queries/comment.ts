import axiosClient from "@/httpClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const postComment = async (postId: string, payload: any) => axiosClient.post(`/posts/${postId}/comment`, payload);

export const useCommentMutation = (postId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: any) => postComment(postId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    })
}