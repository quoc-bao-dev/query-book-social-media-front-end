import axiosClient from '@/httpClient';
import { swal } from '@/utils/swal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type CreateStoryPayload = {
  reason: string;
  content: string;
};

// Get Report
const reportGet = () => axiosClient.get('/report-reason/post');

export const useGetReportQuery = () =>
  useQuery({ queryKey: ['report'], queryFn: reportGet });

// Create Report
const reportCreate = (postId: string, payload: CreateStoryPayload) =>
  axiosClient.post(`/report/post/${postId}`, payload);

export const useCreateReportMutation = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateStoryPayload) => reportCreate(postId, payload),
    onSuccess: () => {
      //hành động fetch lại data
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      //Thông báo upload thanh cong
      swal.fire({
        text: 'Báo cáo thành công!',
        icon: 'success',
        confirmButtonColor: '#0abf7e',
        showConfirmButton: false,
        timer: 2000,
      });
    },
  });
};
// Get Account Report Reason
const reportGetAccount = () => axiosClient.get('/report-reason/account');

export const useGetAccountReportQuery = () =>
  useQuery({
    queryKey: ['accountReport'],
    queryFn: reportGetAccount,
    select: (data) => data.data.data, // Chỉ lấy phần dữ liệu quan trọng từ response
  });

// Create Report
const reportCreateAccoutAccount = (userId: string, payload: CreateStoryPayload) =>
  axiosClient.post(`/report/account/${userId}`, payload);

export const useCreateAccountReportMutation = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateStoryPayload) => reportCreateAccoutAccount(userId, payload),
    onSuccess: () => {
      //hành động fetch lại data
      queryClient.invalidateQueries({ queryKey: ['accountReport'] });
      //Thông báo upload thanh cong
      swal.fire({
        text: 'Báo cáo thành công!',
        icon: 'success',
        confirmButtonColor: '#0abf7e',
        showConfirmButton: false,
        timer: 2000,
      });
    },
  });
};