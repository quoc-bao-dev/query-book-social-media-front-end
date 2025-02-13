import { config } from '@/config';
import httpClient from '@/httpClient/httpClient';
import { HttpResponse } from '@/types/common';
import { UserProfileResponse } from '@/types/user';
import Image from 'next/image';
import SetCurUserProfileSignal from '../partials/SetCurUserProfileSignal';
import PostsOfUser from './partials/PostsOfUser';

type PageProps = {
    params: { userId: string };
};

const Page = async ({ params }: PageProps) => {
    const { userId } = await params;

    const user = (
        await httpClient.get<HttpResponse<UserProfileResponse>>(
            `${config.BASE_URL}/users/profile/${userId}`
        )
    ).data;

    return (
        <div className="min-h-screen">
            {/* main contain */}
            <SetCurUserProfileSignal user={user} />
            <div className="flex justify-center">
                <div className="w-[1028px]">
                    {/* cover page */}
                    <div className="h-[550px] rounded-[16px] overflow-hidden relative border-b border bg-card">
                        <div className="">
                            <div className="h-[407px]">
                                <Image
                                    src={'/images/post_1.png'}
                                    alt="Cover"
                                    width={1028}
                                    height={407}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute bottom-6 left-8">
                                <img
                                    src={'/images/post_1.png'}
                                    alt="Avatar"
                                    className="w-56 h-56 rounded-full object-cover shadow-lg "
                                />
                            </div>

                            {/* User Info */}
                            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start ml-[272px] absolute top-[420px]">
                                {/* Name and Role */}
                                <div className="text-center sm:text-left">
                                    <h2 className="text-4xl font-semibold text-neutral-900">
                                        {user.fullName}
                                    </h2>
                                    <p className="text-base text-neutral-800">
                                        {user.jobTitle?.title}
                                    </p>
                                    <div className="flex justify-center sm:justify-start mt-4 relative">
                                        <div className="w-[32px] h-[32px] bg-gray-200 rounded-full overflow-hidden absolute left-0">
                                            <img
                                                src="/images/son-avt.jpg"
                                                alt="Friend 1"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="w-[32px] h-[32px] bg-gray-200 rounded-full overflow-hidden absolute left-[24px]">
                                            <img
                                                src="/images/kaka.png"
                                                alt="Friend 2"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="w-[32px] h-[32px] bg-gray-200 rounded-full overflow-hidden absolute left-[48px]">
                                            <img
                                                src="/images/git.png"
                                                alt="Friend 3"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Buttons */}
                            <div className="mt-4 sm:mt-0 flex justify-center space-x-4 absolute top-[501px] ml-[660px]">
                                <div className="flex items-center space-x-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-6 h-6 text-primary-500"
                                    >
                                        <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-base font-bold text-neutral-800">
                                        Hồ sơ
                                    </span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-6 h-6 text-primary-500"
                                    >
                                        <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                                    </svg>
                                    <span className="text-base font-bold text-neutral-800">
                                        Thêm bạn bè
                                    </span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-6 h-6 text-primary-500"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3.75 4.5a.75.75 0 0 1 .75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75C18 11.708 12.292 6 5.25 6H4.5a.75.75 0 0 1-.75-.75V4.5Zm0 6.75a.75.75 0 0 1 .75-.75h.75a8.25 8.25 0 0 1 8.25 8.25v.75a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75v-.75a6 6 0 0 0-6-6H4.5a.75.75 0 0 1-.75-.75v-.75Zm0 7.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-base font-bold text-neutral-800">
                                        Follower
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* cover page */}

                    <div className="flex justify-between">
                        {/* About */}
                        <div className="w-80 flex-col">
                            <div className="mt-4 h-24 rounded-[16px] overflow-hidden relative border-b border flex justify-around items-center px-6 bg-card">
                                <div className="text-center">
                                    <span className="block text-3xl font-bold text-neutral-900">
                                        {user?.followerCount}
                                    </span>
                                    <span className="text-sm text-neutral-800">
                                        Follower
                                    </span>
                                </div>
                                <div className="border-l border-gray-500 h-16"></div>{' '}
                                {/* Đường kẻ phân cách */}
                                <div className="text-center">
                                    <span className="block text-3xl font-bold text-neutral-900">
                                        {user?.followingCount}
                                    </span>
                                    <span className="text-sm text-neutral-800">
                                        Following
                                    </span>
                                </div>
                            </div>
                            <div className="rounded-[16px] overflow-hidden relative border-b border mt-4 h-80 bg-card">
                                <span className="text-xl text-neutral-900 font-semibold pl-6 block mt-6">
                                    Giới thiệu
                                </span>
                                <span className="text-sm text-neutral-800 pl-6 block mt-4">
                                    I'm a front-end developer at FPT Software, I
                                    have 3 years of experience in development
                                    application
                                </span>
                                <div className="flex items-center mt-9 pl-6 space-x-2.5">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-sm text-neutral-800">
                                        Binh Tan, Ho Chi Minh City
                                    </span>
                                </div>
                                <div className="flex items-center mt-4 pl-6 space-x-2.5">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M6.912 3a3 3 0 0 0-2.868 2.118l-2.411 7.838a3 3 0 0 0-.133.882V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0 0 17.088 3H6.912Zm13.823 9.75-2.213-7.191A1.5 1.5 0 0 0 17.088 4.5H6.912a1.5 1.5 0 0 0-1.434 1.059L3.265 12.75H6.11a3 3 0 0 1 2.684 1.658l.256.513a1.5 1.5 0 0 0 1.342.829h3.218a1.5 1.5 0 0 0 1.342-.83l.256-.512a3 3 0 0 1 2.684-1.658h2.844Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-sm text-neutral-800">
                                        jaydondev@gmail.com
                                    </span>
                                </div>
                                <div className="flex items-center mt-4 pl-6 space-x-2.5">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-sm text-neutral-800">
                                        0919 616 224
                                    </span>
                                </div>
                                <div className="flex items-center mt-4 pl-6 space-x-2.5">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="size-6"
                                    >
                                        <path d="M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477ZM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0ZM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605ZM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477ZM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098ZM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816ZM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 1-3.746 2.504 18.63 18.63 0 0 0-2.37-6.49ZM12 2.276a17.152 17.152 0 0 1 2.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0 1 12 2.276ZM10.122 2.43a18.629 18.629 0 0 0-2.37 6.49 11.266 11.266 0 0 1-3.746-2.504 9.754 9.754 0 0 1 6.116-3.985Z" />
                                    </svg>
                                    <span className="text-sm text-neutral-800">
                                        jaydon.dev
                                    </span>
                                </div>
                            </div>

                            <div className="rounded-[16px] overflow-hidden relative border-b border mt-4 h-72"></div>
                        </div>
                        {/* About */}

                        {/* posts */}
                        <div className="mt-4 p-4">
                            <PostsOfUser userId={userId} />
                        </div>

                        {/* posts */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
