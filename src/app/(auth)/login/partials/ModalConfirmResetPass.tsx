'use client';
import { Button } from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Link from 'next/link';
import { useEffect } from 'react';
import { signify } from 'react-signify';

export const sModalConfirmResetPass = signify({ isOpen: false });
const ModalConfirmResetPass = () => {
  const { isOpen } = sModalConfirmResetPass.use();
  useEffect(() => {
    return () => sModalConfirmResetPass.reset();
  }, []);
  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <div className='p-6 bg-card rounded-lg'>
        <h2 className='text-xl font-semibold text-neutral-800'>
          Confirm reset password
        </h2>
        <p className='mt-4'>Are you sure you want to reset your password?</p>
        <div className='flex justify-end gap-4 mt-4'>
          <Link className='flex-1' href='/reset-password'>
            <Button className='w-full'>Yes I&apos;m sure</Button>
          </Link>
          <Button
            onClick={() =>
              sModalConfirmResetPass.set((n) => (n.value.isOpen = false))
            }
            className='flex-1'
            variant='lighten'
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirmResetPass;
