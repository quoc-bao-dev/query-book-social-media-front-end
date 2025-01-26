import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
    return <div className="flex-1 pr-4">{children}</div>;
};

export default Layout;
