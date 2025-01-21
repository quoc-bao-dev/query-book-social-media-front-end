import axiosClient from '@/httpClient';
import { useInfiniteQuery } from '@tanstack/react-query';

const getPost = ({ pageParam = 1 }: { pageParam: number }) =>
    axiosClient.get('/posts', {
        params: {
            page: pageParam,
            limit: 10,
        },
    });
export const usePostQuery = () => {
    return useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: getPost,
        getNextPageParam: (lastPage: any) => {
            // Lấy thông tin phân trang từ lastPage
            const { hasNextPage, page } = lastPage.data.pagination;

            // Nếu có trang tiếp theo, trả về `currentPage + 1`, nếu không thì trả về `undefined`.
            return hasNextPage ? page + 1 : undefined;
        },
        initialPageParam: 1,
    });
};
