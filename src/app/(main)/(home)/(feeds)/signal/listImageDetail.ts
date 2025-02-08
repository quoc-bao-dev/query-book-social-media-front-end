import { signify } from "react-signify";
type ListImageDetail = {
    listImages: string[]
    isShow: boolean
}
export const sListImageDetail = signify<ListImageDetail>({
    listImages: [],
    isShow: false
})

export const useListImageDetail = () => {
    return {
        setImages: (images: string[]) => {
            sListImageDetail.set((n) => (n.value.listImages = images))
        },
        showModal: () => {
            sListImageDetail.set((n) => (n.value.isShow = true))
        },
        closeModal: () => {
            sListImageDetail.set((n) => (n.value.isShow = false))
        }
    }
}