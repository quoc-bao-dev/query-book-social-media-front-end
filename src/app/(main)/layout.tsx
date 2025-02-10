import Header from '@/components/Layout/Header';
import NavbarMobile from '@/components/Layout/NavbarMobile';
import UserProvider from '@/provider/UserProvider';
import { PropsWithChildren } from 'react';
import NotifyDrawer from '../../components/NotifyDrawer/NotifyDrawer';
import ImageDetailModal from './(home)/(feeds)/partials/ImageDetailModal';
import ModalCreatePost from './(home)/(feeds)/partials/ModalCreatePost';
import UserDrawer from './partials/UserDrawer';

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <UserProvider>
            <div className="min-h-screen relative">
                <div className="fixed w-full top-0 z-50">
                    <Header />
                </div>
                <div className="relative mx-auto pt-[calc(var(--header-height))] flex justify-center md:justify-between gap-4 max-w-[(100vdh)] z-40">
                    {children}
                </div>

                <NavbarMobile />
            </div>
            <ModalCreatePost />
            <NotifyDrawer />
            <UserDrawer />
            <ImageDetailModal />
        </UserProvider>
    );
};

export default Layout;
