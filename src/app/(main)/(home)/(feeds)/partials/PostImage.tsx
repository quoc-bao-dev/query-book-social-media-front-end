"use client"

import Image from 'next/image'
import { useListImageDetail } from '../signal/listImageDetail'
type Props = {
    lsImage: string[]
}
const PostImage = ({ lsImage }: Props) => {

    const { showModal, setImages } = useListImageDetail()

    const showDetail = () => {
        setImages(lsImage)
        showModal()
    }

    if (lsImage.length === 0) {
        return null;
    }

    if (lsImage.length === 1) {
        return (
            <div>
                <div className="absolute bg-gray-200 inset-0 overflow-hidden rounded-md">
                </div>
                <div className="relative z-40">
                    {lsImage.map((mediaUrl, index) => (
                        <Image
                            onClick={showDetail}
                            key={index}
                            src={`${mediaUrl}`}
                            className="rounded-md text-center max-h-[600px] object-contain"
                            alt=""
                            width={1000}
                            height={1000}
                        />
                    ))}
                </div>
            </div>
        )
    }

    if (lsImage.length === 2) {
        return (
            <div>
                <div className="absolute bg-gray-200 inset-0 overflow-hidden rounded-md">
                </div>
                <div className="relative z-40">
                    <div className="grid grid-cols-2 gap-2 p-2 items-center">
                        <Image src={lsImage[0]} width={1000} height={1000} alt="Hình ảnh phòng" className="w-full rounded-lg shadow" />
                        <Image src={lsImage[1]} alt="Khu bếp" className="w-full rounded-lg shadow" width={1000}
                            height={0} />
                    </div>
                </div>
            </div>
        )
    }

    if (lsImage.length === 3) {
        return (
            <div>
                <div className="absolute bg-gray-200 inset-0 overflow-hidden rounded-md">
                </div>
                <div className="relative z-40">
                    <div className="grid grid-cols-3 gap-2 p-2 items-end">
                        <Image onClick={showDetail} src={lsImage[0]} width={1000} height={1000} alt="Hình ảnh phòng" className="w-full rounded-lg shadow mb-4" />
                        <Image onClick={showDetail} src={lsImage[1]} alt="Khu bếp" className="w-full rounded-lg shadow" width={1000}
                            height={0} />
                        <Image onClick={showDetail} src={lsImage[2]} alt="Nhà vệ sinh" className="w-full rounded-lg shadow mb-4" width={1000}
                            height={0} />
                    </div>
                </div>
            </div>
        )
    }

    if (lsImage.length === 4) {
        return (
            <div>
                <div className="absolute bg-gray-200 inset-0 overflow-hidden rounded-md">
                </div>
                <div className="relative z-40">
                    <div className="grid grid-cols-2 gap-2 p-2">
                        <Image onClick={showDetail} src={lsImage[0]} width={1000} height={1000} alt="Hình ảnh phòng" className="w-full rounded-lg shadow" />
                        <Image onClick={showDetail} src={lsImage[1]} alt="Khu bếp" className="w-full rounded-lg shadow" width={1000}
                            height={0} />
                        <Image onClick={showDetail} src={lsImage[2]} alt="Nhà vệ sinh" className="w-full rounded-lg shadow" width={1000}
                            height={0} />
                        <Image onClick={showDetail} src={lsImage[3]} alt="Bồn cầu" className="w-full rounded-lg shadow" width={1000}
                            height={0} />
                    </div>

                </div>
            </div>
        )
    }

    if (lsImage.length >= 5) {
        return (
            <div>5 image</div>
        )
    }

    return (
        <div>PostImage</div>
    )
}

export default PostImage