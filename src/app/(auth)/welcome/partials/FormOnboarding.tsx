'use client';

import { Button } from '@/components/common/Button';
import UploadIcon from '@/components/icons/UploadIcon';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useAuth } from '@/store/authSignal';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { formUserOnboarding } from '../schema/formUserOnboarding';
import FollowItem from './FollowItem';

const FormOnboarding = ({ step = 1 }: { step: number }) => {
    const [avatar, setAvatar] = useState<File>();

    const { user } = useAuth();

    const router = useRouter();

    const {
        register,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formUserOnboarding),
    });

    const nextStep = () => {
        if (step === 1) {
            router.push('/welcome?step=2');
        }
        if (step === 2) {
            router.push('/welcome?step=3');
        }
        if (step === 3) {
            router.push('/welcome?step=4');
        }
    };
    const prevStep = () => {
        if (step === 2) {
            router.push('/welcome?step=1');
        }
        if (step === 3) {
            router.push('/welcome?step=2');
        }
        if (step === 4) {
            router.push('/welcome?step=3');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatar(file);
        }
    };

    const handleFollow = (id: string) => {
        console.log(id);
        console.log(user?.id);
    };
    const FormStep1 = () => (
        <form className="flex flex-col gap-3">
            <h2 className="text-base text-gray-700">Enter your name</h2>
            <Input {...register('firstName')} placeholder="First Name" />
            {errors.firstName && (
                <p className="text-xs text-red-500">
                    {errors.firstName.message as string}
                </p>
            )}
            <Input {...register('lastName')} placeholder="Last Name" />
            {errors.lastName && (
                <p className="text-xs text-red-500">
                    {errors.lastName.message as string}
                </p>
            )}
        </form>
    );
    const FormStep2 = () => (
        <form className="flex flex-col gap-3">
            <h2 className="text-base text-gray-700">Upload your avatar</h2>
            <label htmlFor="avatar">
                {!avatar && (
                    <div className="w-full aspect-square rounded-lg bg-gray-300 border border-gray-500 border-dashed flex items-center justify-center">
                        <UploadIcon className="size-[60px]" />
                    </div>
                )}
                {!!avatar && (
                    <div className="w-full aspect-square rounded-lg overflow-hidden">
                        <Image
                            src={URL.createObjectURL(avatar)}
                            alt=""
                            width={346}
                            height={346}
                            className=" h-full aspect-square object-cover"
                        />
                    </div>
                )}
            </label>
            <input type="file" id="avatar" hidden onChange={handleFileChange} />
        </form>
    );

    const FormStep3 = () => (
        <div className="w-full">
            <ScrollArea className="h-[400px]">
                <div className="grid gap-4">
                    <FollowItem
                        name="That Nguyen"
                        avatar="/images/that.png"
                        title="Frontend Developer"
                        id="1111"
                        onFollow={handleFollow}
                    />

                    {[1, 1, 1, , 1, 1, 1, 1, 1, 11, 1, 1, , 1, 1, 1, 1].map(
                        (_, index) => (
                            <FollowItem
                                key={index}
                                name="That Nguyen"
                                avatar="/images/that.png"
                                title="Frontend Developer"
                                id="1111"
                                onFollow={handleFollow}
                            />
                        )
                    )}
                </div>
                <ScrollBar orientation="vertical" />
            </ScrollArea>
        </div>
    );
    const FormStep4 = () => (
        <div className="">
            <h2 className="text-gray-700">Choose your title</h2>
        </div>
    );
    return (
        <div>
            {step === 1 && <FormStep1 />}
            {step === 2 && <FormStep2 />}
            {step === 3 && <FormStep3 />}
            {step === 4 && <FormStep4 />}
            <div className="pt-4 flex gap-3">
                {step >= 2 && (
                    <Button variant="ghost" onClick={prevStep}>
                        Back
                    </Button>
                )}
                <Button onClick={nextStep}>Next</Button>
            </div>
        </div>
    );
};

export default FormOnboarding;
