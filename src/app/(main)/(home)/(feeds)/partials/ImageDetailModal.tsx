"use client";

import Modal from "@/components/common/Modal";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  sListImageDetail,
  useListImageDetail,
} from "../signal/listImageDetail";
import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";

const ImageDetailModal = () => {
  const { isShow, listImages, curIndex } = sListImageDetail.use();
  const { closeModal, setCurIndex } = useListImageDetail();

  const nextImage = () => {
    setCurIndex((curIndex + 1) % listImages.length);
  };

  const prevImage = () => {
    if (curIndex <= 0) {
      setCurIndex(listImages.length - 1);
      return;
    }
    setCurIndex(Math.abs(curIndex - 1) % listImages.length);
  };

  return (
    <Modal isOpen={isShow} onClose={closeModal}>
      <div className="flex">
        <div className="bg-card w-[1000px]">
          <div className="flex w-full relative justify-center items-center h-[580px] pt-3">
            <div className="absolute left-5" onClick={prevImage}>
              <ChevronLeftIcon className="size-12 " />
            </div>
            <div className="h-full w-auto">
              <Image
                src={listImages[curIndex]}
                alt=""
                className="w-full h-full object-contain"
                width={1000}
                height={1000}
              />
            </div>

            <div className="absolute right-5" onClick={nextImage}>
              <ChevronRightIcon className="size-12" />
            </div>
          </div>

          {/* List Images */}
          <div className=" max-w-[600px] mx-auto overflow-x-auto py-2">
            <div className="flex justify-center items-end gap-2 h-[100px]">
              {listImages.map((image, index) => (
                <Image
                  onClick={() => setCurIndex(index)}
                  key={index}
                  src={image}
                  alt=""
                  className={cn("w-auto h-full object-cover ", {
                    "border-4 border-info-500": curIndex === index,
                  })}
                  width={1000}
                  height={1000}
                />
              ))}
            </div>
          </div>
        </div>

        <div onClick={closeModal} className="w-8 h-8 bg-gray-600">
          <DeleteIcon className="size-8" />
        </div>
      </div>
    </Modal>
  );
};
export default ImageDetailModal;
