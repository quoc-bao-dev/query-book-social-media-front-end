import { signify } from 'react-signify';
type ListImageDetailFeed = {
    listImages: string[];
    curIndex: number;
    isShow: boolean;
};
export const sListImageDetailFeed = signify<ListImageDetailFeed>({
    listImages: [],
    curIndex: 0,
    isShow: false,
});

export const useListImageDetailFeed = () => {
    return {
        setImages: (images: string[]) => {
            sListImageDetailFeed.set((n) => (n.value.listImages = images));
        },
        setCurIndex: (index: number) => {
            sListImageDetailFeed.set((n) => (n.value.curIndex = index));
        },
        showModal: () => {
            sListImageDetailFeed.set((n) => (n.value.isShow = true));
        },
        closeModal: () => {
            sListImageDetailFeed.set((n) => (n.value.isShow = false));
        },
    };
};