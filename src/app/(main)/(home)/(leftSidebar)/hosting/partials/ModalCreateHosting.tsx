'use client';

import { Button } from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { Input } from '@/components/ui/input';
import { useCreateHostingMutation } from '@/queries/hosting';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signify } from 'react-signify';
import {
  CreateHostingSchema,
  createHostingSchema,
} from '../schemas/createHosting';

const sModalCreateHosting = signify({
  isOpen: false,
});

export const useModalCreateHosting = () => ({
  open: () => sModalCreateHosting.set((n) => (n.value.isOpen = true)),
  close: () => sModalCreateHosting.set((n) => (n.value.isOpen = false)),
});

const ModalCreateHosting = () => {
  const [message, setMessage] = useState('');

  const { isOpen } = sModalCreateHosting.use();

  const { mutateAsync } = useCreateHostingMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateHostingSchema>({
    resolver: zodResolver(createHostingSchema),
  });

  const onSubmit = async ({ subdomain }: CreateHostingSchema) => {
    try {
      setMessage('');
      await mutateAsync(subdomain);
      sModalCreateHosting.set((n) => (n.value.isOpen = false));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => sModalCreateHosting.set((n) => (n.value.isOpen = false))}
    >
      <form
        className='p-4 bg-card rounded-lg w-[300px]'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className=' font-semibold text-neutral-600 pb-3'>Create hosting</h2>
        {message && <p className='text-error-500 text-sm my-2'>{message}</p>}
        <Input
          {...register('subdomain')}
          placeholder='Subdomain'
          className='bg-background'
        />
        {errors.subdomain && (
          <p className='text-error-500 text-sm mt-2'>
            {errors.subdomain.message as string}
          </p>
        )}
        <div className='mt-4 flex gap-4'>
          <Button className='flex-1'>Create</Button>
          <Button
            className='flex-1 bg-primary-100/50 hover:bg-primary-100'
            variant='ghost'
            type='button'
            onClick={() =>
              sModalCreateHosting.set((n) => (n.value.isOpen = false))
            }
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalCreateHosting;
