import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import SideBarLeft from './partials/SideBarLeft';
import { PropsWithChildren } from 'react';
import SidebarRight from './partials/SidebarRight';

const layout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <div className="hidden md:block sticky top-[calc(var(--header-height))] w-[316px] h-[calc(100vh-var(--header-height))] bg-card">
                <ScrollArea className="h-full">
                    <div className="p-4">
                        <SideBarLeft />
                    </div>
                    <ScrollBar orientation="vertical" />
                </ScrollArea>
            </div>
            <div className="lg:max-w-[680px] flex flex-col gap-4 mt-5 px-4">
                {children}
            </div>
            <div className="hidden xl:block sticky top-[calc(var(--header-height))] w-[316px] h-[calc(100vh-var(--header-height))]">
                <ScrollArea className="h-full">
                    <div className="p-4">
                        <SidebarRight />
                    </div>
                    <ScrollBar orientation="vertical" />
                </ScrollArea>
            </div>
        </>
    );
};

export default layout;
