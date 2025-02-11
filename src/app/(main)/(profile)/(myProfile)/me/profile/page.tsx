"use client"

import Academic from '@/components/icons/Academic';
import Briefcase from '@/components/icons/Briefcase';
import Building from '@/components/icons/Building-office';
import Camera from '@/components/icons/Camera';
import CreditCard from '@/components/icons/CreditCard';
import Document from '@/components/icons/Document';
import Fire from '@/components/icons/Fire';
import GlobeAsia from '@/components/icons/Globe-asia';
import Home from '@/components/icons/Home';
import IdentifyIcon from '@/components/icons/IdentifyIcon';
import Link from '@/components/icons/Link';
import Lock from '@/components/icons/Look-Closed';
import Maill from '@/components/icons/Maill';
import MapPin from '@/components/icons/Map-pin';
import Pen from '@/components/icons/Pencil';
import Phone from '@/components/icons/Phone';
import Rss from '@/components/icons/Rss';
import UserCircle from '@/components/icons/User-circle';
import UserPlus from '@/components/icons/User-plus';
import { useAuth } from '@/store/authSignal';
import { useState } from "react";
import SetCurUserProfileSignal from '../../../[userId]/partials/SetCurUserProfileSignal';
import Xmark from '@/components/icons/X-mark';
import Check from '@/components/icons/Check';


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
                                {/* Avatar */}
                                <div className="absolute translate-y-[-80%] size-[170px] rounded-full bg-slate-400 overflow-hidden">
                                    <img
                                        src={'/images/facebook.png'}
                                        alt="Avatar"
                                        className="w-full h-full object-cover rounded-full shadow-lg"
                                    />

                                    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 h-1/5 rounded-b-full cursor-pointer">
                                        <Camera className="w-6 h-6 text-white mb-1" />
                                    </div>
                                </div>
                                {/* Avatar */}
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
                            <div className="rounded-[16px] overflow-hidden relative border-b border mt-4 bg-card">
                                <div className="pl-4 mt-6 block ">
                                    <span className="text-xl text-neutral-900 font-semibold">
                                        Hồ sơ
                                    </span>
                                </div>
                                <div className="mt-4 mb-4 ">
                                    <div className="h-10 w-72 flex items-center  pl-2 space-x-2.5 mx-auto my-auto hover:bg-primary-100/50 rounded-md text-primary-500 bg-primary-100/50">
                                        <IdentifyIcon />
                                        <span className="hidden lg:block font-semibold text-sm ">
                                            Tổng quan
                                        </span>
                                    </div>
                                    <div className="h-10 w-72 flex items-center mt-2 pl-2 space-x-2.5 mx-auto my-auto hover:bg-primary-100/50 hover:text-primary-500 rounded-md text-neutral-800 ">
                                        <UserCircle />
                                        <span className="hidden lg:block font-semibold text-sm ">
                                            Thông tin cá nhân
                                        </span>
                                    </div>
                                    <div className="h-10 w-72 flex items-center mt-2 pl-2 space-x-2.5 mx-auto my-auto hover:bg-primary-100/50 hover:text-primary-500 rounded-md text-neutral-800 ">
                                        <Academic />
                                        <span className="hidden lg:block font-semibold text-sm ">
                                            Công việc học vấn
                                        </span>
                                    </div>
                                    <div className="h-10 w-72 flex items-center mt-2 pl-2 space-x-2.5 mx-auto my-auto hover:bg-primary-100/50 hover:text-primary-500 rounded-md text-sm text-neutral-800">
                                        <Maill />
                                        <span className="hidden lg:block font-semibold ">
                                            Thông tin liên hệ
                                        </span>
                                    </div>
                                    <div className="h-10 w-72 flex items-center mt-2 pl-2 space-x-2.5 mx-auto my-auto hover:bg-primary-100/50 hover:text-primary-500 rounded-md text-neutral-800">
                                        <Document />
                                        <span className="hidden lg:block font-semibold text-sm ">
                                            Chi tiết về bạn
                                        </span>
                                    </div>

                                </div>

                            </div>
                        </div>
                        {/* About */}
                        <div className="">
                            <div className="h-auto w-[680px] mt-4 border border-b rounded-2xl bg-card">

                                <div className="pt-2 pl-4 pr-4 pb-4 space-y-5">
                                    <div className="flex flex-col w-full">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center space-x-3">
                                                <Briefcase className="fill-primary-500" />
                                                <span className="text-base font-semibold text-neutral-800">
                                                    Làm việc tại <span className="font-bold text-neutral-950">FPT</span>
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-3 relative">
                                                <div className="w-9 h-9 bg-gray-200 flex items-center justify-center rounded-full cursor-pointer">
                                                    <Pen className="text-neutral-800" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="my-3 ">
                                            <div className="relative ">
                                                <input
                                                    type="email"
                                                    defaultValue="FPT"
                                                    className="peer h-[50px] w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                                    placeholder=" " // Đặt placeholder là dấu cách để label có thể nổi lên
                                                />
                                                <label className="absolute left-3 top-[-10px] text-neutral-600 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-600 peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary-500 transition-all">
                                                    Công ty
                                                </label>
                                            </div>
                                            <div className="mt-3 ">
                                                <div className="w-7 h-7 bg-gray-200 flex items-center justify-center rounded-full cursor-pointer">
                                                    <Xmark className="text-red-500" />
                                                </div>
                                            </div>
                                            <div className="mt-3 ">
                                                <div className="w-7 h-7 bg-gray-200 flex items-center justify-center rounded-full cursor-pointer">
                                                    <Check className="text-primary-500" />
                                                </div>
                                            </div>
                                        </div>



                                    </div>



                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center space-x-3">
                                            <Home className='fill-primary-500' />
                                            <span className="text-base font-bold text-neutral-800">
                                                Sống tại <span className='font-bold text-neutral-950'>Thành phố Hồ Chí Minh</span>
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3 mr-4">
                                            <div className="w-9 h-9 bg-gray-200 flex items-center justify-center rounded-full">
                                                <Pen className="text-neutral-800" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center space-x-3">
                                            <MapPin className='fill-primary-500' />
                                            <span className="text-base font-bold text-neutral-800">
                                                Đến từ <span className='font-bold text-neutral-950'>Bình Thuận</span>
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3 mr-4">
                                            <div className="w-9 h-9 bg-gray-200 flex items-center justify-center rounded-full">
                                                <Pen className="text-neutral-800" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Building className='fill-primary-500' />
                                        <span className="text-base font-bold text-neutral-800">
                                            Từng học <span className='font-bold text-neutral-950'>Trường THPT Lương Thế Vinh</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Phone className='fill-primary-500' />
                                        <span className="text-base font-bold text-neutral-800">
                                            Số điện thoại <span className='font-bold text-neutral-950'>0949021232</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Fire className='fill-primary-500' />
                                        <span className="text-base font-bold text-neutral-800">
                                            Bắt đầu công việc mới tại <span className='font-bold text-neutral-950'>FPT</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Link className='fill-primary-500' />
                                        <span className="text-base font-bold text-neutral-800">
                                            <span className='font-bold text-neutral-950'>jaydon.dev
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-auto w-[680px] mt-4 border border-b rounded-2xl bg-card">
                                <div className="pt-4 pl-4 pb-4 space-y-5">

                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center space-x-3">
                                            <Briefcase className="fill-primary-500" />
                                            <span className="text-base font-semibold text-neutral-800">
                                                Làm việc tại <span className="font-bold text-neutral-950">FPT</span>
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3 mr-4">
                                            <div className="w-9 h-9 bg-gray-200 flex items-center justify-center rounded-full">
                                                <Pen className="text-neutral-800" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center space-x-3">
                                            <Home className='fill-primary-500' />
                                            <span className="text-base font-bold text-neutral-800">
                                                Sống tại <span className='font-bold text-neutral-950'>Thành phố Hồ Chí Minh</span>
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3 mr-4">
                                            <div className="w-9 h-9 bg-gray-200 flex items-center justify-center rounded-full">
                                                <Pen className="text-neutral-800" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center space-x-3">
                                            <MapPin className='fill-primary-500' />
                                            <span className="text-base font-bold text-neutral-800">
                                                Đến từ <span className='font-bold text-neutral-950'>Bình Thuận</span>
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3 mr-4">
                                            <div className="w-9 h-9 bg-gray-200 flex items-center justify-center rounded-full">
                                                <Pen className="text-neutral-800" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Building className='fill-primary-500' />
                                        <span className="text-base font-bold text-neutral-800">
                                            Từng học <span className='font-bold text-neutral-950'>Trường THPT Lương Thế Vinh</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Phone className='fill-primary-500' />
                                        <span className="text-base font-bold text-neutral-800">
                                            Số điện thoại <span className='font-bold text-neutral-950'>0949021232</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Fire className='fill-primary-500' />
                                        <span className="text-base font-bold text-neutral-800">
                                            Bắt đầu công việc mới tại <span className='font-bold text-neutral-950'>FPT</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Link className='fill-primary-500' />
                                        <span className="text-base font-bold text-neutral-800">
                                            <span className='font-bold text-neutral-950'>jaydon.dev
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* posts */}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
