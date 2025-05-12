import { Button } from '@/components/common/Button';
import Image from 'next/image';
import Link from 'next/link';
import RegisterFrom from './partials/RegisterFrom';

export const metadata = {
  title: 'Sign up',
  description: 'Welcome to Query Book!',
};

const SignUp = () => {
  return (
    <>
      <div className='h-screen min-h-screen'>
        <div className='grid grid-cols-3 h-full'>
          <div className='col-span-3 md:col-span-2 px-4 md:px-0 h-full bg-card flex justify-center items-center'>
            <div className='w-[450px]'>
              <RegisterFrom />
            </div>
          </div>
          <div className='col-span-1 h-full min-h-screen bg-gray-100 hidden md:flex justify-center items-center'>
            <div className='py-[42px]'>
              <div className='text-center py-8'>
                <h1 className='text-3xl font-bold text-neutral-950'>
                  Welcome back
                </h1>
                <h5 className='text-gray-800 pt-3'>
                  To keep connected with us please login <br /> with your
                  personal info
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

              <div className='text-center py-8'>
                <Link href='/login'>
                  <Button className='w-[200px] h-[40px]'>Sign in</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
