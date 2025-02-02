import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
    return <div className="mx-auto max-[1028px] mt-3">{children}</div>;
};

export default Layout;
