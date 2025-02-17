import axiosClient from '@/httpClient';
import { HttpResponse } from '@/types/common';
import { swal } from '@/utils/swal';
import { useMutation, useQuery } from '@tanstack/react-query';

const postCreateQuestion = (payload: any) =>
    axiosClient.post('/questions', payload);

export const useCreateQuestionMutation = () => {
    return useMutation({
        mutationFn: postCreateQuestion,
        onSuccess: () => {
            swal.fire({
                title: 'Create question success!',
                text: 'You have been  create question!',
            });
        },
    });
};

const getMyQuestion = () =>
    axiosClient
        .get<HttpResponse<any[]>>('/questions/my-question')
        .then((response) => response.data.data);

export const useGetMyQuestion = () => {
    return useQuery({
        queryKey: ['my-question'],
        queryFn: getMyQuestion,
    });
};
