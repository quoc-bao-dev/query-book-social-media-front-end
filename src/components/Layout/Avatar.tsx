'use client';

import { sAuth } from '@/store/authSignal';
import AvatarUI from '@/components/common/Avatar';
const Avatar = () => {
  const user = sAuth.use();
  const name =
    user.user?.firstName
      ?.split(' ')
      .map((name) => name[0])
      .join('') || '';
  return (
    <div>
      <AvatarUI src={user.user?.avatarUrl} className='' fallBack={name} />
    </div>
  );
};

export default Avatar;
