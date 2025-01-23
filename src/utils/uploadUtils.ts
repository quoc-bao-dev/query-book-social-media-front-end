import { config } from '@/config';
import axiosClient from '@/httpClient';
import axios from 'axios';

export const uploadImage = async (file: File) => {
    const formData = new FormData();

    formData.append('file', file);

    try {
        const response = await axiosClient.post<{ fileName: string }>(
            `${config.IMAGE_SERVER_URL}/upload`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-api-key': config.IMAGE_API_KEY,
                },
            }
        );

        return response.data.fileName;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error);
            return error;
        }
    }
};
