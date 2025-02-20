import axiosClient from "@/httpClient";
import { HttpResponse } from "@/types/common";
import { StoryResponse } from "@/types/post";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";


const getStory = () => axiosClient.get<HttpResponse<any[]>>('/stories');

export const useStoryQuery = () => {
    return useQuery({
        queryFn: getStory,
        queryKey: ['stories'],
    })
};