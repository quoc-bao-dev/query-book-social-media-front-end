import { CreatePostSchema } from '@/app/(main)/(home)/(feeds)/schema/CreatePostSchema';
import axiosClient from '@/httpClient';
import { HttpResponse } from '@/types/common';
import { PostResponse } from '@/types/post';
import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
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

// get post by user id
const getPostByUserId = (userId: string) =>
    axiosClient
        .get<HttpResponse<any[]>>(`posts/user/${userId}`)
        .then((data) => data.data.data);

export const usePostOfUserQuery = (userId: string) => {
    return useQuery({
        queryFn: () => getPostByUserId(userId),
        queryKey: ['post', userId],
    });
};

// create post
const postCreatePost = async (payload: {
    content: string;
    status: CreatePostSchema['status'];
    hashTags: string[];
    media: string[];
}) =>
    axiosClient.post('/posts', {
        content: payload.content,
        status: payload.status,
        hashTags: payload.hashTags,
        media: payload.media,
    });

export const useCreatePostMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postCreatePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });
};
