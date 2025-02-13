"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCommentMutation } from "@/queries/comment";
import { useAuth } from "@/store/authSignal";
import { getFirstCharacter } from "@/utils/nameUtilts";
import { uploadImages } from "@/utils/uploadUtils";
import { useRef, useState } from "react";
import Image from "next/image";
import SendIcon from "@/components/icons/SendIcon";
import MediaIcon from "@/components/icons/MediaIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";

const PostComment = ({ postId }: { postId: string }) => {
  const [images, setImages] = useState<File[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: comment } = useCommentMutation(postId);

  const handleImageChange = (event: any) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      setImages((pre) => [...pre, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => () => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleUploadImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.click();
    input.onchange = handleImageChange;
  };

  const { user } = useAuth();

  const handleComment = async () => {
    const payload = {
      content: inputRef.current?.value,
    };

    if (images.length > 0) {
      const media = (await uploadImages(images))?.files?.[0];

      if (media) {
        payload.media = {
          fileName: media.filename,
          type: "image",
          sourceType: "file",
        };
      }
    }
    await comment(payload);

    setImages([]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      {/* Hiện images trong comment */}
      {images.map((image, index) => (
        <div key={index} className="relative flex pl-[52px] w-[250px]">
          <Image
            src={URL.createObjectURL(image)}
            alt=""
            className="w-full h-auto rounded-lg"
            width={1000}
            height={1000}
          />
          <div
            className="absolute top-1 right-1 cursor-pointer p-[2px] rounded-full bg-gray-200/60 text-gray-700"
            onClick={handleRemoveImage(index)}
          >
            <DeleteIcon className="size-[18px]" />
          </div>
        </div>
      ))}

      <div className="flex py-1">
        <div className="flex justify-center">
          <Avatar>
            <AvatarImage src={user?.avatarUrl} />
            <AvatarFallback>
              {getFirstCharacter(user?.fullName ?? "")}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="ml-3 w-full flex gap-2 justify-center items-center">
          <input
            ref={inputRef}
            type="text"
            className="w-full h-[40px] border px-2 rounded-lg focus:border-info-500 focus:outline-none focus:ring-1 focus:ring-info-500"
            placeholder="Write a comment"
          />

          <div onClick={handleUploadImage} className="px-1">
            <MediaIcon className="fill-gray-700" />
          </div>
          <div onClick={handleComment}>
            <SendIcon className="fill-primary-500" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostComment;
