import axiosClient from '@/httpClient';
import { swal } from '@/utils/swal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


// Get comment
const getComment = async (postId: string) => axiosClient.get(`/comments/post/${postId}`);

export const useGetCommentQuery = (postId: string) => {
  return useQuery({
    queryFn: () => getComment(postId),
    queryKey: ['comment', postId],
  });
};

// Post comment
const postComment = async (postId: string, payload: any) =>
  axiosClient.post(`/posts/${postId}/comment`, payload);

export const useCommentMutation = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => postComment(postId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      swal.fire({
        icon: 'success',
        text: 'Bình luận thành công',
        confirmButtonColor: '#0abf7e',
        showConfirmButton: false,
        timer: 1500,
      })
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
      queryClient.invalidateQueries({ queryKey: ['comment'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      swal.fire({
        icon: 'success',
        text: 'Xóa bình luận thành công',
        confirmButtonColor: '#0abf7e',
        showConfirmButton: false,
        timer: 1500,
      })
    }
  });
};


// Reply comment 
const replyComment = async (commentId: string, payload: any) => {
  axiosClient.post(`/comments/${commentId}/reply`, payload);
  console.log('payload:', payload);
}

export const useReplyCommentMutation = (commentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => replyComment(commentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment'] });
    },
  })
};

