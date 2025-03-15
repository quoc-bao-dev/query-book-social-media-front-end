import axiosClient from "@/httpClient";
import { HttpResponse } from "@/types/common";
import { WorkExperience } from "@/types/workexperience";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Lấy danh sách kinh nghiệm làm việc
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

// Tạo mới kinh nghiệm làm việc
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

// Xóa kinh nghiệm làm việc
const deleteWork = (id: string) => {
    return axiosClient.delete(`/work-experiences/${id}`);
};

export const useDeleteWorkMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteWork,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["work-experiences"] });
        },
    });
};

const updateWork = (payload: WorkExperience) => {
    return axiosClient.patch(`/work-experiences/${payload._id}`, payload);
};

export const useUpdateWorkMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateWork,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["work-experiences"] });
        },
    });
};
