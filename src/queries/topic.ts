import axiosClient from "@/httpClient"
import { HttpResponse } from "@/types/common";
import { TopicResponse } from "@/types/topic";
import { useQuery } from "@tanstack/react-query";

export const getAllTopic = () => {
    return axiosClient.get<HttpResponse<TopicResponse[]>>('/topics').then((response) => response.data.data)
}

export const useGetAllTopic = () => {
    return useQuery({
      queryKey: ['my-topic'],
      queryFn: getAllTopic,
    });
  };

