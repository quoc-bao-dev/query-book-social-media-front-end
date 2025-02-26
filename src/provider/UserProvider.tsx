'use client';

import axiosClient from '@/httpClient';
import { authActions } from '@/store/authSignal';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

const UserProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        const user = await axiosClient.get('/users/me');

        authActions.login(user.data.data);
      } catch (error) {
        console.log(error);
        authActions.logout();
        router.push('/login');
      }
    })();
  }, []);

  return <>{children}</>;
};

export default UserProvider;
