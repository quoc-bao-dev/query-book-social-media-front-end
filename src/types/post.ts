export type PostResponse = {
    id: string;
    author: Author;
    content: string;
    likesCount: number;
    likes: any[];
    commentsCount: number;
    comments: any[];
    hashTags: string[];
    media: any[];
    status: string;
    createdAt: string;
    updatedAt: string;
};

type Author = {
    name: string;
    email: string;
    avatar?: string;
};

export type PostsQueryData = {
    pages: {
        data: {
            data: PostResponse[]; // Mảng bài viết
        };
    }[];
    pageParams: number[]; // Các tham số trang (có thể là số trang hoặc thông tin khác)
};
