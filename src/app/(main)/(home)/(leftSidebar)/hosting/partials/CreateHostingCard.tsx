import PlusIcon from '@/components/icons/PlusIcon';
import { useModalCreateHosting } from './ModalCreateHosting';

type CreateHostingCardProps = {
    isPro: boolean;
};
const CreateHostingCard = ({ isPro }: CreateHostingCardProps) => {
    const { open } = useModalCreateHosting();
    return (
        <div className="relative bg-card p-16 h-full rounded-lg" onClick={open}>
            <div className="absolute top-4 right-4">
                {isPro ? (
                    <div className="w-4 h-4 bg-success-500 rounded-full"></div>
                ) : (
                    <div className="w-4 h-4 bg-error-500 rounded-full"></div>
                )}
            </div>
            <div className="h-full flex flex-col  justify-center items-center text-neutral-600">
                <PlusIcon className="size-[76px]" />
                <p className="font-semibold text-center">Create hosting</p>
            </div>
        </div>
    );
};

export default CreateHostingCard;
