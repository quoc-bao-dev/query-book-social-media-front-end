import Header from '@/components/Layout/Header';
import NavbarMobile from '@/components/Layout/NavbarMobile';
import UserProvider from '@/provider/UserProvider';
import { PropsWithChildren } from 'react';
import ModalCreatePost from './partials/ModalCreatePost';

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <UserProvider>
            <div className="min-h-screen relative">
                <div className="fixed w-full top-0 z-50">
                    <Header />
                </div>
                <div className="relative mx-auto pt-[calc(var(--header-height))] flex justify-center md:justify-between gap-4 z-40">
                    {children}
                </div>

                <NavbarMobile />
                <ModalCreatePost />
            </div>
        </UserProvider>
    );
};

export default Layout;
