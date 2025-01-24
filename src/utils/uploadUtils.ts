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

export const uploadImages = async (files: File[]) => {
    if (files.length === 0) {
        return;
    }

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    try {
        const response = await axiosClient.post(
            `${config.IMAGE_SERVER_URL}/uploads`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-api-key': config.IMAGE_API_KEY,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.log(error);
    }
};
