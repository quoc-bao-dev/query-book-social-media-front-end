import { signify } from 'react-signify';
type ListImageDetailFeed = {
    listImages: string[];
    curIndex: number;
    isShow: boolean;
    auTh: string[];
};
export const sListImageDetailFeed = signify<ListImageDetailFeed>({
    listImages: [],
    curIndex: 0,
    isShow: false,
    auTh: [],
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
        setAuTh: (auTh: string[]) => {
            sListImageDetailFeed.set((n) => (n.value.auTh = auTh));
        },
    };
};