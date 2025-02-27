'use client';

import { Button } from '@/components/common/Button';
import FloatInput from '@/components/common/FloatInput';
import PasswordInput from '@/components/common/PasswordInput';
import LoadingIcon from '@/components/icons/LoadingIcon';
import axiosClient from '@/httpClient';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginSchema, loginSchema } from '../schemas';

function FormLogin() {
  const [message, setMessage] = useState('');
  const [isShowActive, setIsShowActive] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const email = watch('email');

  const router = useRouter();

  const handleActiveAccount = async () => {
    await axiosClient.post(
      '/api/auth/gen-active-token',
      {
        email,
      },
      {
        baseURL: '',
      },
    );

    router.push('/verify-otp/active-account');
  };

  const onSubmit = async (data: LoginSchema) => {
    setMessage('');
    try {
      const response = await axiosClient.post('api/auth/login', data, {
        baseURL: '',
      });

      const status = response.status;

      if (status === 200) {
        const { accessToken, refreshToken } = response.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        console.log('[accessToken]', accessToken);
        console.log('[accessToken]', response);
        router.push('/');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { message }: { message: string } = error.response.data;
        if (message) {
          setMessage(message);
        }
        if (message === 'User is not active') {
          setIsShowActive(true);
        }
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className='text-xl font-semibold py-5'>Sign in to your account</h2>
        {message && <p className='text-error-500'>{message}</p>}
        <div className='my-5'>
          <FloatInput
            {...register('email')}
            error={!!errors.email}
            defaultValue={'pythagore1102@gmail.com'}
            type='email'
            label='Email address'
            className='h-[50px]'
          />
          {errors.email && (
            <p className='text-error-500 pt-1'>{errors.email.message}</p>
          )}
        </div>
        <div className='py-2'>
          <Link href='/forgot-password'>
            <p className='my-2 text-right cursor-pointer'>Forgot password?</p>
          </Link>
          <PasswordInput
            {...register('password')}
            defaultValue={'password1234'}
            error={!!errors.password}
            label='Password'
            className='h-[50px]'
          />
          {errors.password && (
            <p className='text-error-500 pt-1'>{errors.password.message}</p>
          )}
        </div>

        {isShowActive && (
          <div className='text-center pt-4'>
            <Button
              onClick={handleActiveAccount}
              className=' w-full h-[50px]  bg-info-100 text-info-500 hover:bg-info-200/70'
              type='button'
            >
              Active Account
            </Button>
          </div>
        )}
        <div className='text-center pt-4'>
          <Button
            disabled={isSubmitting || isShowActive}
            className=' w-full h-[50px]'
          >
            {isSubmitting && <LoadingIcon />}
            {isSubmitting ? <p>Authenticating...</p> : <p>Sign in</p>}
          </Button>
        </div>
        <div className='flex items-center justify-center w-full my-4'>
          <div className='h-px bg-gray-500 flex-grow'></div>
          <span className='mx-4 text-gray-800 font-medium'>OR</span>
          <div className='h-px bg-gray-500 flex-grow'></div>
        </div>
        <div className='flex items-center gap-5 justify-center'>
          <Image src={'/images/google.png'} alt='' width={35} height={35} />
          <Image src={'/images/git.png'} alt='' width={35} height={35} />
          <Image src={'/images/facebook.png'} alt='' width={35} height={35} />
        </div>
      </form>
    </>
  );
}

export default FormLogin;
