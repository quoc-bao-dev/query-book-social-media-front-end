import axiosClient from "@/httpClient";
import { HttpResponse } from "@/types/common";
import { useQuery } from "@tanstack/react-query";


const getStory = () => axiosClient.get<HttpResponse<any[]>>('/stories');

export const useStoryQuery = () => {
    return useQuery({
        queryFn: getStory,
        queryKey: ['stories'],
    })
};