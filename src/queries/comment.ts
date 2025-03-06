import axiosClient from '@/httpClient';
import { swal } from '@/utils/swal';
import { useMutation, useQueryClient } from '@tanstack/react-query';



// Post comment
const postComment = async (postId: string, payload: any) =>
  axiosClient.post(`/posts/${postId}/comment`, payload);

export const useCommentMutation = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => postComment(postId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};


// Delete Comment
const deleteComment = async (commentId: string) => axiosClient.delete(`/comments/${commentId}`);

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      swal.fire({
        icon: 'success',
        title: 'Deleted',
        text: 'Comment deleted successfully',
        // confirmButtonColor: '#',
        showConfirmButton: false,
        timer: 1500,
      })
    }
  });
};
