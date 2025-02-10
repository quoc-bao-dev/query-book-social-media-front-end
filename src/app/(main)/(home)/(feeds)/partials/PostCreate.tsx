'use client';

import { Button } from '@/components/common/Button';
import { sModalCreatePost } from './ModalCreatePost';

const PostCreate = () => {
    const showModal = () => {
        sModalCreatePost.set((n) => (n.value.isOpen = true));
    };
    return (
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
                        <Button className="w-24" onClick={showModal}>
                            Post
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCreate;
