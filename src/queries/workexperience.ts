import axiosClient from "@/httpClient";
import { HttpResponse } from "@/types/common";
import { WorkExperience } from "@/types/workexperience";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getWork = () => {
    return axiosClient
        .get<HttpResponse<WorkExperience[]>>("/work-experiences")
        .then((response) => response.data.data);
};

export const useGetWork = () => {
    return useQuery({
        queryKey: ["work-experiences"],
        queryFn: getWork,
    });
};

const postCreateWork = (payload: WorkExperience) => {
    return axiosClient.post("/work-experiences", payload);
};

export const useCreateWorkMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postCreateWork,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["work-experiences"] });
        },
    });
};
