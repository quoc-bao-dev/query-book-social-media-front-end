'use client';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import axiosClient, { tokenManager } from '@/httpClient';
import axios from 'axios';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const FormActiveAccount = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('');

  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const router = useRouter();
  const onSubmit = async (data: string) => {
    if (isComplete) {
      return;
    }
    setIsComplete(true);

    try {
      const res = await axiosClient.post('/auth/login/verify-2fa', {
        otp: data,
        twoFaToken: token,
      });
      const { accessToken, refreshToken } = res.data.data;
      console.log('[accessToken]', accessToken);

      tokenManager.setAccessToken(accessToken);
      tokenManager.setRefreshToken(refreshToken);

      const setTokenRes = await axiosClient.post(
        '/api/auth/set-cookie',
        {
          accessToken,
          refreshToken,
        },
        { baseURL: '' },
      );

      console.log(setTokenRes);

      setMessage('');

      router.push('/');
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
