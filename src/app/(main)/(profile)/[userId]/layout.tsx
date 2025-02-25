'use client';
import { useAuth } from '@/store/authSignal';
import { PropsWithChildren } from 'react';
import { sCurUserProfileSignal } from '../signal/curUserProfileSignal';

const layout = ({ children }: PropsWithChildren) => {
  const { user } = sCurUserProfileSignal.use();
  const { user: userMe } = useAuth();

  const isMe = user?.id === userMe?.id;
  const profileLink = isMe ? '/me/profile' : `/${user?.id || ''}/profile`;
  const targetLink = isMe ? '/me' : `/${user?.id || ''}`;

  return <div className=''>{children}</div>;
};

export default layout;
