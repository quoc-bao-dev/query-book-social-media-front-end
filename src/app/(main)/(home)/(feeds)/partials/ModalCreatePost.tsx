'use client';

import EllipsisHorizontalIcon from '@/components/icons/EllipsisHorizontalIcon';
import FaceIcon from '@/components/icons/FaceIcon';
import MediaIcon from '@/components/icons/MediaIcon';
import TagFriendIcon from '@/components/icons/TagFriendIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { config } from '@/config';
import axiosClient from '@/httpClient';
import { useCreatePostMutation } from '@/queries/post';
import { useAuth } from '@/store/authSignal';
import { extractHashtags } from '@/utils/hashtagUtils';
import { getFirstCharacter } from '@/utils/nameUtilts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { signify } from 'react-signify';
import { createPost, CreatePostSchema } from '../schema/CreatePostSchema';
import AutoResizeTextarea from './AutoResizeTextarea';

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

  const name = getFirstCharacter(user?.fullName || '');

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
      formData.append('files', files[i]);
    }

    try {
      const response = await axiosClient.post(
        `${config.IMAGE_SERVER_URL}/uploads`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-api-key': config.IMAGE_API_KEY,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  //handle form
  const {
    // Bắt lỗi form
    control,
    // Bắt sự kiện của form
    handleSubmit,
    // clear đi form
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
        type: 'image',
        sourceType: 'file',
      }));

    const payload = {
      content: data.content,
      status: data.status,
      hashTags,
      media: medias,
    };

    await mutateAsync(payload);

    queryClient.invalidateQueries({ queryKey: ['post', user?.id] });
    sModalCreatePost.set((n) => (n.value.isOpen = false));
    reset();
    setFiles([]);
  };

  return (
    <Dialog open={isShow} onOpenChange={onModalChange}>
      <DialogContent className='p-0 w-[500px]'>
        <form
          className='w-full bg-card rounded-lg'
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogTitle>
            <div className='py-4 text-xl'>
              <p className='text-center font-semibold'>Tạo bài viết</p>
            </div>
          </DialogTitle>

          <hr />

          <div className='flex items-center gap-3 mt-5 mx-auto px-5'>
            <Avatar>
              <AvatarImage src='/images/git.png' />
              <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
            <div className=''>
              <p className='font-bold'>{user?.fullName}</p>
              <div className='pt-2'>
                <Controller
                  control={control}
                  name={'status'}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className='w-[180px] h-6'>
                        <SelectValue placeholder='Select post status' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Post Status</SelectLabel>
                          <SelectItem value='public' defaultChecked>
                            Public
                          </SelectItem>
                          <SelectItem value='friend'>Friends</SelectItem>
                          <SelectItem value='private'>Private</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='mt-5'>
            <div className='px-3 max-h-[375px] overflow-y-auto'>
              <Controller
                control={control}
                name='content'
                render={({ field }) => (
                  <AutoResizeTextarea onchange={field.onChange} />
                )}
              />

              <div className='mt-5'>
                {files.map((file, index) => (
                  <div
                    className='w-[200px] h-auto flex items-center justify-center'
                    key={index}
                  >
                    <Image
                      className='w-full object-cover'
                      src={URL.createObjectURL(file)}
                      alt=''
                      width={500}
                      height={500}
                    />
                  </div>
                ))}
              </div>
            </div>
            {errors.content && (
              <p className='text-error-500'>{errors.content.message}</p>
            )}
          </div>

          <div className='w-[476px] border-[0.5px] border-gray-300 h-[50px] mx-auto rounded-md px-2 py-2 grid grid-cols-2 mt-5'>
            <div className=' text-center pt-1'>
              <p>Thêm vào bài viết của bạn</p>
            </div>
            <div className='flex gap-8 justify-center items-center'>
              <input
                onChange={handleFileChange}
                type='file'
                hidden
                multiple
                id='uploadFile'
              />
              <div className=''>
                <label htmlFor='uploadFile'>
                  <MediaIcon className='size-6 text-primary-500' />
                </label>
              </div>
              <TagFriendIcon />
              <FaceIcon />
              <EllipsisHorizontalIcon />
            </div>
          </div>

          <button
            type='submit'
            className='w-[476px] bg-primary-500 border-[0.5px] h-[35px] mx-auto rounded-md flex items-center justify-center mt-5 mb-4'
          >
            <div className=' text-center text-white'>Đăng</div>
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCreatePost;
