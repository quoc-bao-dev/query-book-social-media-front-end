import Header from '@/components/Layout/Header';
import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className="min-h-screen relative">
            <div className="fixed w-full top-0 z-50">
                <Header />
            </div>
            <div className="relative mx-auto pt-[calc(var(--header-height)+20px)] flex justify-between z-40 px-4 ">
                <div className="sticky top-[calc(var(--header-height)+20px)] w-[316px] h-[calc(100vh-var(--header-height)-40px)]  overflow-y-scroll p-4 rounded-lg border-gray-300 border bg-card">
                    <div className="flex flex-col gap-6">
                        {[
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            11,
                            ,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                        ].map((i, index) => (
                            <div
                                key={index}
                                className="h-[50px] flex items-center hover:bg-primary-100/70 hover:text-primary-500 px-4"
                            >
                                Lorem ipsum dolor sit amet.
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-[680px] bg-red-500 flex flex-col gap-4">
                    <div className="h-[500px] bg-green-300"></div>
                    <div className="h-[500px] bg-green-300"></div>
                    <div className="h-[500px] bg-green-300"></div>
                    <div className="h-[500px] bg-green-300"></div>
                    <div className="h-[500px] bg-green-300"></div>
                    <div className="h-[500px] bg-green-300"></div>
                </div>
                <div className="sticky top-[calc(var(--header-height)+20px)] w-[316px] h-[calc(100vh-var(--header-height)-40px)]  overflow-y-scroll p-4 rounded-lg border-gray-300 border bg-card">
                    <div className="flex flex-col gap-6">
                        {[
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            11,
                            ,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                        ].map((i, index) => (
                            <div
                                key={index}
                                className="h-[50px] flex items-center hover:bg-primary-100/70 hover:text-primary-500 px-4"
                            >
                                Lorem ipsum dolor sit amet.
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
