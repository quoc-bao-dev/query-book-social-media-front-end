import { Button } from '@/components/common/Button';
import Image from 'next/image';
import { Fragment } from 'react';

const user = [
    { images: 'git.png' },
    { images: 'facebook.png' },
    { images: 'google.png' },
];
const SidebarRight = () => {
    return (
        <>
            {/* Follow */}
            <div className="">
                <div className="pb-1 font-semibold">
                    <p>Follow</p>
                </div>
                {user.map((_user, index) => (
                    <Fragment key={index}>
                        <div className="flex items-center gap w-full border rounded-xl px-4 py-4 my-2 bg-card">
                            <div className="">
                                <Image
                                    src={`/images/${_user.images}`}
                                    alt=""
                                    className="w-[40px] h-[40px] bg-slate-300 rounded-[50%]"
                                    width={1000}
                                    height={0}
                                />
                            </div>
                            <div className="pl-3 w-[60%]">
                                <p className="">Name</p>
                                <p className="text-gray-700 text-[12px]">
                                    Developer
                                </p>
                            </div>
                            <div className="">
                                <Button>Follow</Button>
                            </div>
                        </div>
                    </Fragment>
                ))}
            </div>
            {/* Follow */}

            {/* Jobs */}
            <div className="pt-6">
                <div className="pb-1 font-semibold">
                    <p>Jobs</p>
                </div>
                {user.map((_user, index) => (
                    <Fragment key={index}>
                        <div className="flex items-center gap w-full border rounded-xl px-4 py-4 my-2 bg-card">
                            <div className="">
                                <Image
                                    src={`/images/${_user.images}`}
                                    alt=""
                                    className="w-[40px] h-[40px] bg-slate-300 rounded-[50%]"
                                    width={1000}
                                    height={0}
                                />
                            </div>
                            <div className="pl-3 w-[60%]">
                                <p className="">QS Group</p>
                                <div className="flex items-center ">
                                    <div className="">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="size-4"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                                                clipRule="evenodd"
                                            />
                                            <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-700 text-[12px] px-1">
                                        Senior React Developer
                                    </p>
                                </div>
                            </div>
                            <div className="">
                                <Button>Apply</Button>
                            </div>
                        </div>
                    </Fragment>
                ))}
            </div>
            {/* Jobs */}
        </>
    );
};

export default SidebarRight;
