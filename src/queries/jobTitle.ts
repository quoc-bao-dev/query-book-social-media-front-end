import axiosClient from '@/httpClient';
import { HttpResponse } from '@/types/common';
import { JobTitleResponse } from '@/types/jobTitle';
import { useQuery } from '@tanstack/react-query';

const getJobTitle = () =>
  axiosClient.get<HttpResponse<JobTitleResponse[]>>('/job-titles');

export const useJobTitleQuery = () =>
  useQuery({
    queryKey: ['jobTitles'],
    queryFn: getJobTitle,
  });
