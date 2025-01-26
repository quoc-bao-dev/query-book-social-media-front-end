import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
    return <div className="mx-auto w-fit mt-5">{children}</div>;
};

export default Layout;
