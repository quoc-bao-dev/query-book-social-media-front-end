import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { PropsWithChildren } from 'react';
import SidebarRight from './partials/SidebarRight';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className='lg:max-w-[680px] w-full flex flex-col gap-4 mt-5 px-4'>
        {children}
      </div>
      <div className='hidden xl:block sticky top-[calc(var(--header-height))] w-[316px] h-[calc(100vh-var(--header-height))]'>
        <ScrollArea className='h-full'>
          <div className='p-4'>
            <SidebarRight />
          </div>
          <ScrollBar orientation='vertical' />
        </ScrollArea>
      </div>
    </>
  );
};

export default Layout;
