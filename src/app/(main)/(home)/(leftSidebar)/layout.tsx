import { PropsWithChildren } from 'react';
import ModalCreateHosting from './hosting/partials/ModalCreateHosting';

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className="flex-1 pr-4">
            {children}
            <ModalCreateHosting />
        </div>
    );
};

export default Layout;
