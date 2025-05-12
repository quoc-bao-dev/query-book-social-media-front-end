import axiosClient from '@/httpClient';
import { HttpResponse } from '@/types/common';
import { CrateStoryPayload } from '@/types/story';
import { swal } from '@/utils/swal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const getStory = () => axiosClient.get<HttpResponse<any[]>>('/stories');

export const useStoryQuery = () => {
  return useQuery({
    queryFn: getStory,
    queryKey: ['stories'],
  });
};

// Create a new story
const storyCreateStory = (payload: CrateStoryPayload) => axiosClient.post('/stories', payload);

export const useCreateStoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storyCreateStory,
    onSuccess: () => {
      //hành động fetch lại data
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      //Thông báo upload thanh cong
      swal.fire({
        text: 'Cập nhật thành công!',
        icon: 'success',
        confirmButtonColor: '#0abf7e',
        timer: 2000,
      });
    },
  })
}
