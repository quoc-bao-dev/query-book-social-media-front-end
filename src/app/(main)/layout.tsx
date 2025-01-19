import Header from '@/components/Layout/Header';
import NavbarMobile from '@/components/Layout/NavbarMobile';
import { PropsWithChildren } from 'react';
import SideBarLeft from './partials/SideBarLeft';
import SidebarRight from './partials/SidebarRight';

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className="min-h-screen relative">
            <div className="fixed w-full top-0 z-50">
                <Header />
            </div>
            <div className="relative mx-auto pt-[calc(var(--header-height)+20px)] flex justify-between gap-4 z-40 px-4 ">
                <div className="hidden md:block sticky top-[calc(var(--header-height)+20px)] w-[316px] h-[calc(100vh-var(--header-height)-40px)]  overflow-y-scroll scrollbar-custom p-4 rounded-lg border-gray-300 border bg-card">
                    <SideBarLeft />
                </div>
                <div className="w-[680px]  flex flex-col gap-4">{children}</div>
                <div className="hidden lg:block sticky top-[calc(var(--header-height)+20px)] w-[316px] h-[calc(100vh-var(--header-height)-40px)]  overflow-y-scroll scrollbar-custom">
                    <SidebarRight />
                </div>
            </div>
            <NavbarMobile />
        </div>
    );
};

export default Layout;
