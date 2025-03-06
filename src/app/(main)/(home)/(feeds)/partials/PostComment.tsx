'use client';
import Avatar from '@/components/common/Avatar';
import DeleteIcon from '@/components/icons/DeleteIcon';
import LoadingIcon from '@/components/icons/LoadingIcon';
import MediaIcon from '@/components/icons/MediaIcon';
import SendIcon from '@/components/icons/SendIcon';
import { cn } from '@/lib/utils';
import { useCommentMutation } from '@/queries/comment';
import { useAuth } from '@/store/authSignal';
import { uploadImages } from '@/utils/uploadUtils';
import Image from 'next/image';
import { useRef, useState } from 'react';

const PostComment = ({ postId }: { postId: string }) => {
  const [images, setImages] = useState<File[]>([]);
  const [errorComment, setErrorComment] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.click();
    input.onchange = handleImageChange;
  };

  const { user } = useAuth();

  const handleComment = async () => {
    if (!inputRef.current?.value) {
      return;
    }

    setIsLoading(true);
    const payload = {
      content: inputRef.current?.value,
    };

    if (images.length > 0) {
      const media = (await uploadImages(images))?.files?.[0];

      if (media) {
        payload.media = {
          fileName: media.filename,
          type: 'image',
          sourceType: 'file',
        };
      }
    }

    await comment(payload);

    setIsLoading(false);
    setImages([]);

    if (inputRef.current) {
      inputRef.current.value = '';
    }

    setErrorComment('');
  };

  return (
    <>
      {/* Hiện images trong comment */}
      {images.map((image, index) => (
        <div key={index} className='relative flex pl-[52px] w-[250px]'>
          <Image
            src={URL.createObjectURL(image)}
            alt=''
            className='w-full h-auto rounded-lg'
            width={1000}
            height={1000}
          />
          <div
            className='absolute top-1 right-1 cursor-pointer p-[2px] rounded-full bg-gray-200/60 text-gray-700'
            onClick={handleRemoveImage(index)}
          >
            <DeleteIcon className='size-[18px]' />
          </div>
        </div>
      ))}

      <div className='flex py-1'>
        <div className='flex justify-center'>
          <Avatar
            src={user?.avatarUrl}
            className='w-[40px] h-[40px] rounded-[50%]'
            fallBack={user?.fullName ?? ''}
          />
        </div>
        <div className='ml-3 flex w-full gap-2 justify-center items-center'>
          <input
            ref={inputRef}
            readOnly={false}
            onChange={(e) => setErrorComment(e.target.value)}
            type='text'
            className='w-full h-[40px] border px-2 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500'
            placeholder='Write a comment'
          />
          <div className=''></div>

          <div onClick={handleUploadImage}>
            <MediaIcon className='size-6 fill-gray-700 hover:fill-primary-500 hover:duration-300 hover:scale-125' />
          </div>

          <div onClick={handleComment}>
            {isLoading ? (
              <div className='flex items-center'>
                {/* <Spinner /> */}
                <LoadingIcon size={20} color='#0abf7e' />
              </div>
            ) : (
              <SendIcon
                className={cn('fill-gray-700 size-6', {
                  'fill-primary-500 duration-500 size-8': errorComment,
                  'duration-500 size-6': !errorComment,
                })}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostComment;
