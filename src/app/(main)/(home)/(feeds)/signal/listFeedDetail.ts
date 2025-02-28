import { signify } from 'react-signify';

type ListFeedDetail = {
  listImages: string[];
  curIndex: number;
  isShow: boolean;
};

export const sListFeedDetail = signify<ListFeedDetail>({
  listImages: [],
  curIndex: 0,
  isShow: false,
});

export const useListFeedDetail = () => {
  return {
    setImages: (images: string[]) => {
      sListFeedDetail.set((n) => (n.value.listImages = images));
    },
    setCurIndex: (index: number) => {
      sListFeedDetail.set((n) => (n.value.curIndex = index));
    },
    showModal: () => {
      sListFeedDetail.set((n) => (n.value.isShow = true));
    },
    closeModal: () => {
      sListFeedDetail.set((n) => (n.value.isShow = false));
    },
  };
};
