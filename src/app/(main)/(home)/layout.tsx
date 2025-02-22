import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { PropsWithChildren } from 'react';
import SideBarLeft from './(feeds)/partials/SideBarLeft';
import UpgradeAccount from './(feeds)/partials/UpgradeAccount';

const layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className='hidden md:flex flex-col sticky top-[calc(var(--header-height))] w-[316px] h-[calc(100vh-var(--header-height))] bg-card'>
        <ScrollArea className='h-full'>
          <div className='p-4'>
            <SideBarLeft />
          </div>
          <ScrollBar orientation='vertical' />
        </ScrollArea>
        <div className='mt-auto'>
          <div className='p-4'>
            <UpgradeAccount />
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default layout;
