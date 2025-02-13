import { PostResponse } from "@/types/post";
import { signify } from "react-signify";

type CommentDetail = {
    isOpen: boolean,
    listComments: any[],
    curPost: Pick<
        PostResponse,
        | "id"
        | "author"
        | "content"
        | "hashTags"
        | "mediaUrls"
        | "createdAt"
        | "likesCount"
        | "likes"
        | "comments"
        | "commentsCount">
}


export const sCommentDetail = signify<CommentDetail>({
    isOpen: false,
    listComments: [],
    curPost: {
        id: "",
        author: {
            name: "",
            email: "",
            fullName: ""
        },
        content: "",
        hashTags: [],
        mediaUrls: [],
        createdAt: "",
        likesCount: 0,
        likes: [],
        comments: [],
        commentsCount: 0,
    },
});

export const useCommentDetail = () => ({
    open: () => sCommentDetail.set((n) => (n.value.isOpen = true)),
    close: () => sCommentDetail.set((n) => (n.value.isOpen = false)),
    setListComments: (comments: any[]) => sCommentDetail.set((n) => (n.value.listComments = comments)),
    setCurPost: (post: any) => sCommentDetail.set((n) => (n.value.curPost = post))
})