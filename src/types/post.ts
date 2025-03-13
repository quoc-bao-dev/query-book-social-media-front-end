import { Media } from './common';

export type PostResponse = {
  id: string;
  author: Author;
  content: string;
  likesCount: number;
  likes: Like[];
  commentsCount: number;
  comments: Comment[];
  hashTags: string[];
  media: string[];
  mediaUrls: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type StoryResponse = {
  id: string;
  media: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
};

type Like = {
  id: string;
  name: string;
  avatar: string;
  avatarUrl: string;
  handle: string;
};
type Author = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  avatarUrl?: string;
  fullName: string;
};

export type Replies = {
  id: string;
  author: Author;
  content: string;
  isReply: boolean
  media?: Media;
  mediaUrl: string;
}

export type Comment = {
  id: string;
  author: Author;
  username: string;
  fullName: string;
  avatarUrl?: string;
  content: string;
  likes: any[];
  replies: Replies[];
  media?: Media;
  mediaUrl?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};



export type Feed = {
  id: string;
  image: string;
  name: string;
};

export type PostsQueryData = {
  pages: {
    data: {
      data: PostResponse[]; // Mảng bài viết
    };
  }[];
  pageParams: number[]; // Các tham số trang (có thể là số trang hoặc thông tin khác)
};
