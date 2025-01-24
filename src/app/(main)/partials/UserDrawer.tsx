'use client';

import { Button } from '@/components/common/Button';
import Drawer from '@/components/common/Drawer';
import Cog6Tooth from '@/components/icons/Cog6Tooth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useState } from 'react';

const UserDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <Button onClick={toggleDrawer}>Toggle</Button>
            <Drawer isOpen={isOpen} onOpenChange={toggleDrawer}>
                <div className="w-[400px] h-screen flex flex-col bg-card right-0 top-0 z-50 shadow-5">
                    <div className="px-3 py-6 flex justify-between items-center">
                        <p className="font-semibold text-neutral-900">
                            Notification
                        </p>
                        <Cog6Tooth className="font-semibold text-neutral-900" />
                    </div>

                    {/* number */}
                    <div className="px-3 py-2 bg-gray-300">
                        <div className="grid grid-cols-3 gap-2">
                            {/* item */}
                            <div className="px-3 py-2 rounded-sm bg-card flex items-center justify-between text-neutral-900/70">
                                <p className="text-sm font-semibold">All</p>
                                <div className="py-1 px-2 rounded-sm text-xs font-semibold text-gray-50 bg-neutral-900/70">
                                    22
                                </div>
                            </div>
                            {/* item */}

                            {/* item */}
                            <div className="px-3 py-2 rounded-sm bg-card flex items-center justify-between text-neutral-900/70">
                                <p className="text-sm font-semibold">All</p>
                                <div className="py-1 px-2 rounded-sm text-xs font-semibold text-gray-50 bg-neutral-900/70">
                                    22
                                </div>
                            </div>
                            {/* item */}

                            {/* item */}
                            <div className="px-3 py-2 rounded-sm bg-card flex items-center justify-between text-neutral-900/70">
                                <p className="text-sm font-semibold">All</p>
                                <div className="py-1 px-2 rounded-sm text-xs font-semibold text-gray-50 bg-neutral-900/70">
                                    22
                                </div>
                            </div>
                            {/* item */}
                        </div>
                    </div>
                    {/* number */}

                    <ScrollArea className="flex-1 pt-4 ">
                        <div className="flex flex-col gap-3">
                            {/* row */}
                            <div className="py-4 px-3 flex gap-4 border-b border-gray-200">
                                <div className="">
                                    <Avatar>
                                        <AvatarImage src="/images/that.png" />
                                        <AvatarFallback>QB</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="">
                                    <p className="">
                                        <span className="font-semibold">
                                            Quoc Bao
                                        </span>
                                        has sent a friend request
                                    </p>
                                    <p className="text-neutral-900/30">1h</p>
                                    <div className="pt-2 flex gap-3 ">
                                        <Button size="sm" className="px-5">
                                            Accept
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="px-5 bg-primary-100/70"
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            {/* row */}

                            {/* row */}
                            <div className="py-4 px-3 flex gap-4 border-b border-gray-200">
                                <div className="">
                                    <Avatar>
                                        <AvatarImage src="/images/that.png" />
                                        <AvatarFallback>QB</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="">
                                    <p className="">
                                        <span className="font-semibold">
                                            Quoc Bao
                                        </span>
                                        has sent a friend request
                                    </p>
                                    <p className="text-neutral-900/30">1h</p>
                                    <div className="pt-2 flex gap-3 ">
                                        <Button size="sm" className="px-5">
                                            Accept
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="px-5 bg-primary-100/70"
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            {/* row */}
                        </div>
                        <ScrollBar orientation="vertical" />
                    </ScrollArea>

                    <div className="px-3 py-6">
                        <Button className="w-full bg-neutral-900 hover:bg-neutral-700">
                            See all
                        </Button>
                    </div>
                </div>
            </Drawer>
        </>
    );
};

export default UserDrawer;
