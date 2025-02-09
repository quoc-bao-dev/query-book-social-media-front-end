'use client'

import Modal from "@/components/common/Modal"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"
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
                <div className="flex justify-center items-center h-[600px]">
                    <div className="p-5" >
                        <svg onClick={prevImage} xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 32 32"><path fill="#18b500" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m-6 20H8V10h2Zm14-1a1 1 0 0 1-1.486.874l-9-5a1 1 0 0 1 0-1.748l9-5A1 1 0 0 1 24 11Z" /><path fill="none" d="M23 22a1 1 0 0 1-.486-.126l-9-5a1 1 0 0 1 0-1.748l9-5A1 1 0 0 1 24 11v10a1 1 0 0 1-1 1m-13 0H8V10h2z" /></svg>
                    </div>
                    <Image src={listImages[curIndex]} alt="" className="w-full h-full object-contain" width={1000} height={1000} />
                    <div className="p-5">
                        <svg onClick={nextImage} xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 15 15"><path fill="#18b500" fill-rule="evenodd" d="M0 7.5a7.5 7.5 0 1 1 15 0a7.5 7.5 0 0 1-15 0M10 5h1v5h-1zm-5.252.066A.5.5 0 0 0 4 5.5v4a.5.5 0 0 0 .748.434l3.5-2a.5.5 0 0 0 0-.868z" clip-rule="evenodd" /></svg>
                    </div>
                </div>
                <div className="flex justify-center items-end mt-3 gap-4">
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