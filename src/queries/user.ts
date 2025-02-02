import axiosClient from '@/httpClient';
import { HttpResponse } from '@/types/common';
import { UserSuggestResponse } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

type UserSuggestParams = {
    limit?: number;
    page?: number;
    suggestMode?: 'follow_suggest' | 'friend_suggest';
};
const getUserSuggestion = ({
    limit = 5,
    page = 1,
    suggestMode = 'friend_suggest',
}: UserSuggestParams) =>
    axiosClient.get<HttpResponse<UserSuggestResponse[]>>(
        `/users/suggest/?filterMode=${suggestMode}`,
        {
            params: {
                limit,
                page,
            },
        }
    );

export const useUserSuggestionQuery = ({
    limit = 3,
    page = 1,
    suggestMode,
}: UserSuggestParams) =>
    useQuery({
        queryKey: [suggestMode],
        queryFn: () => getUserSuggestion({ limit, page, suggestMode }),
    });
