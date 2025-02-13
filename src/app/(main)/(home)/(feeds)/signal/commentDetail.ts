import { signify } from "react-signify";

type CommentDetail = {
    isOpen: boolean,
    listComments: any[],
    curPost: any
}


export const sCommentDetail = signify<CommentDetail>({
    isOpen: false,
    listComments: [],
    curPost: null
});

export const useCommentDetail = () => ({
    open: () => sCommentDetail.set((n) => (n.value.isOpen = true)),
    close: () => sCommentDetail.set((n) => (n.value.isOpen = false)),
    setListComments: (comments: any[]) => sCommentDetail.set((n) => (n.value.listComments = comments)),
    setCurPost: (post: any) => sCommentDetail.set((n) => (n.value.curPost = post))
})