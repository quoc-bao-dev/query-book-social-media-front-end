import { PropsWithChildren } from 'react';
import CoverPage from './partials/CoverPage';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='mx-auto md:w-[1024px]'>
      <div className='min-h-screen'>
        {/* main contain */}
        <div className=''>
          {/* cover page */}
          <CoverPage />
          {/* cover page */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
