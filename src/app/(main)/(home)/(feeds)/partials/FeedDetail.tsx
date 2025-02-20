"use client";

import Modal from "@/components/common/Modal";
import { ScrollBar } from "@/components/ui/scroll-area";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { DeleteIcon } from "lucide-react";
import Image from "next/image";
import { sListFeedDetail, useListFeedDetail } from "../signal/listFeedDetail";

const FeedDetail = () => {
  const { isShow, curIndex, listImages } = sListFeedDetail.use();
  const { closeModal, setCurIndex } = useListFeedDetail();

  // const nextImage = () => {
  //   setCurIndex((curIndex + 1) % listImages.length);
  // };

  // const prevImage = () => {
  //   if (curIndex <= 0) {
  //     setCurIndex(listImages.length - 1);
  //     return;
  //   }
  //   setCurIndex(Math.abs(curIndex - 1) % listImages.length);
  // };

  return (
    <Modal isOpen={isShow} onClose={closeModal}>
      <div className="flex z-20">
        <div className="w-[700px] rounded-lg bg-gray-200">
          <div className="relative">
            <div
              onClick={close}
              className="bg-neutral-200 flex items-center justify-center absolute top-1 right-1 w-[30px] h-[30px] rounded-full "
            >
              <DeleteIcon className="size-8" />
            </div>
          </div>
          <div className="max-h-[600px] h-[600px]">
            <ScrollArea className="w-full h-full rounded-xl">
              {listImages[curIndex] && (
                <Image
                  src={listImages[curIndex]}
                  alt=""
                  className="w-full h-full object-contain"
                  width={1000}
                  height={1000}
                />
              )}
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </div>
          {/* <div className="px-4 py-2">
            <PostComment postId={} />
          </div> */}
        </div>
      </div>
    </Modal>
  );
};

export default FeedDetail;
