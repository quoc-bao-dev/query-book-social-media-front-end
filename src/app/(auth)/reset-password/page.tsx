'use client';
import Logo from '@/components/common/Logo';
import ResetPasswordForm from './partials/ResetPasswordForm';

const Page = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className=''>
        <h1 className='text-2xl font-bold'>Reset Password</h1>
        <ResetPasswordForm />
        <div className='mt-4 flex justify-center'>
          <Logo className='w-[100px]' />
        </div>
      </div>
    </div>
  );
};

export default Page;
