import axiosClient from '@/httpClient';
import { swal } from '@/utils/swal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


// Get comment
const getComment = async (postId: string) => await axiosClient.get(`/comments/post/${postId}`);


export const useGetCommentQuery = (postId: string) => {
  return useQuery({
    queryKey: ['comment', postId],
    queryFn: () => getComment(postId),
  });
};

// Post comment
const postComment = async (postId: string, payload: any) => await
  axiosClient.post(`/posts/${postId}/comment`, payload);
export const useCommentMutation = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => postComment(postId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment', postId] });
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


// Reply comment 
const replyComment = async (commentId: string, payload: any) => {
  await axiosClient.post(`/comments/${commentId}/reply`, payload);
}

export const useReplyCommentMutation = (postId: string, commentId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => replyComment(commentId, payload),
    onSuccess: () => {
      swal.fire({
        icon: 'success',
        text: 'Trả lời bình luận thành công',
        confirmButtonColor: '#0abf7e',
        showConfirmButton: false,
        timer: 1500,
      });
      queryClient.invalidateQueries({ queryKey: ['comment', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  })
};


// Delete Comment
const deleteComment = async (commentId: string) => axiosClient.delete(`/comments/${commentId}`);

export const useDeleteCommentMutation = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['comment', postId] });
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

