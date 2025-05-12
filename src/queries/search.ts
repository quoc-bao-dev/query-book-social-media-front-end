import axiosClient from '@/httpClient';
import { HttpResponse } from '@/types/common';
import { UserSearchResponse } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

const getSearchUser = (keyword: string) =>
  axiosClient.get<HttpResponse<UserSearchResponse[]>>('users/search', {
    params: {
      q: keyword,
      limit: 20,
    },
  });
export const useSearchUserQuery = (search: string) => {
  return useQuery({
    queryFn: () => getSearchUser(search),
    enabled: !!search,
    queryKey: ['searchUser', search],
    staleTime: 60 * 5 * 1000,
  });
};
