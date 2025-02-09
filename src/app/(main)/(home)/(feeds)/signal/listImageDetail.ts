import { signify } from "react-signify";
type ListImageDetail = {
    listImages: string[]
    curIndex: number
    isShow: boolean
}
export const sListImageDetail = signify<ListImageDetail>({
    listImages: [],
    curIndex: 0,
    isShow: false
})

export const useListImageDetail = () => {
    return {
        setImages: (images: string[]) => {
            sListImageDetail.set((n) => (n.value.listImages = images))
        },
        setCurIndex: (index: number) => {
            sListImageDetail.set((n) => (n.value.curIndex = index))
        },
        showModal: () => {
            sListImageDetail.set((n) => (n.value.isShow = true))
        },
        closeModal: () => {
            sListImageDetail.set((n) => (n.value.isShow = false))
        }
    }
}