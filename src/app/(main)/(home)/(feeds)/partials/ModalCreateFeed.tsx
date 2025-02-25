'use client';
import Modal from '@/components/common/Modal';
import MediaIcon from '@/components/icons/MediaIcon';
import { useAuth } from '@/store/authSignal';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { DialogTitle } from '@radix-ui/react-dialog';
import { DeleteIcon } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { signify } from 'react-signify';

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

  return (
    <Modal isOpen={isShow} onClose={close}>
      <div className='flex'>
        <form
          className='w-full bg-card rounded-lg'
          //   onSubmit={handleSubmit(onSubmit)}
        >
          <div className='py-4 text-xl'>
            <p className='text-center font-semibold'>Tạo bài viết</p>
          </div>

          <hr />

          <div className='flex items-center gap-3 mt-5 mx-auto px-5'>
            <Avatar>
              <AvatarImage src={`${user?.avatarUrl}`} />
              <AvatarFallback>{user?.fullName}</AvatarFallback>
            </Avatar>

            {/* <div className=''>
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
            </div> */}
          </div>

          {/* <div className='mt-5'>
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
          </div> */}

          <div className='w-[476px] border-[0.5px] border-gray-300 h-[50px] mx-auto rounded-md px-2 py-2 grid grid-cols-2 mt-5'>
            <div className=' text-center pt-1'>
              <p>Thêm vào bài viết của bạn</p>
            </div>
            <div className='flex gap-8 justify-center items-center'>
              <input
                // onChange={handleFileChange}
                type='file'
                hidden
                multiple
                id='uploadFile'
              />
              <MediaIcon className='size-6 fill-primary-500' />
            </div>
          </div>

          <button
            type='submit'
            className='w-[476px] bg-primary-500 border-[0.5px] h-[35px] mx-auto rounded-md flex items-center justify-center mt-5 mb-4'
          >
            <div className=' text-center text-white'>Đăng</div>
          </button>
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
