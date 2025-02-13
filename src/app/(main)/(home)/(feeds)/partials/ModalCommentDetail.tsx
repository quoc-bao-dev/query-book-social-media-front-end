"use client";

import Modal from "@/components/common/Modal";
import { sCommentDetail, useCommentDetail } from "../signal/commentDetail";
import Post from "./Post";

const ModalCommentDetail = () => {
  const { isOpen, curPost } = sCommentDetail.use();

  console.log("ccccc", curPost);

  const { close } = useCommentDetail();

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <div className="w-[700px] h-[700px] rounded-lg bg-card">
        <div className="w-full h-12 flex items-center justify-center font-semibold text-xl">
          <p>Bài viết của {curPost?.author.fullName}</p>
        </div>
        <div className="overflow-y-auto max-h-[600px]">
          <Post post={curPost} />
        </div>
      </div>
    </Modal>
  );
};
export default ModalCommentDetail;
