'use client';

import { useAuth } from '@/store/authSignal';
import PostsOfUser from '../../../[userId]/partials/PostsOfUser';

const PostContent = () => {
  const { user } = useAuth();
  if (!user) {
    return null;
  }
  return (
    <div className='space-y-4'>
      <PostsOfUser userId={user.id} />
    </div>
  );
};

export default PostContent;
