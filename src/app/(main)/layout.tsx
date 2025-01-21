import Header from '@/components/Layout/Header';
import NavbarMobile from '@/components/Layout/NavbarMobile';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import UserProvider from '@/provider/UserProvider';
import { PropsWithChildren } from 'react';
import SideBarLeft from './partials/SideBarLeft';
import SidebarRight from './partials/SidebarRight';
import ModalCreatePost from './partials/ModalCreatePost';

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <UserProvider>
            <div className="min-h-screen relative">
                <div className="fixed w-full top-0 z-50">
                    <Header />
                </div>
                <div className="relative mx-auto pt-[calc(var(--header-height)+20px)] flex justify-center md:justify-between gap-4 z-40 px-4 ">
                    <div className="hidden md:block sticky top-[calc(var(--header-height)+20px)] w-[316px] h-[calc(100vh-var(--header-height)-40px)] p-4 rounded-lg border-gray-300 border bg-card">
                        <ScrollArea className="h-full">
                            <SideBarLeft />
                            <ScrollBar orientation="vertical" />
                        </ScrollArea>
                    </div>
                    <div className="max-w-[680px] flex flex-col gap-4">
                        {children}
                    </div>
                    <div className="hidden xl:block sticky top-[calc(var(--header-height)+20px)] w-[316px] h-[calc(100vh-var(--header-height)-40px)]">
                        <ScrollArea className="h-full">
                            <SidebarRight />
                            <ScrollBar orientation="vertical" />
                        </ScrollArea>
                    </div>
                </div>
                <NavbarMobile />
                <ModalCreatePost />
            </div>
        </UserProvider>
    );
};

export default Layout;
