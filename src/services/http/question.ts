import { config } from '@/config';
import httpClient from '@/httpClient/httpClient';
import { HttpResponse } from '@/types/common';
import { QuestionResponse } from '@/types/question';

export const getQuestionById = (id: string) =>
  httpClient
    .get<HttpResponse<QuestionResponse>>(`${config.BASE_URL}/questions/${id}`)
    .then((response) => response.data);
