"use client";

import { Button } from "@/components/common/Button";
import MediaIcon from "@/components/icons/MediaIcon";
import VideoIcon from "@/components/icons/VideoIcon";
import { sModalCreatePost } from "./ModalCreatePost";

const PostCreate = () => {
  const showModal = () => {
    sModalCreatePost.set((n) => (n.value.isOpen = true));
  };

  return (
    <div className="py-3">
      <div
        onClick={showModal}
        className="w-full gap-5 border rounded-xl p-4 bg-card"
      >
        <div
          onClick={showModal}
          className="w-full h-[100px] border border-gray-300 rounded-xl p-2 text-gray-600"
        >
          Bạn đang nghĩ gì?
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="flex gap-4">
            <div className="flex gap-2">
              <div className="">
                <MediaIcon />
              </div>
              <p>Image</p>
            </div>
            <div className="flex gap-2">
              <div className="">
                <VideoIcon />
              </div>
              <p>Video</p>
            </div>
          </div>
          <div className="">
            <Button className="w-24" onClick={showModal}>
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCreate;
