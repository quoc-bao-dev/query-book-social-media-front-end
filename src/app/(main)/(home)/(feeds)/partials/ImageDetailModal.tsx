'use client'

import Modal from "@/components/common/Modal"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { sListImageDetail, useListImageDetail } from "../signal/listImageDetail"




const ImageDetailModal = () => {
    const { isShow, listImages, curIndex } = sListImageDetail.use()
    const { closeModal, setCurIndex } = useListImageDetail()

    const nextImage = () => {
        setCurIndex((curIndex + 1) % listImages.length)
    }

    const prevImage = () => {
        if (curIndex <= 0) {
            setCurIndex(listImages.length - 1)
            return
        }
        setCurIndex(Math.abs((curIndex - 1)) % listImages.length)
    }


    return (
        <Modal isOpen={isShow} onClose={closeModal}>
            <div className="w-[1000px] bg-card">
                <div className="flex justify-center items-center h-[580px] pt-5">
                    <div className="p-5" onClick={prevImage}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <div className="h-full w-auto">
                        <Image src={listImages[curIndex]} alt="" className="w-full h-full object-contain" width={1000} height={1000} />
                    </div>

                    <div className="p-5" onClick={nextImage}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div className="flex justify-center items-end mt-3 gap-4 max-w-[600px] mx-auto overflow-x-auto">
                    {listImages.map((image, index) => (
                        <Image onClick={() => setCurIndex(index)} key={index} src={image} alt="" className={cn("w-[100px] h-[100px]", {
                            "border-4 border-info-500": curIndex === index
                        })} width={1000} height={1000} />
                    ))},
                </div>
            </div>
        </Modal>
    )
}
export default ImageDetailModal