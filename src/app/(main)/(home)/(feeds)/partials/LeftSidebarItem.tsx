import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type SideBarProps = {
    selected?: boolean;
    title: string;
    icon: ReactNode;
    onClick: () => void;
};
const LeftSidebarItem = ({ onClick, selected, title, icon }: SideBarProps) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                'flex justify-center lg:justify-start w-full h-[48px] gap-3 lg:pl-2 items-center rounded-md duration-200 hover:bg-primary-100/70  hover:text-primary-500 group text-neutral-700/70 cursor-pointer',
                {
                    'bg-primary-100  text-primary-500': selected,
                }
            )}
        >
            <div>{icon}</div>
            <p className="hidden lg:block font-semibold text-base">{title}</p>
        </div>
    );
};

export default LeftSidebarItem;
