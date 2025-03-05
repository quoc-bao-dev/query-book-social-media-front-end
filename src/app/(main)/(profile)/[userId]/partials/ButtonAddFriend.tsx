'use client';

import { Button } from '@/components/ui/button';
import { useSendRequestMutation } from '@/queries/friend';

const ButtonAddFriend = ({ userId }: { userId: string }) => {
  const { mutateAsync } = useSendRequestMutation();
  const sendRequest = () => {
    mutateAsync(userId);
  };
  return (
    <div>
      <Button onClick={sendRequest}>Add Friend</Button>
    </div>
  );
};

export default ButtonAddFriend;
