import { cn } from '@/lib/utils';

type ProcessItemProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    selected?: boolean;
    isEnd?: boolean;
};
const ProcessItem = ({
    description,
    icon,
    selected,
    title,
    isEnd,
}: ProcessItemProps) => {
    return (
        <>
            <div className="flex gap-3">
                <div
                    className={cn(
                        'w-[40px] h-[40px] aspect-square border border-gray-500 rounded-lg flex items-center justify-center text-gray-600',
                        {
                            'bg-card': selected,
                            'text-gray-950': selected,
                        }
                    )}
                >
                    {icon}
                </div>
                <div className="">
                    <h2
                        className={cn('font-semibold text-gray-600', {
                            'text-gray-900': selected,
                        })}
                    >
                        {title}
                    </h2>
                    <p
                        className={cn('text-sm text-gray-500', {
                            'text-gray-600': selected,
                        })}
                    >
                        {description}
                    </p>
                </div>
            </div>
            {!isEnd && (
                <div className="w-[1px] h-[44px] ml-[20px] -mt-[4px] bg-gray-400"></div>
            )}
        </>
    );
};

export default ProcessItem;
