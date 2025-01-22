'use client';

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import axiosClient from '@/httpClient';
import axios from 'axios';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useState } from 'react';

const FormActiveAccount = () => {
    const [isComplete, setIsComplete] = useState(false);
    const onSubmit = async (data: string) => {
        if (isComplete) {
            return;
        }
        setIsComplete(true);

        try {
            await axiosClient.post(
                'api/auth/active-account',
                { otp: data },
                { baseURL: '' }
            );
        } catch (error) {
            setIsComplete(false);
            if (axios.isAxiosError(error) && error.response) {
                const { message }: { message: string } = error.response.data;
                if (message) {
                    alert(message);
                }
            }
        }
    };
    return (
        <form>
            <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                onComplete={onSubmit}
            >
                <InputOTPGroup>
                    <InputOTPSlot
                        index={0}
                        className="w-[50px] h-[50px] text-2xl font-medium"
                    />
                    <InputOTPSlot
                        index={1}
                        className="w-[50px] h-[50px] text-2xl font-medium"
                    />
                    <InputOTPSlot
                        index={2}
                        className="w-[50px] h-[50px] text-2xl font-medium"
                    />
                    <InputOTPSlot
                        index={3}
                        className="w-[50px] h-[50px] text-2xl font-medium"
                    />
                    <InputOTPSlot
                        index={4}
                        className="w-[50px] h-[50px] text-2xl font-medium"
                    />
                    <InputOTPSlot
                        index={5}
                        className="w-[50px] h-[50px] text-2xl font-medium"
                    />
                </InputOTPGroup>
            </InputOTP>
        </form>
    );
};

export default FormActiveAccount;
