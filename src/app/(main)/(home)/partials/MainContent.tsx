'use client';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import useDebouncedCallback from '@/hooks/useDebounceCallback';
import { usePostQuery } from '@/queries/post';
import { PostResponse, PostsQueryData } from '@/types/post';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Post from './Post';
import { useTranslations } from 'next-intl';
import PostCreate from './PostCreate';

const feeds = [
    {
        images: 'cristianoRonaldo.png',
        name: 'Cristiano Ronaldo',
    },
    {
        images: 'kaka.png',
        name: 'Kaka',
    },
    {
        images: 'ronaldo.png',
        name: 'Roanldo Delima',
    },
    {
        images: 'ronaldo.png',
        name: 'Roanldo Delima',
    },
];

const MainContent = () => {
    const [isFetched, setIsFetched] = useState(false); // Kiểm soát trạng thái gọi API

    const queryClient = useQueryClient();

    const { data, fetchNextPage, isLoading, hasNextPage } = usePostQuery(); // Đảm bảo `hasNextPage` từ server

    const posts =
        data?.pages.flatMap((page: AxiosResponse) => page.data.data) ||
        ([] as PostResponse[]);

    const clearPost = useDebouncedCallback(() => {
        if (posts.length > 50) {
            queryClient.setQueryData(['posts'], (oldData: PostsQueryData) => {
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
        const { scrollTop, scrollHeight, clientHeight } =
            document.documentElement;

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
            console.log(
                `Fetching more posts... Current post count: ${posts.length}`
            );

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

    const t = useTranslations('HomePage');
    return (
        <>
            {/* main content */}
            <main className="mx-auto pb-[75px] w-full">
                {/* Story */}

                <h1>{t('title')}</h1>
                <ScrollArea className=" whitespace-nowrap rounded-xl overflow-hidden">
                    <div className="w-full flex gap-4 justify-between ">
                        <div className="w-[159px] h-[225px] rounded-xl relative">
                            <Image
                                src={`/images/that.png`}
                                alt=""
                                className="w-full rounded-xl object-cover"
                                width={500}
                                height={0}
                            />
                            <div className=" absolute top-2 left-2">
                                <Image
                                    src={`/images/that.png`}
                                    alt=""
                                    width={100}
                                    className="w-[50px] h-[50px] rounded-[50%] object-cover"
                                    height={0}
                                />
                            </div>

                            <div className="w-full bg-primary-600 absolute bottom-0 rounded-b-xl h-[50px] ">
                                <div className="w-[50px] h-[50px] rounded-[50%] bg-gray-300 flex justify-center items-center absolute bottom-7 left-[50%] translate-x-[-50%]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="size-14 text-primary-700"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <p className="font-semibold text-gray-50 absolute bottom-1 left-[50%] translate-x-[-50%]">
                                    Tạo tin
                                </p>
                            </div>
                        </div>

                        {feeds.map((_item) => (
                            <>
                                <div className="w-[159px] h-[225px] rounded-xl relative">
                                    <Image
                                        src={`/images/${_item.images}`}
                                        alt=""
                                        className="w-full rounded-xl object-cover"
                                        width={500}
                                        height={0}
                                    />
                                    <div className=" absolute top-2 left-2">
                                        <Image
                                            src={`/images/${_item.images}`}
                                            alt=""
                                            width={100}
                                            className="w-[50px] h-[50px] rounded-[50%] object-cover"
                                            height={0}
                                        />
                                    </div>
                                    <div className="absolute bottom-2 left-2">
                                        <p className="font-semibold text-gray-50">
                                            {_item.name}
                                        </p>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                {/* Feed */}

                {/* From create Post */}
                <PostCreate />
                {/* From create Post */}

                {/* Post */}
                <div className="flex gap-5 flex-col">
                    {posts.map((item, index) => (
                        <Post key={index} post={item} />
                    ))}
                </div>
                {/* Post */}
                {isLoading && (
                    <div className="w-full flex justify-center items-center">
                        <div className="h-[400px] bg-gray-200">
                            <h1>Loading</h1>
                        </div>
                    </div>
                )}
            </main>
            {/* main content */}
        </>
    );
};

export default MainContent;
