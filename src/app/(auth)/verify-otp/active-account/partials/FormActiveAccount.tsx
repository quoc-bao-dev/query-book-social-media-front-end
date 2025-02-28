'use client';

import { sSignUp } from '@/app/(auth)/welcome/signal/signupSignal';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import axiosClient from '@/httpClient';
import axios from 'axios';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const FormActiveAccount = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('');

  const router = useRouter();
  const onSubmit = async (data: string) => {
    if (isComplete) {
      return;
    }
    setIsComplete(true);

    try {
      const res = await axiosClient.post(
        '/api/auth/active-account',
        { otp: data },
        { baseURL: '' },
      );

      const { userId } = res.data;

      sSignUp.set(userId);

      setMessage('');

      router.push('/welcome');
    } catch (error) {
      setIsComplete(false);

      if (axios.isAxiosError(error) && error.response) {
        const { message }: { message: string } = error.response.data;
        if (message) {
          setMessage(message);
        }
      }
    }
  };
  return (
    <div>
      <form>
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          onComplete={onSubmit}
          onChange={() => setMessage('')}
        >
          <InputOTPGroup>
            <InputOTPSlot
              index={0}
              className='w-[50px] h-[50px] text-2xl font-medium'
            />
            <InputOTPSlot
              index={1}
              className='w-[50px] h-[50px] text-2xl font-medium'
            />
            <InputOTPSlot
              index={2}
              className='w-[50px] h-[50px] text-2xl font-medium'
            />
            <InputOTPSlot
              index={3}
              className='w-[50px] h-[50px] text-2xl font-medium'
            />
            <InputOTPSlot
              index={4}
              className='w-[50px] h-[50px] text-2xl font-medium'
            />
            <InputOTPSlot
              index={5}
              className='w-[50px] h-[50px] text-2xl font-medium'
            />
          </InputOTPGroup>
        </InputOTP>
      </form>

      {message && (
        <div className=' text-red-500 text-sm mt-2'>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default FormActiveAccount;
