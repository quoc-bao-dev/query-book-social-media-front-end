'use client';

import { useNotifyDrawer } from '@/components/NotifyDrawer/NotifyDrawer';
import Image from 'next/image';
import Bar3 from '../icons/Bar3';
import Bell from '../icons/Bell';
import ChatBubbleOvalLeftEllipsis from '../icons/ChatBubbleOvalLeftEllipsis';
import Cog6Tooth from '../icons/Cog6Tooth';
import Avatar from './Avatar';
import LocaleSwitcher from './LocaleSwitcher';
import NavMenu from './NavMenu';
import SearchHeader from './SearchHeader';
import { useUserDrawer } from '@/app/(main)/partials/UserDrawer';
import Link from 'next/link';

const Header = () => {
    const { open: openNotifyDrawer } = useNotifyDrawer();
    const { open: openUserDrawer } = useUserDrawer();

    return (
        <>
            <header className="flex items-center bg-card border-b border-gray-500/40 fixed top-0 left-0 w-full z-50 h-[var(--header-height)]">
                <div className="w-full mx-auto px-4 flex justify-between items-center relative">
                    {/* logo & search */}
                    <div className="flex gap-6 items-center">
                        <Link href="/">
                            <Image
                                src={'/images/logo_QBook.png'}
                                alt="logo-qbook"
                                className="w-[120px]"
                                width={200}
                                height={0}
                            />
                        </Link>
                        <SearchHeader />
                    </div>
                    {/* logo & search */}

                    {/* Nav */}

                    <div className="absolute left-[50%] translate-x-[-50%] hidden lg:block">
                        <NavMenu />
                    </div>
                    {/* Nav */}

                    {/* action buttons */}
                    <div className="flex gap-6 items-center justify-center z-50">
                        <div className="hidden md:block p-2 rounded-full hover:bg-gray-200 transition-all duration-200">
                            <Cog6Tooth className="size-6 text-primary-500" />
                        </div>

                        <div className="hidden md:block z-50">
                            <LocaleSwitcher />
                        </div>
                        <div className="hidden md:block p-2 rounded-full hover:bg-gray-200 transition-all duration-200">
                            <ChatBubbleOvalLeftEllipsis className="size-6 text-primary-500" />
                        </div>

                        <div
                            className="hidden md:block p-2 rounded-full hover:bg-gray-200 transition-all duration-200"
                            onClick={openNotifyDrawer}
                        >
                            <Bell className="size-6 text-primary-500" />
                        </div>

                        <div
                            className="hidden lg:block"
                            onClick={openUserDrawer}
                        >
                            <Avatar />
                        </div>

                        <div className="block md:hidden p-2 rounded-full hover:bg-gray-200 transition-all duration-200">
                            <Bar3 className="size-6 text-primary-500" />
                        </div>
                    </div>
                    {/* action buttons */}
                </div>
            </header>
        </>
    );
};

export default Header;
