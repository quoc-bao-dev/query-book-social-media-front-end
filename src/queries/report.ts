import axiosClient from '@/httpClient';
import { useQuery } from '@tanstack/react-query';

const getReportReasons = async () => {
    const response = await axiosClient.get<{ success: boolean; data: any[] }>(
        '/report-reason/account'
    );
    return response.data.data;
};

export const useReportReasonQuery = () => {
    return useQuery({
        queryKey: ['report-reasons'],
        queryFn: getReportReasons,
        staleTime: 30 * 1000, // Dữ liệu tươi trong 30 giây
        retry: 2, // Thử lại 2 lần nếu lỗi
        select: (data) =>
            data.map(({ id, reasonCode, content }) => ({
                id,
                reasonCode,
                content,
            })),

    });
};
const fetchReportReasons = async (userId: string) => {
    const response = await axiosClient.get<{ success: boolean; data: any[] }>(
        `/report/account/${userId}`
    );
    return response.data.data;
};

export const useFetchReportReasons = (userId: string) => {
    return useQuery({
        queryKey: ['report-reasons', userId],
        queryFn: () => fetchReportReasons(userId),
        enabled: !!userId,
        staleTime: 30 * 1000,
        retry: 2,
        select: (data) =>
            data.map(({ id, reasonCode, content }) => ({
                id,
                reasonCode,
                content,
            })),
    });
};