import axiosClient from '@/httpClient';
import { HttpResponse } from '@/types/common';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type AnswerPayload = { content: string };
type AnswerType = {
  _id: string;
  questionId: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
  };
  content: string;
  images?: string[];
  code?: {
    fileType: string;
    code: string;
  };
  createdAt: string;
  votes?: { user: {_id: string} , voteType: 'up' | 'down'}[]; 
};



const postSaveQuestion = (questionId: string) =>
  axiosClient
    .get<HttpResponse<AnswerType[]>>(`/answers/${questionId}`)
    .then((respone) => respone.data.data);

export const useAnswerQuery = (questionId: string) => {
  return useQuery({
    queryKey: ['answers', questionId],
    queryFn: () => postSaveQuestion(questionId),
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
//vote
const voteAnswer = (answerId : string, type: 'up' | 'down') =>
  axiosClient.post(`/answers/${answerId}/vote`, {vote: type})

export const useVoteAnswerMutation = ( questionId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ answerId , type }: { answerId : string; type: 'up' | 'down' }) =>
      voteAnswer(answerId , type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['answers', questionId ] });
    },
  });
};