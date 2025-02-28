import axiosClient from '@/httpClient';
import { HttpResponse } from '@/types/common';
import { Hosting } from '@/types/hosting';
import { swal } from '@/utils/swal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// get list hosting
const getHosting = () => axiosClient.get<HttpResponse<Hosting[]>>('/deploy');
export const useHostingQuery = () =>
  useQuery({
    queryKey: ['hostings'],
    queryFn: () => getHosting(),
  });

// create hosting
const postHosting = (subDomain: string) =>
  axiosClient.post('/deploy/create-hosting', {
    subDomain,
  });

export const useCreateHostingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subDomain: string) => postHosting(subDomain),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hostings'] });
      swal.fire({
        icon: 'success',
        title: 'Created',
        text: 'Hosting created successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
};

// upload hosting
const postUploadHosting = (subDomain: string, file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('subDomain', subDomain);

  return axiosClient.post('/deploy/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const useUploadHostingMutation = () => {
  return useMutation({
    mutationFn: (data: { subDomain: string; file: File }) =>
      postUploadHosting(data.subDomain, data.file),
    onSuccess: () => {
      swal.fire({
        icon: 'success',
        title: 'Uploaded',
        text: 'File uploaded successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
};

// delete hosting
const deleteHosting = (subDomain: string) =>
  axiosClient.delete(`/deploy/delete-hosting/${subDomain}`);

export const useDeleteHostingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (subDomain: string) => deleteHosting(subDomain),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hostings'] });
      swal.fire({
        icon: 'success',
        title: 'Deleted',
        text: 'Hosting deleted successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
};
