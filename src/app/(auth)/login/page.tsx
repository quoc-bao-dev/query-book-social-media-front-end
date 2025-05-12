import { Button } from '@/components/common/Button';
import Image from 'next/image';
import Link from 'next/link';
import FormLogin from './partials/FormLogin';
import ModalConfirmResetPass from './partials/ModalConfirmResetPass';

export const metadata = {
  title: 'Sign in',
  description: 'Welcome to Query Book!',
};

const Login = () => {
  return (
    <>
      <div className='min-h-screen h-screen'>
        <div className='grid grid-cols-3 h-full'>
          <div className='col-span-1 min-h-screen h-full hidden md:flex bg-gray-100  justify-center items-center'>
            <div className='py-[42px]'>
              <div className='text-center py-9'>
                <h1 className='text-3xl font-bold text-neutral-950'>
                  Hi, Welcome back
                </h1>
                <h5 className='text-gray-800 pt-4'>
                  More effectively with optimized workflows.
                </h5>
              </div>
              <div className='flex justify-center items-center px-2'>
                <Image
                  src={'/images/logo_QBook.png'}
                  alt=''
                  className='w-full h-auto'
                  width={3000}
                  height={0}
                />
              </div>

              <div className='text-center py-9'>
                <Link href='/sign-up'>
                  <Button className='w-[200px] h-[40px]'>Sign up</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className='col-span-3 min-h-screen md:col-span-2 px-4 md:px-0 h-full bg-card flex justify-center items-center'>
            <div className='w-[450px]'>
              <FormLogin />
            </div>
          </div>
        </div>
      </div>
      <ModalConfirmResetPass />
    </>
  );
};

export default Login;
