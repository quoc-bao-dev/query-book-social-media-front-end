'use client';
import Avatar from '@/components/common/Avatar';
import { Button } from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import DeleteIcon from '@/components/icons/DeleteIcon';
import LoadingIcon from '@/components/icons/LoadingIcon';
import MediaIcon from '@/components/icons/MediaIcon';
import { useCreateStoryMutation } from '@/queries/story';
import { useAuth } from '@/store/authSignal';
import { CrateStoryPayload } from '@/types/story';
import { uploadImage } from '@/utils/uploadUtils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { signify } from 'react-signify';
import { CreateFeed } from '../schema/CreateFeedSchema';
import { cn } from '@/lib/utils';

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
  const { mutateAsync } = useCreateStoryMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files)); // Chuyển FileList thành mảng
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const file = files[0];
    // Set loading cho người dùng chờ
    setIsLoading(true);
    const media = await uploadImage(file);
    const content = 'no content';
    //fix type
    const payload: CrateStoryPayload = {
      content,
      media: {
        type: 'image',
        sourceType: 'file',
        fileName: media as string,
      },
      status: 'public',
    };
    // fecth data
    await mutateAsync(payload);
    //clear state
    setIsLoading(false);
    close();
    setFiles([]);
  };

  useEffect(() => {
    if (files.length === 0) {
      setError('Hãy chọn ảnh');
    }

    if (files.length >= 2) {
      setError('Bạn chỉ được phép chọn một hình ảnh');
    }
  }, [files]);

  // Xóa ảnh theo từng index
  const closeFile = (indexToRemove: number) => {
    setFiles((prevFiles) =>
      // Lọc qua Image nào khác indexToRemove thì giữ lại không thì xóa đi
      prevFiles.filter((_, index) => index !== indexToRemove),
    );
  };

  const closeFileAll = () => {
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
                <div className='text-center py-8 gap-8'>
                  <input
                    onChange={handleFileChange}
                    type='file'
                    hidden
                    multiple
                    id='uploadFile'
                  />
                  <div className='flex justify-center items-center'>
                    <label htmlFor='uploadFile'>
                      <MediaIcon className='size-20 text-primary-500 hover:text-primary-600' />
                    </label>
                  </div>
                  <p>{error}</p>
                </div>
              )}

              <div className='flex justify-center items-center'>
                <div className=''>
                  {files.length && files.length >= 2 ? (
                    <div className='py-8 gap-8 text-center text-error-500'>
                      <input
                        onChange={handleFileChange}
                        type='file'
                        hidden
                        multiple
                        id='uploadFile'
                      />
                      <div className='flex justify-center'>
                        <label htmlFor='uploadFile'>
                          <MediaIcon className='size-20 text-primary-500 hover:text-primary-600' />
                        </label>
                      </div>
                      <p>{error}</p>
                    </div>
                  ) : (
                    files.map((file, index) => (
                      <div
                        className='relative w-[200px] h-auto flex justify-center'
                        key={index}
                      >
                        <Image
                          className='w-full object-cover'
                          src={URL.createObjectURL(file)}
                          alt=''
                          width={500}
                          height={500}
                        />
                        <div
                          onClick={() => closeFile(index)}
                          className='bg-gray-100 absolute top-1 right-1 rounded-[50%]'
                        >
                          <DeleteIcon className='size-6 text-primary-500' />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          <Button
            disabled={isLoading}
            type='submit'
            className={cn(
              'w-[476px] bg-primary-500 border-[0.5px] h-[35px] text-white rounded-md flex items-center mx-4 justify-center mt-5 mb-4',
              {
                'pointer-events-none': files.length >= 2 || files.length === 0,
              },
            )}
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
          onClick={() => {
            closeFileAll();
            close();
          }}
          className='bg-gray-300 flex items-center justify-center absolute top-1 right-1 w-6 h-6 rounded-full '
        >
          <DeleteIcon className='size-6' />
        </div>
      </div>
    </Modal>
  );
};

export default ModalCreateFeed;
