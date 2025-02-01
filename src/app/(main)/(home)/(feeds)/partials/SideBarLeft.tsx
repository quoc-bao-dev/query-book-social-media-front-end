'use client';

import IdentifyIcon from '@/components/icons/IdentifyIcon';
import InfoIcon from '@/components/icons/InfoIcon';
import MessageIcon from '@/components/icons/MessageIcon';
import QuestionIcon from '@/components/icons/QuestionIcon';
import SafeIcon from '@/components/icons/SafeIcon';
import ServerIcon from '@/components/icons/ServerIcon';
import UserIcon from '@/components/icons/UserIcon';
import UsersIcon from '@/components/icons/UsersIcon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LeftSidebarItem from './LeftSidebarItem';

const SideBarLeft = () => {
    const [selected, setSelected] = useState('feeds');
    const pathname = usePathname();

    useEffect(() => {
        if (pathname === '/') {
            setSelected('feeds');
        } else if (pathname === '/me') {
            setSelected('profile');
        } else if (pathname === '/friends') {
            setSelected('friend');
        } else if (pathname === '/messages') {
            setSelected('message');
        } else if (pathname.startsWith('/hosting')) {
            setSelected('hosting');
        }
    }, [pathname]);
    return (
        <>
            <div className="flex flex-col gap-2">
                <Link href="/">
                    <LeftSidebarItem
                        icon={<IdentifyIcon />}
                        title="Feed"
                        selected={selected === 'feeds'}
                        onClick={() => setSelected('feeds')}
                    />
                </Link>
                <Link href="/me">
                    <LeftSidebarItem
                        icon={<UserIcon />}
                        title="Profile"
                        selected={selected === 'profile'}
                        onClick={() => setSelected('profile')}
                    />
                </Link>

                <Link href="/friends">
                    <LeftSidebarItem
                        icon={<UsersIcon />}
                        title="Friend"
                        selected={selected === 'friend'}
                        onClick={() => setSelected('friend')}
                    />
                </Link>
                <Link href="/messages">
                    <LeftSidebarItem
                        icon={<MessageIcon />}
                        title="Chat"
                        selected={selected === 'message'}
                        onClick={() => setSelected('message')}
                    />
                </Link>
                <Link href="/hosting">
                    <LeftSidebarItem
                        icon={<ServerIcon />}
                        title="Hosting"
                        selected={selected === 'hosting'}
                        onClick={() => setSelected('hosting')}
                    />
                </Link>
            </div>

            <div className="py-4">
                <hr className="" />
            </div>

            <div className="flex flex-col gap-2">
                <p className="font-semibold text-sm text-neutral-800/70 mb-2">
                    Resource
                </p>
                <LeftSidebarItem
                    icon={<InfoIcon />}
                    title="About Query Book"
                    selected={selected === 'about'}
                    onClick={() => setSelected('about')}
                />
                <LeftSidebarItem
                    icon={<SafeIcon />}
                    title="Privacy"
                    selected={selected === 'privacy'}
                    onClick={() => setSelected('privacy')}
                />
                <LeftSidebarItem
                    icon={<QuestionIcon />}
                    title="Support"
                    selected={selected === 'support'}
                    onClick={() => setSelected('support')}
                />
            </div>

            <div className="py-4 hidden lg:block">
                <hr className="" />
            </div>

            <div className="hidden lg:block">
                <p className="font-semibold text-sm text-neutral-800/70 mb-2">
                    Recomend for you
                </p>
                <div className="px-4">
                    <p className="text-secondary-500 hover:underline">#React</p>
                    <p className="text-secondary-500 hover:underline">
                        #Angular
                    </p>
                    <p className="text-secondary-500 hover:underline">#VueJS</p>
                </div>
            </div>
        </>
    );
};

export default SideBarLeft;
