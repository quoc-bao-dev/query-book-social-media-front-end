'use client';

import Avatar from '@/components/common/Avatar';
import { Button } from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import DeleteIcon from '@/components/icons/DeleteIcon';
import EllipsisHorizontalIcon from '@/components/icons/EllipsisHorizontalIcon';
import FaceIcon from '@/components/icons/FaceIcon';
import LoadingIcon from '@/components/icons/LoadingIcon';
import MediaIcon from '@/components/icons/MediaIcon';
import TagFriendIcon from '@/components/icons/TagFriendIcon';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreatePostMutation, useUpdatePostMutation } from '@/queries/post';
import { useAuth } from '@/store/authSignal';
import { MediaUpload } from '@/types/common';
import { PostResponse } from '@/types/post';
import { extractHashtags } from '@/utils/hashtagUtils';
import { media } from '@/utils/mediaUtils';
import { getFirstCharacter } from '@/utils/nameUtilts';
import { uploadImages } from '@/utils/uploadUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { signify } from 'react-signify';
import { createPost, CreatePostSchema } from '../schema/CreatePostSchema';
import AutoResizeTextarea from './AutoResizeTextarea';
import CreatePostImage from './CreatePostImage';

type ModalCreatePostSignal = {
  isOpen: boolean;
  curPost: Pick<
    PostResponse,
    'id' | 'author' | 'content' | 'hashTags' | 'mediaUrls'
  > & { media: MediaUpload[] };
};

export const sModalCreatePost = signify<ModalCreatePostSignal>({
  isOpen: false,
  curPost: {
    id: '',
    author: {
      id: '',
      name: '',
      email: '',
      avatar: '',
      avatarUrl: '',
      fullName: '',
    },
    content: '',
    mediaUrls: [],
    hashTags: [],
    media: [],
  },
});

export const useModalCreatePost = () => ({
  setEditCurPost: (post: PostResponse) =>
    sModalCreatePost.set((n) => (n.value.curPost = post)),
});

const ModalCreatePost = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [imageReview, setImageReview] = useState<string[]>([]);
  const [imageUpload, setImageUpload] = useState<MediaUpload[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, curPost } = sModalCreatePost.use();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const name = getFirstCharacter(user?.fullName || '');
  const { mutateAsync } = useCreatePostMutation();
  const { mutateAsync: updatePost } = useUpdatePostMutation(curPost.id);

  const onModalChange = (isOpen: boolean) => {
    sModalCreatePost.set((n) => (n.value.isOpen = isOpen));
  };

  // Delete image
  const onDeleteItem = (indexToRemove: number) => {
    if (indexToRemove >= curPost.media.length) {
      indexToRemove = indexToRemove - curPost.media.length;
      setFiles((prevFiles) =>
        // Lọc qua Image nào khác indexToRemove thì giữ lại không thì xóa đi
        prevFiles.filter((_, index) => index !== indexToRemove),
      );
    }

    if (indexToRemove < curPost.media.length) {
      const tempRemove = curPost.media[indexToRemove];
      setImageUpload((prev) => [...prev, { ...tempRemove, action: 'remove' }]);
      sModalCreatePost.set((n) => {
        n.value.curPost.media = n.value.curPost.media.filter(
          (_, index) => index !== indexToRemove,
        );
      });
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...Array.from(event.target.files!),
      ]); // Giữ lại ảnh cũ và thêm ảnh mới
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
    // Set loading cho người dùng chờ
    setIsLoading(true);

    // Gửi file image từ Ram to Server
    const mediasRes = files.length > 0 ? await uploadImages(files) : [];

    const medias =
      (mediasRes?.files &&
        mediasRes.files.map((media: { filename: string }) => ({
          action: 'add',
          fileName: media.filename,
          type: 'image',
          sourceType: 'file',
        }))) ??
      [];

    // Gọp image của Files và curPost.media
    const lsMedias = [...imageUpload, ...medias!];

    const payload = {
      content: data.content,
      status: data.status,
      hashTags,
      media: lsMedias,
    };

    if (!curPost.id) {
      await mutateAsync(payload);
    } else {
      await updatePost(payload);
    }

    // set loading
    setIsLoading(false);
    queryClient.invalidateQueries({ queryKey: ['post', user?.id] });
    sModalCreatePost.set((n) => (n.value.isOpen = false));
    reset();
    setFiles([]);
  };

  const closeAllFiles = () => {
    setFiles([]);
    sModalCreatePost.set((n) => (n.value.isOpen = false));
    reset();
    sModalCreatePost.reset();
  };

  useEffect(() => {
    if (!curPost.content) return;
    const curContent = curPost.content;
    reset({ content: curContent });
  }, [curPost]);

  useEffect(() => {
    const images = files.map((file) => URL.createObjectURL(file));

    // Lọc những ảnh không phải remove thì lấy lại
    const imagesInCurPost = curPost.media.map((img) => media.toImage(img)!);

    // Gọp 2 mảng thành mảng mới để show ra giao diện
    setImageReview([...imagesInCurPost, ...images]);
  }, [files, curPost]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        closeAllFiles();
      }}
    >
      <div className='w-[500px] relative'>
        <form
          className='w-full bg-card rounded-lg'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className='py-4 text-xl'>
              {curPost.id && (
                <p className='text-center font-semibold'>Chỉnh sửa bài viết</p>
              )}
              {!curPost.id && (
                <p className='text-center font-semibold'>Tạo bài viết</p>
              )}
            </div>
          </div>

          <hr />

          <div className='flex items-center gap-3 mt-5 mx-auto px-5'>
            <Avatar src={user?.avatarUrl} fallBack={name} />
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
                        <SelectValue placeholder='Public' />
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
                  <AutoResizeTextarea
                    defaultValue={curPost.content}
                    onchange={field.onChange}
                  />
                )}
              />

              {/* Báo lỗi cho người dùng */}
              {errors.root && (
                <p className='text-error-500'>something went wrong</p>
              )}
              <div className='text-center'>
                {errors.content && (
                  <p className='text-error-500'>{errors.content.message}</p>
                )}
              </div>

              {/* Show image */}
              <div className='mt-5 flex gap-2 justify-center'>
                <CreatePostImage
                  onDelete={onDeleteItem}
                  lsImage={imageReview}
                />
              </div>
            </div>
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
                  <MediaIcon className='size-6 text-primary-500 hover:text-primary-600' />
                </label>
              </div>
              <TagFriendIcon />
              <FaceIcon />
              <EllipsisHorizontalIcon />
            </div>
          </div>
          <div className='flex justify-center py-4'>
            <Button
              disabled={isLoading}
              type='submit'
              className='w-[476px] bg-primary-500 text-white text-center border-[0.5px] h-[35px] rounded-md'
            >
              {isLoading ? (
                <div className='flex items-center'>
                  {/* <Spinner /> */}
                  <LoadingIcon />
                  <span className='ml-2'>Loading...</span>
                </div>
              ) : curPost.id ? (
                'Lưu'
              ) : (
                'Đăng'
              )}
            </Button>
          </div>
        </form>

        <div
          onClick={() => {
            closeAllFiles();
            onModalChange(false);
          }}
        >
          <DeleteIcon className='absolute top-1 right-1 size-6 text-primary-500' />
        </div>
      </div>
    </Modal>
  );
};

export default ModalCreatePost;
