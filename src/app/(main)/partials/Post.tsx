import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PostResponse } from '@/types/post';
import toImage from '@/utils/imageUtils';
import Image from 'next/image';

// FIXME: fix interface of post

interface PostProps {
    post: Pick<PostResponse, 'id' | 'author' | 'content' | 'hashTags'>;
}
const Post = ({ post }: PostProps) => {
    return (
        <div className="w-full gap-5 border rounded-xl px-4 py-4 bg-card">
            <div className="px-8 pt-8 pb-4">
                <div className="flex justify-between">
                    <div className="">
                        <Avatar>
                            <AvatarImage src={toImage(post.author.avatar)} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="text-left w-full px-4">
                        <div className="">Name</div>
                        <div className="text-gray-600">07 Sep 2024</div>
                    </div>

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
                                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                            />
                        </svg>
                    </div>
                </div>

                <div className="pt-4">
                    <p>Hãy trao cho anh!</p>
                </div>
            </div>

            <div className="relative">
                <div className="absolute inset-0 overflow-hidden rounded-md">
                    <Image
                        src={`/images/${post.images}`}
                        className="rounded-md text-center w-full h-full backdrop:blur-lg blur-lg object-cover"
                        alt=""
                        width={650}
                        height={0}
                    />
                </div>
                <div className="relative z-40">
                    <Image
                        src={`/images/${post.images}`}
                        className="rounded-md text-center max-h-[600px] object-contain"
                        alt=""
                        width={650}
                        height={0}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2">
                <div className="flex px-8 py-4 items-center">
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
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                        </svg>
                    </div>
                    <div className="px-2">20</div>
                    <div className="w-full">
                        <div className="flex items-center ">
                            <Image
                                src={'/images/post.jpg'}
                                className="w-[40px] h-[40px] rounded-[50%]"
                                alt=""
                                width={40}
                                height={40}
                            />
                            <Image
                                src={'/images/post.jpg'}
                                className="w-[40px] h-[40px] rounded-[50%]"
                                alt=""
                                width={40}
                                height={40}
                            />
                            <Image
                                src={'/images/post.jpg'}
                                className="w-[40px] h-[40px] rounded-[50%]"
                                alt=""
                                width={40}
                                height={40}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end px-8 py-4 gap-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                            clipRule="evenodd"
                        />
                    </svg>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>
            {/* comment */}
            <div className="flex py-3">
                <div className="flex justify-center">
                    <Image
                        src={'/images/git.png'}
                        className="w-[40px] h-[40px] rounded-[50%]"
                        alt=""
                        width={40}
                        height={40}
                    />
                </div>
                <div className="bg-gray-200 rounded-lg ml-3 py-2 px-3 w-[90%]">
                    <div className="">
                        <p className="font-medium ">Name</p>
                    </div>
                    <div className="text-gray-900"> Ảnh đẹp lắm nha</div>
                </div>
            </div>

            <div className="flex py-3">
                <div className="flex justify-center">
                    <Image
                        src={'/images/git.png'}
                        className="w-[40px] h-[40px] rounded-[50%]"
                        alt=""
                        width={40}
                        height={40}
                    />
                </div>
                <div className="bg-gray-200 rounded-lg ml-3 py-2 px-3 w-[90%]">
                    <div className="">
                        <p className="font-medium ">Name</p>
                    </div>
                    <div className="text-gray-900">
                        {' '}
                        Ảnh này chụp ở đâu vậy bạn
                    </div>
                </div>
            </div>

            <div className="flex py-3">
                <div className="flex justify-center">
                    <Image
                        src={'/images/google.png'}
                        className="w-[40px] h-[40px] rounded-[50%]"
                        alt=""
                        width={40}
                        height={40}
                    />
                </div>
                <div className="ml-3 w-[90%] ">
                    <input
                        type="text"
                        className="w-full h-[40px] px-2 rounded-lg focus:border-info-500 focus:outline-none focus:ring-1 focus:ring-info-500"
                        placeholder="Write a comment"
                    />
                </div>
            </div>
            {/* comment */}
        </div>
    );
};

export default Post;
