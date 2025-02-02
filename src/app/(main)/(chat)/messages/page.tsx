import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Phone } from 'lucide-react';

export const metadata = {
    title: 'Messages',
    description: 'Welcome to Query Book!',
};

const Page = () => {
    return (
        <div className="flex relative w-full">
            {/* sidebar */}
            <div className="w-[350px] h-[calc(100vh-var(--header-height))] sticky top-0 bg-card flex flex-col">
                <h1 className="text-xl font-semibold text-neutral-800 px-4 pt-4">
                    Messages
                </h1>
                <div className="px-4 pt-2">
                    <div className="w-full">
                        <input
                            type="text"
                            className="w-full border border-gray-300 px-4 py-2 rounded-full"
                            placeholder="Search messages"
                        />
                    </div>
                </div>

                {/* user rows */}
                <div className=" pt-2 flex flex-col gap-2 flex-1">
                    {/* user row */}
                    <div className="px-4 py-2 flex gap-2 hover:bg-gray-200/40">
                        <Avatar className="h-[48px] w-[48px]">
                            <AvatarImage src="" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h3 className="font-semibold text-neutral-800">
                                User name
                            </h3>
                            <p className="text-sm text-neutral-600/70">
                                last message
                            </p>
                        </div>
                    </div>
                    {/* user row */}
                    {/* user row */}
                    <div className="px-4 py-2 flex gap-2 hover:bg-gray-200/40">
                        <Avatar className="h-[48px] w-[48px]">
                            <AvatarImage src="" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h3 className="font-semibold text-neutral-800">
                                User name
                            </h3>
                            <p className="text-sm text-neutral-600/70">
                                last message
                            </p>
                        </div>
                    </div>
                    {/* user row */}
                </div>
                {/* user rows */}
            </div>
            {/* sidebar */}

            {/* main */}
            <div className="flex-1 h-[calc(100vh-var(--header-height))]">
                {/* header */}
                <div className="h-[64px] px-4 border-b border-gray-300 flex justify-between items-center">
                    {/* info */}
                    <div className="flex gap-2">
                        <Avatar className="h-[48px] w-[48px]">
                            <AvatarImage src="" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h3 className="font-semibold text-neutral-800">
                                User name
                            </h3>
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <p className="text-sm text-neutral-600/70">
                                    Online
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* info */}

                    {/* button */}
                    <div className="flex gap-2 items-center text-primary-500">
                        <Phone className="w-6 h-6 " />
                    </div>
                    {/* button */}
                </div>
                {/* header */}

                {/* body */}
                <div className="flex-1 max-h-full bg-gray-200 ">
                    <ScrollArea className="h-[calc(100vh-var(--header-height)-64px-60px)] px-4">
                        <div className="flex flex-col gap-3 py-3">
                            {/* message left*/}
                            <div className="flex gap-2 max-w-[450px]">
                                <Avatar className="h-[48px] w-[48px]">
                                    <AvatarImage src="" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 flex flex-col gap-1">
                                    <p className="text-primary-foreground p-4 bg-primary-500 rounded-lg ">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Perferendis ad nisi
                                        voluptates voluptate officia debitis
                                        facere assumenda labore, illum mollitia
                                        illo. Minus, tempore? Quod voluptatum
                                        enim consectetur harum esse explicabo.
                                    </p>
                                    <p className="text-primary-foreground p-4 bg-primary-500 rounded-lg ">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Perferendis ad nisi
                                        voluptates voluptate officia debitis
                                        facere assumenda labore, illum mollitia
                                        illo. Minus, tempore? Quod voluptatum
                                        enim consectetur harum esse explicabo.
                                    </p>
                                </div>
                            </div>
                            {/* message left*/}

                            {/* message right*/}
                            <div className="flex w-full">
                                <div className="ml-auto flex gap-2 max-w-[450px]">
                                    <div className="flex-1 flex flex-col gap-1">
                                        <p className="text-neutral-800 p-4 bg-neutral-200/40 rounded-lg ">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit.
                                            Perferendis ad nisi voluptates
                                            voluptate officia debitis facere
                                            assumenda labore, illum mollitia
                                            illo. Minus, tempore? Quod
                                            voluptatum enim consectetur harum
                                            esse explicabo.
                                        </p>
                                    </div>
                                    <Avatar className="h-[48px] w-[48px]">
                                        <AvatarImage src="" />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>
                            {/* message right*/}

                            {/* message right*/}
                            <div className="flex w-full">
                                <div className="ml-auto flex gap-2 max-w-[450px]">
                                    <div className="flex-1 flex flex-col gap-1">
                                        <p className="text-neutral-800 p-4 bg-neutral-200/40 rounded-lg ">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit.
                                            Perferendis ad nisi voluptates
                                            voluptate officia debitis facere
                                            assumenda labore, illum mollitia
                                            illo. Minus, tempore? Quod
                                            voluptatum enim consectetur harum
                                            esse explicabo.
                                        </p>
                                    </div>
                                    <Avatar className="h-[48px] w-[48px]">
                                        <AvatarImage src="" />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>
                            {/* message right*/}
                        </div>
                        <ScrollBar orientation="vertical" />
                    </ScrollArea>
                </div>
                {/* body */}

                {/* input */}
                <div className="px-4 h-[60px] flex items-center border-t border-gray-300">
                    <input
                        type="text"
                        className="w-full border border-gray-300 px-4 py-2 rounded-full"
                        placeholder="Type your message"
                    />
                </div>
                {/* input */}
            </div>
            {/* main */}

            {/* sidebar */}
            <div className="w-[350px] h-[calc(100vh-var(--header-height))] sticky top-0 bg-card">
                <div className="pt-16 w-fit mx-auto">
                    <Avatar className="size-[130px]">
                        <AvatarImage src="" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold pt-2 text-neutral-800 text-center">
                        User Name
                    </h2>
                    <p className="text-sm text-neutral-600/70 text-center">
                        Online
                    </p>
                    <div className="pt-3 flex justify-center">
                        <button className="px-4 py-1 font-semibold rounded-full bg-info-100/80 hover:bg-info-100 text-info-500 text-sm">
                            View Profile
                        </button>
                    </div>
                </div>
            </div>
            {/* sidebar */}
        </div>
    );
};

export default Page;
