export type HttpResponse<T = unknown> = {
    status: number;
    message: string;
    data: T;
};

export type AxiosClientRes<T = unknown> = HttpResponse<T>;

export type Media = {
    sourceType: 'file' | 'url';
    type: 'image' | 'video';
    file?: string;
    fileName?: string;
    url?: string;
};
