'use client';

import SidebarRow from '@/components/common/SidebarRow';
import ArrowStartLeftIcon from '@/components/icons/ArrowStartLeftIcon';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';
import Cog6Tooth from '@/components/icons/Cog6Tooth';
import LockIcon from '@/components/icons/LockIcon';
import QuestionIcon from '@/components/icons/QuestionIcon';
import UserIcon from '@/components/icons/UserIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/store/authSignal';
import { media } from '@/utils/mediaUtils';
import { useState } from 'react';
import { signify } from 'react-signify';
import Drawer from '@/components/common/Drawer';
import { useLogout } from '@/hooks/useLogout';

type UserDrawer = {
    isShow: boolean;
};
export const sUserDrawer = signify<UserDrawer>({ isShow: false });

export const useUserDrawer = () => ({
    open: () => sUserDrawer.set((n) => (n.value.isShow = true)),
    close: () => sUserDrawer.set((n) => (n.value.isShow = false)),
});

const UserDrawer = () => {
    const [selected, setSelected] = useState('');
    const { user } = useAuth();
    const { isShow } = sUserDrawer.use();
    const { close } = useUserDrawer();
    const logout = useLogout();

    return (
        <Drawer isOpen={isShow} onOpenChange={close}>
            <div className="w-[320px] h-screen z-50 bg-card">
                <div className="px-3 py-6 h-full flex flex-col">
                    <div
                        className="p-3 w-fit inline rounded-full hover:bg-gray-200 cursor-pointer"
                        onClick={close}
                    >
                        <ChevronRightIcon />
                    </div>
                    <div className="py-[36px] flex justify-center">
                        <div className="w-[100px] aspect-square">
                            <Avatar className="w-full h-full object-cover">
                                <AvatarImage
                                    src={media.toImage(user?.avatar)}
                                />
                                <AvatarFallback>QB</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                    <div className="px-3">
                        <h2 className="font-bold text-xl text-center">
                            {user?.fullName}
                        </h2>
                        <p className="text-neutral-900/70 text-center text-sm">
                            {user?.email}
                        </p>
                    </div>
                    <hr className="bg-gray-300 my-6" />
                    <div className="flex-1 px-3 pt-3  flex flex-col gap-2">
                        <SidebarRow
                            icon={<UserIcon />}
                            title="Profile"
                            selected={selected === 'profile'}
                            onClick={() => {
                                setSelected('profile');
                            }}
                        />

                        <SidebarRow
                            icon={<Cog6Tooth />}
                            title="Setting"
                            selected={selected === 'setting'}
                            onClick={() => {
                                setSelected('setting');
                            }}
                        />

                        <SidebarRow
                            icon={<LockIcon />}
                            title="Privacy"
                            selected={selected === 'privacy'}
                            onClick={() => {
                                setSelected('privacy');
                            }}
                        />

                        <SidebarRow
                            icon={<QuestionIcon />}
                            title="Support"
                            selected={selected === 'support'}
                            onClick={() => {
                                setSelected('support');
                            }}
                        />
                        <div className="mt-auto">
                            <button
                                className="w-full p-5 py-3  flex gap-5 font-semibold text-error-600 bg-error-100/70  hover:bg-error-100 rounded-lg"
                                onClick={logout}
                            >
                                <ArrowStartLeftIcon />
                                <p>Logout</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    );
};

export default UserDrawer;
