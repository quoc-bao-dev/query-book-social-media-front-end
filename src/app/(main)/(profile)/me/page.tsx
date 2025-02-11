"use client"

import CreditCard from '@/components/icons/CreditCard';
import GlobeAlt from '@/components/icons/Globe-alt';
import Inbox from '@/components/icons/Inbox';
import MapPin from '@/components/icons/Map-pin';
import Phone from '@/components/icons/Phone';
import Rss from '@/components/icons/Rss';
import UserPlus from '@/components/icons/User-plus';
import { useAuth } from '@/store/authSignal';
import { useState } from "react";
import SetCurUserProfileSignal from '../[userId]/partials/SetCurUserProfileSignal';


const Page = () => {

    const { user } = useAuth()
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div className="min-h-screen">
            {/* main contain */}
            <SetCurUserProfileSignal user={user} />
            <div className="flex justify-center">
                <div className="w-[1028px]">
                    {/* cover page */}
                    <div className="relative rounded-2xl overflow-hidden">
                        <div className="bg-[url('/images/bia2.jpg')] object-cover bg-center h-[250px] relative bg-gray-500">

                            <div className="absolute bottom-0 pl-[calc(16px+180px)] w-[calc(100%-16px+180px)]">
                                <div className="pl-3 py-4">
                                    <h1 className="text-4xl font-semibold text-white ">{user?.fullName}</h1>
                                    {user?.jobTitle?.title}
                                    <p className='font-semibold text-base text-neutral-900'></p>
                                    <div className="flex gap-1 mt-2 ">
                                        <div className="size-8 rounded-full bg-gray-500">
                                            <img
                                                src="/images/kaka.png"
                                                alt="Friend 1"
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        </div>
                                        <div className="size-8 rounded-full bg-gray-500">
                                            <img
                                                src="/images/ronaldo.png"
                                                alt="Friend 1"
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        </div>
                                        <div className="size-8 rounded-full bg-gray-500">
                                            <img
                                                src="/images/that.png"
                                                alt="Friend 1"
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4">
                            <div className="relative">
                                {/* avatar */}
                                <div className="absolute translate-y-[-80%] size-[170px] rounded-full bg-slate-400">
                                    <img
                                        src={'/images/facebook.png'}
                                        alt="Avatar"
                                        className="w-full h-full rounded-full object-cover shadow-lg "
                                    />
                                </div>
                                {/* avatar */}
                            </div>

                        </div>

                        <div className="py-3 bg-card px-4 flex justify-end items-center">
                            <div className="flex justify-center space-x-6 relative">
                                <div
                                    className="relative flex flex-col items-center space-x-2 cursor-pointer pb-2"
                                    onClick={() => setActiveTab("profile")}
                                >
                                    <div className="flex items-center space-x-2">
                                        <CreditCard className="fill-primary-500" />
                                        <span className="text-base font-bold text-neutral-800">Hồ sơ</span>
                                    </div>
                                    {activeTab === "profile" && (
                                        <div className="absolute rounded-2xl bottom-0 left-0 w-full h-[2px] bg-primary-500"></div>
                                    )}
                                </div>

                                <div
                                    className="relative flex flex-col items-center space-x-2 cursor-pointer pb-2"
                                    onClick={() => setActiveTab("add-friend")}
                                >
                                    <div className="flex items-center space-x-2">
                                        <UserPlus className="fill-primary-500" />
                                        <span className="text-base font-bold text-neutral-800">Thêm bạn bè</span>
                                    </div>
                                    {activeTab === "add-friend" && (
                                        <div className="absolute rounded-2xl bottom-0 left-0 w-full h-[2px] bg-primary-500"></div>
                                    )}
                                </div>

                                <div
                                    className="relative flex flex-col items-center space-x-2 cursor-pointer pb-2"
                                    onClick={() => setActiveTab("follow")}
                                >
                                    <div className="flex items-center space-x-2">
                                        <Rss className="fill-primary-500" />
                                        <span className="text-base font-bold text-neutral-800">Theo dõi</span>
                                    </div>
                                    {activeTab === "follow" && (
                                        <div className="absolute rounded-2xl bottom-0 left-0 w-full h-[2px] bg-primary-500"></div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* cover page */}

                    <div className="flex justify-between">
                        {/* About */}
                        <div className="w-80 flex-col">

                            {/* FollowFollow */}
                            <div className="mt-4 h-24 rounded-[16px] overflow-hidden relative border-b border flex justify-around items-center px-6 bg-card">
                                <div className="text-center">
                                    <span className="block text-3xl font-bold text-neutral-900">
                                        {user?.followerCount}
                                    </span>
                                    <span className="text-sm text-neutral-900">
                                        Người theo dõi
                                    </span>
                                </div>
                                <div className="border-l border-gray-500 h-16"></div>{' '}
                                {/* Đường kẻ phân cách */}
                                <div className="text-center">
                                    <span className="block text-3xl font-bold text-neutral-900">
                                        {user?.followingCount}
                                    </span>
                                    <span className="text-sm text-neutral-900">
                                        Đang theo dõi
                                    </span>
                                </div>
                            </div>
                            {/* Follow */}

                            {/**/}
                            <div className="rounded-[16px] overflow-hidden relative border-b border mt-4 h-80 bg-card " >
                                <div className="pl-4 mt-6 block ">
                                    <span className="text-xl text-neutral-900 font-semibold">
                                        Giới thiệu
                                    </span>
                                </div>
                                <span className="text-sm text-neutral-800 pl-4 block mt-4">
                                    Tôi là một lập trình viên front-end tại FPT Software, tôi
                                    có 3 năm kinh nghiệm trong việc phát triển
                                    ứng dụng.
                                </span>
                                <div className="flex items-center mt-4 pl-4 space-x-3 group relative">
                                    <MapPin />
                                    <span className="text-sm text-neutral-800 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-neutral-500 after:transition-all after:duration-300 group-hover:after:w-full">
                                        Binh Tan, Ho Chi Minh City
                                    </span>
                                </div>

                                <div className="flex items-center mt-4 pl-4 space-x-3 group relative">
                                    <Inbox />
                                    <span className="text-sm text-neutral-800 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-neutral-500 after:transition-all after:duration-300 group-hover:after:w-full">
                                        jaydondev@gmail.com
                                    </span>
                                </div>
                                <div className="flex items-center mt-4 pl-4 space-x-3 group relative">
                                    <Phone />
                                    <span className="text-sm text-neutral-800 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-neutral-500 after:transition-all after:duration-300 group-hover:after:w-full">
                                        0919 616 224
                                    </span>
                                </div>
                                <div className="flex items-center mt-4 pl-4 space-x-3 group relative">
                                    <GlobeAlt />
                                    <span className="text-sm text-neutral-800 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-neutral-500 after:transition-all after:duration-300 group-hover:after:w-full">
                                        jaydon.dev
                                    </span>
                                </div>
                            </div>
                            {/**/}


                        </div>
                        {/* About */}

                        <div className="">
                            {/* TextPostt */}
                            <div className="mt-4 w-[680px] h-32 flex flex-col border border-b rounded-2xl p-4 bg-card">
                                <input
                                    type="text"
                                    className="w-full h-12 border border-gray-300 rounded-xl px-4  text-sm"
                                    placeholder="What do you think?"
                                />
                                <div className="flex items-center justify-between mt-4 ">
                                    <div className="flex gap-4">
                                        <button className="flex items-center gap-2 px-4 py-2 text-gray-950 font-semibold rounded-lg">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-5 h-5 "
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="text-sm text-neutral-900">
                                                Image
                                            </span>
                                        </button>
                                        <button className="flex items-center gap-2 px-4 py-2 text-gray-950 font-semibold rounded-lg">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
                                            </svg>
                                            <span className="text-sm text-neutral-900">
                                                Video
                                            </span>
                                        </button>
                                    </div>
                                    <button className="px-6 py-2 bg-slate-100 text text-sm rounded-lg">
                                        Post
                                    </button>
                                </div>
                            </div>
                            {/* TextPostt */}
                            {/* posts */}
                            <div className="h-[400px] mt-4 border border-b rounded-2xl bg-card"></div>


                            {/* posts */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
