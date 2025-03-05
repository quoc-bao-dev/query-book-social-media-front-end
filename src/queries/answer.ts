import axiosClient from '@/httpClient';
import { HttpResponse } from '@/types/common';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type AnswerPayload = { content: string };

const getAnswerByQuestion = (questionId: string) =>
  axiosClient
    .get<HttpResponse<any[]>>(`/answers/${questionId}`)
    .then((respone) => respone.data.data);

export const useAnswerQuery = (questionId: string) => {
  return useQuery({
    queryKey: ['answers', questionId],
    queryFn: () => getAnswerByQuestion(questionId),
  });
};

const postAnswer = (questionId: string, payload: AnswerPayload) =>
  axiosClient.post('/answers', { questionId, ...payload });

export const useAnswerMutation = (questionId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AnswerPayload) => postAnswer(questionId, payload),
    onSuccess: () => {
      // update question list
      queryClient.invalidateQueries({ queryKey: ['answers', questionId] });
    },
  });
};
