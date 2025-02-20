export type HttpResponse<T = unknown> = {
    status: number;
    message: string;
    data: T;
};

export type HttpResponseWithPagination<T = unknown> = HttpResponse<T> & {
    pagination: {
        page: number;
        limit: number;
        totalPage: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        total: number;
    }
}

export type AxiosClientRes<T = unknown> = HttpResponse<T>;

export type Media = {
    sourceType: 'file' | 'url';
    type: 'image' | 'video';
    file?: string;
    fileName?: string;
    url?: string;
};
