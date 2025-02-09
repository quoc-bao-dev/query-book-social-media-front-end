export type PostResponse = {
    id: string;
    author: Author;
    content: string;
    likesCount: number;
    likes: Like[];
    commentsCount: number;
    comments: any[];
    hashTags: string[];
    media: any[];
    mediaUrls: string[];
    status: string;
    createdAt: string;
    updatedAt: string;
};

type Like = {
    id: string;
    name: string;
    avatar: string;
    avatarUrl: string;
    handle: string;
}
type Author = {
    name: string;
    email: string;
    avatar?: string;
    avatarUrl?: string;
    fullName: string;
};

export type PostsQueryData = {
    pages: {
        data: {
            data: PostResponse[]; // Mảng bài viết
        };
    }[];
    pageParams: number[]; // Các tham số trang (có thể là số trang hoặc thông tin khác)
};
