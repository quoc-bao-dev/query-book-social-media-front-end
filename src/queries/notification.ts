import axiosClient from '@/httpClient';
import { HttpResponse } from '@/types/common';
import { useQuery } from '@tanstack/react-query';

const getNotification = async () =>
  axiosClient.get<HttpResponse<any[]>>('/notify').then((res) => res.data.data);

export const useNotificationQuery = () => {
  return useQuery({
    queryKey: ['notification'],
    queryFn: getNotification,
  });
};
