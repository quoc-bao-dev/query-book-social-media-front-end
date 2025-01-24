'use client';

import IdentifyIcon from '@/components/icons/IdentifyIcon';
import MessageIcon from '@/components/icons/MessageIcon';
import UserIcon from '@/components/icons/UserIcon';
import UsersIcon from '@/components/icons/UsersIcon';
import { useState } from 'react';
import LeftSidebarItem from './LeftSidebarItem';
import InfoIcon from '@/components/icons/InfoIcon';
import LockIcon from '@/components/icons/LockIcon';
import QuestionIcon from '@/components/icons/QuestionIcon';

const SideBarLeft = () => {
    const [selected, setSelected] = useState('feeds');
    return (
        <>
            <div className="flex flex-col gap-2">
                <LeftSidebarItem
                    icon={<UserIcon />}
                    title="Profile"
                    selected={selected === 'profile'}
                    onClick={() => setSelected('profile')}
                />
                <LeftSidebarItem
                    icon={<IdentifyIcon />}
                    title="Feed"
                    selected={selected === 'feeds'}
                    onClick={() => setSelected('feeds')}
                />
                <LeftSidebarItem
                    icon={<UsersIcon />}
                    title="Friend"
                    selected={selected === 'friend'}
                    onClick={() => setSelected('friend')}
                />
                <LeftSidebarItem
                    icon={<MessageIcon />}
                    title="Chat"
                    selected={selected === 'message'}
                    onClick={() => setSelected('message')}
                />
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
                    icon={<LockIcon />}
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
