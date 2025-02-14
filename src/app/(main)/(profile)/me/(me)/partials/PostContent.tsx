"use client";

import { useAuth } from "@/store/authSignal";
import PostsOfUser from "../../../[userId]/partials/PostsOfUser";

const PostContent = () => {
  const { user } = useAuth();
  if (!user) {
    return null;
  }
  return <PostsOfUser userId={user.id} />;
};

export default PostContent;
