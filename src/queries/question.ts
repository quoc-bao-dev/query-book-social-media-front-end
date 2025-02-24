import axiosClient from '@/httpClient';
import { HttpResponse, HttpResponseWithPagination } from '@/types/common';
import { QuestionResponse } from '@/types/question';
import { SaveQuestionResponse } from '@/types/saveQuestion';
import { swal } from '@/utils/swal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const  getAllQuestions = (limit: number, page: number, search:string) => axiosClient.get<HttpResponseWithPagination<QuestionResponse[]>>(`/questions/?limit=${limit}&page=${page}${search && `&s=${search}`}`).then((response) => response.data)

export const useQuestionQuery  =  ({limit=10,page=1,search}:{limit:number; page:number, search: string}) => {
    return useQuery ( {
        queryKey: ['questions', {limit: limit, page: page, search: search}],
        queryFn: () => getAllQuestions(limit,page,search),
    })
}
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
        .get<HttpResponse<QuestionResponse[]>>('/questions/my-question')
        .then((response) => response.data.data);

export const useGetMyQuestion = () => {
    return useQuery({
        queryKey: ['my-question'],
        queryFn: getMyQuestion,
    });
};


const getMySaveQuestion = () =>axiosClient.get<HttpResponse<SaveQuestionResponse[]>>('/questions/save/').then((response) =>response.data.data) 

export const useGetMySaveQuestionQuery = () => {
    return useQuery({
        queryKey: ['my-save-question'],
        queryFn: getMySaveQuestion,
    });
}


const postSaveQuestion = (questionId: string) => axiosClient.post(`/questions/save` ,{questionId});

export const useSaveQuestionMutation =  () => {
    const queryClient  = useQueryClient()
    return useMutation({
            // update query
        mutationFn: postSaveQuestion,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-save-question'] })
        },
    })
}

