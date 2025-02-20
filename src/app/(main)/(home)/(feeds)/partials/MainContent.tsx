"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import useDebouncedCallback from "@/hooks/useDebounceCallback";
import { usePostQuery } from "@/queries/post";
import { PostResponse, PostsQueryData } from "@/types/post";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Feeds from "./Feeds";
import Post from "./Post";
import PostCreate from "./PostCreate";
import PostSkeleton from "./PostSkeleton";

const MainContent = () => {
  const [isFetched, setIsFetched] = useState(false); // Kiểm soát trạng thái gọi API
  const queryClient = useQueryClient();
  const { data, fetchNextPage, isLoading, isFetching, hasNextPage } =
    usePostQuery(); // Đảm bảo `hasNextPage` từ server

  const posts =
    data?.pages.flatMap((page: AxiosResponse) => page.data.data) ||
    ([] as PostResponse[]);

  const clearPost = useDebouncedCallback(() => {
    if (posts.length > 50) {
      queryClient.setQueryData(["posts"], (oldData: PostsQueryData) => {
        if (!oldData) return oldData;
        return {
          pages: oldData.pages.slice(1), // Giữ lại bài mới
          pageParams: oldData.pageParams.slice(1),
        };
      });
    }
  }, 500);

  // Hàm xử lý cuộn (debounce)
  const handleScroll = useDebouncedCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (!isFetched && scrollTop + clientHeight === scrollHeight) {
      fetchNextPage();
      clearPost();
      setIsFetched(true);
    }

    // Kiểm tra nếu đã gần cuối trang
    if (
      scrollTop + clientHeight >= scrollHeight - 300 &&
      scrollTop + clientHeight < scrollHeight &&
      hasNextPage
    ) {
      // Xóa bài viết cũ (nếu cần)
      clearPost();

      // Gọi API để tải thêm bài viết
      fetchNextPage();
      setIsFetched(false);
    }

    // Reset trạng thái khi cuộn ra khỏi vùng gần cuối
    if (scrollTop + clientHeight < scrollHeight - 300) {
      setIsFetched(false);
    }
  }, 200); // Tăng thời gian debounce để tránh spam

  useEffect(() => {
    const onScroll = () => handleScroll();
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [handleScroll]);

  return (
    <>
      {/* main content */}
      <main className="mx-auto pb-[75px] w-full">
        {/* Feed */}
        <div className="w-[calc(100vw-32px)] md:w-full mx-auto">
          <ScrollArea className="w-full overflow-hidden">
            <Feeds />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        {/* Feed */}

        {/* From create Post */}
        <PostCreate />
        {/* From create Post */}

        {/* Post */}
        <div className="flex gap-5 flex-col">
          {posts.map((item, index) => (
            <Post key={index} post={item} mode="onPage" />
          ))}
        </div>
        {/* Post */}

        {(isLoading || isFetching) && (
          <div className="flex flex-col gap-3">
            <PostSkeleton />
            <PostSkeleton />
          </div>
        )}
      </main>
      {/* main content */}
    </>
  );
};

export default MainContent;
