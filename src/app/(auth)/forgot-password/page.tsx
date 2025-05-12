import Logo from '@/components/common/Logo';
import ForgotPasswordForm from './partials/ForgotPasswordForm';

const page = () => {
  return (
    <div className='h-screen'>
      <div className='flex items-center justify-center h-full'>
        <div className=''>
          <div className='w-[400px] mx-auto'>
            <h1 className='text-2xl font-bold text-neutral-900'>
              Forgot Password
            </h1>
            <p className='mt-4 text-neutral-600/80'>
              Enter the email address associated with your account and we’ll
              send you a link to reset your password
            </p>
            <div className='mt-4'>
              <ForgotPasswordForm />
            </div>
            <Logo className='w-[100px] mx-auto mt-4' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
