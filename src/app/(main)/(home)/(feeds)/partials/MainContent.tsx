'use client';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import useDebouncedCallback from '@/hooks/useDebounceCallback';
import { usePostQuery } from '@/queries/post';
import { PostResponse, PostsQueryData } from '@/types/post';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import Feeds from './Feeds';
import Post from './Post';
import PostCreate from './PostCreate';
import PostSkeleton from './PostSkeleton';

const MainContent = () => {
  const [isFetched, setIsFetched] = useState(false); // Kiểm soát trạng thái gọi API

  const queryClient = useQueryClient();

  const { data, fetchNextPage, isLoading, isFetching, hasNextPage } =
    usePostQuery(); // Đảm bảo `hasNextPage` từ server

  const posts =
    data?.pages.flatMap((page: AxiosResponse) => page.data.data) ||
    ([] as PostResponse[]);

  const clearPost = () => {
    queryClient.setQueryData(['posts'], (oldData: PostsQueryData) => {
      if (!oldData) return oldData;

      // Tính tổng số bài viết hiện tại
      const totalPosts = oldData.pages.reduce(
        (acc, page) => acc + page.data.data.length,
        0,
      );

      // Nếu tổng số bài viết nhỏ hơn hoặc bằng 20, không cần xóa
      if (totalPosts <= 20) return oldData;

      // Tạo bản sao của các trang
      const newPages = [...oldData.pages];
      let postsToRemove = totalPosts - 20;

      // Xóa các bài viết từ đầu cho đến khi chỉ còn 20 bài
      while (postsToRemove > 0 && newPages.length > 0) {
        const firstPage = newPages[0];
        const postsInFirstPage = firstPage.data.data.length;

        if (postsInFirstPage <= postsToRemove) {
          // Nếu số bài viết trong trang đầu tiên nhỏ hơn hoặc bằng số bài cần xóa
          postsToRemove -= postsInFirstPage;
          newPages.shift(); // Xóa trang đầu tiên
        } else {
          // Nếu trang đầu tiên có nhiều bài viết hơn số cần xóa
          firstPage.data.data = firstPage.data.data.slice(postsToRemove);
          postsToRemove = 0;
        }
      }

      return {
        ...oldData,
        pages: newPages,
      };
    });
  };

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
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [handleScroll]);

  return (
    <>
      {/* main content */}
      <main className='mx-auto pb-[75px] w-full'>
        {/* Story */}
        <div className='w-[calc(100vw-32px)] md:w-full mx-auto'>
          <ScrollArea className='w-full rounded-xl overflow-hidden'>
            <Feeds />
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>
        {/* Feed */}

        {/* From create Post */}
        <PostCreate />
        {/* From create Post */}

        {/* Post */}
        <div className='flex gap-5 flex-col'>
          {posts.map((item, index) => (
            <Post key={index} post={item} mode='onPage' />
          ))}
        </div>
        {/* Post */}

        {(isLoading || isFetching) && (
          <div className='flex flex-col gap-3 mt-5'>
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
