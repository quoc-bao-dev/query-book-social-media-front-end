'use client';

import axiosClient from '@/httpClient';
import { Fragment, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/common/Button';
import Post from './partials/Post';

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
];

const mockup = [
    { images: 'post.jpg' },
    { images: 'post_1.png' },
    { images: 'post_2.png' },
];

export default function Home() {
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axiosClient.get('/users/me', {
                    withCredentials: true,
                });
                console.log(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetch();
    }, []);

    return (
        <>
            {/* main content */}
            <div className="w-[680px] mx-auto pb-[75px]">
                {/* Feed */}
                <div className="w-full flex gap-4 justify-between">
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
                {/* Feed */}

                {/* From create Post */}
                <div className="py-3 ">
                    <div className="w-full gap-5 border rounded-xl px-4 py-4 bg-card">
                        <div className="w-full h-[100px] border rounded-xl"></div>
                        <div className="flex justify-between items-center py-2">
                            <div className="flex gap-4">
                                <div className="flex gap-2">
                                    <div className="">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                            />
                                        </svg>
                                    </div>
                                    <p>Image</p>
                                </div>
                                <div className="flex gap-2">
                                    <div className="">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                                            />
                                        </svg>
                                    </div>
                                    <p>Video</p>
                                </div>
                            </div>
                            <div className="">
                                <Button className="w-24">Post</Button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* From create Post */}

                {/* Post */}
                <div className="flex gap-5 flex-col">
                    {mockup.map((item, index) => (
                        <Post key={index} post={item} />
                    ))}
                </div>
                {/* Post */}
            </div>
            {/* main content */}
        </>
    );
}
