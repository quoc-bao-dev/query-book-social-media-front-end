"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { config } from "@/config";
import axiosClient from "@/httpClient";
import { useCreatePostMutation } from "@/queries/post";
import { useAuth } from "@/store/authSignal";
import { extractHashtags } from "@/utils/hashtagUtils";
import { getFirstCharacter } from "@/utils/nameUtilts";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { signify } from "react-signify";
import { createPost, CreatePostSchema } from "../schema/CreatePostSchema";
import AutoResizeTextarea from "./AutoResizeTextarea";
import { useQueryClient } from "@tanstack/react-query";

type ModalCreatePostSignal = {
  isOpen: boolean;
};

export const sModalCreatePost = signify<ModalCreatePostSignal>({
  isOpen: false,
});

export const useModalCreatePost = sModalCreatePost.use;

const ssOpenFormModal = sModalCreatePost.slice((s) => s.isOpen);

const ModalCreatePost = () => {
  const [files, setFiles] = useState<File[]>([]);

  const queryClient = useQueryClient();

  const { user } = useAuth();

  const name = getFirstCharacter(user?.fullName || "");

  const isShow = ssOpenFormModal.use();

  const { mutateAsync } = useCreatePostMutation();

  const onModalChange = (isOpen: boolean) => {
    sModalCreatePost.set((n) => (n.value.isOpen = isOpen));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files)); // Chuyển FileList thành mảng
    }
  };

  const uploadFile = async () => {
    if (files.length === 0) {
      return;
    }

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await axiosClient.post(
        `${config.IMAGE_SERVER_URL}/uploads`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-api-key": config.IMAGE_API_KEY,
          },
        }
      );

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  //handle form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePostSchema>({
    resolver: zodResolver(createPost),
  });

  const onSubmit = async (data: CreatePostSchema) => {
    const hashTags = extractHashtags(data.content);

    const mediasRes = await uploadFile();

    const medias =
      mediasRes?.files &&
      mediasRes.files.map((media: { filename: string }) => ({
        fileName: media.filename,
        type: "image",
        sourceType: "file",
      }));

    const payload = {
      content: data.content,
      status: data.status,
      hashTags,
      media: medias,
    };

    await mutateAsync(payload);

    queryClient.invalidateQueries({ queryKey: ["post", user?.id] });
    sModalCreatePost.set((n) => (n.value.isOpen = false));
    reset();
    setFiles([]);
  };

  return (
    <Dialog open={isShow} onOpenChange={onModalChange}>
      <DialogContent className="p-0 w-[500px]">
        <form
          className="w-full bg-card rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogTitle>
            <div className="py-4 text-xl">
              <p className="text-center font-semibold">Tạo bài viết</p>
            </div>
          </DialogTitle>

          <hr />

          <div className="flex items-center gap-3 mt-5 mx-auto px-5">
            <Avatar>
              <AvatarImage src="/images/git.png" />
              <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
            <div className="">
              <p className="font-bold">{user?.fullName}</p>
              <div className="pt-2">
                <Controller
                  control={control}
                  name={"status"}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px] h-6">
                        <SelectValue placeholder="Select post status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Post Status</SelectLabel>
                          <SelectItem value="public" defaultChecked>
                            Public
                          </SelectItem>
                          <SelectItem value="friend">Friends</SelectItem>

                          <SelectItem value="private">Private</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="px-3 max-h-[375px] overflow-y-auto">
              <Controller
                control={control}
                name="content"
                render={({ field }) => (
                  <AutoResizeTextarea onchange={field.onChange} />
                )}
              />
              <div className="mt-5">
                {files.map((file, index) => (
                  <div
                    className="w-[200px] h-auto flex items-center justify-center"
                    key={index}
                  >
                    <Image
                      className="w-full object-cover"
                      src={URL.createObjectURL(file)}
                      alt=""
                      width={500}
                      height={500}
                    />
                  </div>
                ))}
              </div>
            </div>
            {errors.content && (
              <p className="text-error-500">{errors.content.message}</p>
            )}
          </div>

          <div className="w-[476px] border-[0.5px] border-gray-300 h-[50px] mx-auto rounded-md px-2 py-2 grid grid-cols-2 mt-5">
            <div className=" text-center pt-1">
              <p>Thêm vào bài viết của bạn</p>
            </div>
            <div className="flex gap-8 justify-center items-center">
              <input
                onChange={handleFileChange}
                type="file"
                hidden
                multiple
                id="uploadFile"
              />
              <div className="">
                <label htmlFor="uploadFile">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-primary-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
              </div>
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="16"
                  className="text-primary-500"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill="currentColor"
                    d="m630.6 364.9l-90.3-90.2c-12-12-28.3-18.7-45.3-18.7h-79.3c-17.7 0-32 14.3-32 32v79.2c0 17 6.7 33.2 18.7 45.2l90.3 90.2c12.5 12.5 32.8 12.5 45.3 0l92.5-92.5c12.6-12.5 12.6-32.7.1-45.2m-182.8-21c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24c0 13.2-10.7 24-24 24m-223.8-88c70.7 0 128-57.3 128-128C352 57.3 294.7 0 224 0S96 57.3 96 128c0 70.6 57.3 127.9 128 127.9m127.8 111.2V294c-12.2-3.6-24.9-6.2-38.2-6.2h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 287.9 0 348.1 0 422.3v41.6c0 26.5 21.5 48 48 48h352c15.5 0 29.1-7.5 37.9-18.9l-58-58c-18.1-18.1-28.1-42.2-28.1-67.9"
                  />
                </svg>
              </div>
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="text-warning-600"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M8.5 8c.83 0 1.5.67 1.5 1.5S9.33 11 8.5 11S7 10.33 7 9.5S7.67 8 8.5 8m8.25 6.75c-.95 1.64-2.72 2.75-4.75 2.75s-3.8-1.11-4.75-2.75c-.19-.33.06-.75.44-.75h8.62c.39 0 .63.42.44.75M15.5 11c-.83 0-1.5-.67-1.5-1.5S14.67 8 15.5 8s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5"
                  />
                </svg>
              </div>
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  className="text-gray-800"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    d="M3 9.5a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3"
                  />
                </svg>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-[476px] bg-primary-500 border-[0.5px] h-[35px] mx-auto rounded-md flex items-center justify-center mt-5 mb-4"
          >
            <div className=" text-center text-white">Đăng</div>
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCreatePost;
