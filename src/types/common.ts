import { AxiosResponse } from 'axios';

export type HttpResponse<T = unknown> = {
    status: number;
    message: string;
    data: T;
};

export type AxiosClientRes<T = unknown> = HttpResponse<T>;
