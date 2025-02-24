"use client";
import Post from "@/app/(main)/(home)/(feeds)/partials/Post";
import { usePostOfUserQuery } from "@/queries/post";

type PostsOfUserProps = {
  userId: string;
};
const PostsOfUser = ({ userId }: PostsOfUserProps) => {
  const { data } = usePostOfUserQuery(userId);

  return (
    <div className="">
      {data?.map((item) => (
        <Post key={item.id} post={item} mode="onPage" />
      ))}
    </div>
  );
};

export default PostsOfUser;
