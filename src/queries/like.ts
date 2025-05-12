import axiosClient from '@/httpClient';
import { PostResponse } from '@/types/post';
import { swal } from '@/utils/swal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { disableInstantTransitions } from 'framer-motion';

const postLike = (postId: string) =>
  axiosClient.post(`/posts/${postId}/like`).then((res) => res.data.data);

export const useLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => postLike(postId),
    onSuccess: (updatedPost, postId) => {
      queryClient.setQueryData(['posts'], (oldPosts: any) => {
        if (!oldPosts) return oldPosts;
        return {
          ...oldPosts,
          pages: oldPosts.pages.map((page: any) => ({
            ...page,
            data: {
              ...page.data,
              data: page.data.data.map((post: PostResponse) =>
                post.id === postId ? updatedPost : post,
              ),
            },
          })),
        };
      });
    },
  });
};
