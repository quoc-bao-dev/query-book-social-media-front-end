'use client';

import CopyIcon from '@/components/icons/CopyIcon';
import RemoveIcon from '@/components/icons/RemoveIcon';
import UploadIcon from '@/components/icons/UploadIcon';
import WebIcon from '@/components/icons/WebIcon';
import {
    useDeleteHostingMutation,
    useUploadHostingMutation,
} from '@/queries/hosting';
import { swal } from '@/utils/swal';

type HostingCardProps = {
    subDomain: string;
    url: string;
};

const HostingCard = ({ subDomain, url }: HostingCardProps) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(url).then(() => {
            swal.fire({
                icon: 'success',
                title: 'Copied',
                text: `${url} copied to clipboard`,
                showConfirmButton: false,
                timer: 1500,
            });
        });
    };

    const { mutateAsync } = useUploadHostingMutation();
    const { mutateAsync: deleteMutate } = useDeleteHostingMutation();

    const handleUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.click();
        input.onchange = async () => {
            const file = input.files?.[0];
            if (file) {
                await mutateAsync({ subDomain, file });
            }
        };
    };

    const handleDelete = () => {
        deleteMutate(subDomain);
    };
    return (
        <div className="bg-card p-16 h-full rounded-lg">
            <div className="flex flex-col gap-2 justify-center items-center">
                <WebIcon className="size-[76px] pb-3 text-neutral-600" />
                <h2 className="font-semibold text-neutral-600">{subDomain} </h2>
                <div className="flex gap-2">
                    <button
                        onClick={handleUpload}
                        className="p-2 rounded-lg flex flex-col gap-1 justify-center items-center bg-warning-500 text-white"
                    >
                        <UploadIcon />
                    </button>
                    <button
                        onClick={handleCopy}
                        className="p-2 rounded-lg flex flex-col gap-1 justify-center items-center bg-success-500 text-white"
                    >
                        <CopyIcon />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-2 rounded-lg flex flex-col gap-1 justify-center items-center bg-error-500 text-white"
                    >
                        <RemoveIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HostingCard;
