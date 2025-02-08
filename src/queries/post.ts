import axiosClient from '@/httpClient';
import { HttpResponse } from '@/types/common';
import { PostResponse } from '@/types/post';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

const getPost = ({ pageParam = 1 }: { pageParam: number }) =>
    axiosClient.get<HttpResponse<PostResponse>>('/posts', {
        params: {
            page: pageParam,
            limit: 10,
        },
    });


export const usePostQuery = () => {
    return useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: getPost,
        getNextPageParam: (lastPage: AxiosResponse) => {
            // Lấy thông tin phân trang từ lastPage
            const { hasNextPage, page } = lastPage.data.pagination;

            // Nếu có trang tiếp theo, trả về `currentPage + 1`, nếu không thì trả về `undefined`.
            return hasNextPage ? page + 1 : undefined;
        },
        initialPageParam: 1,
    });
};
