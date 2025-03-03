'use client';
import Avatar from '@/components/common/Avatar';
import Modal from '@/components/common/Modal';
import MediaIcon from '@/components/icons/MediaIcon';
import axiosClient from '@/httpClient';
import { useAuth } from '@/store/authSignal';
import { uploadImage } from '@/utils/uploadUtils';
import Image from 'next/image';
import { useState } from 'react';
import { signify } from 'react-signify';
import { CreateFeed } from '../schema/CreateFeedSchema';
import DeleteIcon from '@/components/icons/DeleteIcon';
import { Button } from '@/components/common/Button';
import LoadingIcon from '@/components/icons/LoadingIcon';
type CreateFeed = {
  isShow: boolean;
};

export const sModalCreateFeed = signify<CreateFeed>({
  isShow: false,
});

export const useModalCreateFeed = () => {
  return {
    open: () => sModalCreateFeed.set((n) => (n.value.isShow = true)),
    close: () => sModalCreateFeed.set((n) => (n.value.isShow = false)),
  };
};

const ModalCreateFeed = () => {
  const { user } = useAuth();
  const { isShow } = sModalCreateFeed.use();
  const { close } = useModalCreateFeed();
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files)); // Chuyển FileList thành mảng
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) {
      setError('no have image');
    }
    const file = files[0];

    setIsLoading(true);
    const media = await uploadImage(file);
    const content = 'no content';
    //fix type
    const payload = {
      content,
      media: {
        type: 'image',
        sourceType: 'file',
        fileName: media,
      },
      status: 'public',
    };

    // fecth data

    await //clear state
    setIsLoading(false);
    close();
    setFiles([]);
  };

  return (
    <Modal isOpen={isShow} onClose={close}>
      <div className='flex'>
        <form className='w-full bg-card rounded-lg' onSubmit={onSubmit}>
          <div className='py-4 text-xl'>
            <p className='text-center font-semibold'>Tạo tin của bạn</p>
          </div>
          <hr />
          <div className='flex items-center gap-3 mt-5 mx-auto px-5'>
            <Avatar
              src={user?.avatarUrl}
              fallBack={user?.fullName}
              className='w-[50px] h-[50px] rounded-[50%]'
            />

            <div className=''>
              <p className='font-bold'>{user?.fullName}</p>
              <div className='pt-2'>
                {/* <Controller
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
                /> */}
              </div>
            </div>
          </div>

          <div className='mt-5'>
            <div className='px-3 max-h-[375px] overflow-y-auto'>
              {/* <Controller
                control={control}
                name='content'
                render={({ field }) => (
                  <AutoResizeTextarea onchange={field.onChange} />
                )}
              /> */}

              {/* Render hình ảnh khi thêm từ input */}
              {!files.length && (
                <div className='flex py-8 gap-8 justify-center items-center'>
                  <input
                    onChange={handleFileChange}
                    type='file'
                    hidden
                    multiple
                    id='uploadFile'
                  />
                  <div className=''>
                    <label htmlFor='uploadFile'>
                      <MediaIcon className='size-20 text-primary-500' />
                    </label>
                  </div>
                </div>
              )}

              <div className='flex justify-center items-center'>
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
            {/* {errors.content && (
              <p className='text-error-500'>{errors.content.message}</p>
            )} */}
          </div>

          <Button
            disabled={isLoading}
            type='submit'
            className='w-[476px] bg-primary-500 border-[0.5px] h-[35px] text-white rounded-md flex items-center mx-4 justify-center mt-5 mb-4'
          >
            {isLoading ? (
              <div className='flex items-center'>
                {/* <Spinner /> */}
                <LoadingIcon />
                <span className='ml-2'>Loading...</span>
              </div>
            ) : (
              <p>Tạo</p>
            )}
          </Button>
        </form>
        {/* Nút Delete */}
        <div
          onClick={close}
          className='bg-neutral-200 flex items-center justify-center absolute top-1 right-1 w-[30px] h-[30px] rounded-full '
        >
          <DeleteIcon className='size-8' />
        </div>
      </div>
    </Modal>
  );
};

export default ModalCreateFeed;
