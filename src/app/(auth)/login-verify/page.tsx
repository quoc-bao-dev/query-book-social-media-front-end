'use client';

import LoadingEffect from '@/components/common/Loading';
import axiosClient, { tokenManager } from '@/httpClient';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
const Page = () => {
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');
  const isNew = searchParams.get('isNew');

  const { push } = useRouter();

  if (!accessToken || !refreshToken) {
    push('/login');
  }

  const handler = async () => {
    const res = await axiosClient.post(
      '/api/auth/set-cookie',
      {
        accessToken,
        refreshToken,
      },
      { baseURL: '' },
    );

    tokenManager.setAccessToken(accessToken!);
    tokenManager.setRefreshToken(refreshToken!);

    if (isNew) {
      push('/welcome');
    } else {
      push('/');
    }
  };

  useEffect(() => {
    handler();
  }, []);

  return (
    <div className='text-center bg-primary-50 text-primary-600 h-screen flex justify-center items-center text-4xl'>
      <LoadingEffect />
    </div>
  );
};

export default Page;
