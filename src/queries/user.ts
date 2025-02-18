import axiosClient from '@/httpClient';
import { authActions } from '@/store/authSignal';
import { HttpResponse } from '@/types/common';
import { UserProfileResponse, UserSuggestResponse } from '@/types/user';
import { swal } from '@/utils/swal';
import { useMutation, useQuery } from '@tanstack/react-query';

type UserSuggestParams = {
    limit?: number;
    page?: number;
    suggestMode?: 'follow_suggest' | 'friend_suggest';
};

const getMe = ()=> axiosClient.get<HttpResponse<UserProfileResponse>>('/users/me').then(res => res.data.data)

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


const patchUpdateUserProfile = (payload:any) =>  axiosClient.patch('/users/profile' , payload)

export const useUpdateUserProfileMutation = () => {
    return useMutation({
        mutationFn: patchUpdateUserProfile,
        onSuccess: async () => {

            const user  =  await getMe()
            authActions.setUser(user)
            swal.fire( {
                title: 'upload avatar success!',
                icon: 'success'
            })
        }
    })
}