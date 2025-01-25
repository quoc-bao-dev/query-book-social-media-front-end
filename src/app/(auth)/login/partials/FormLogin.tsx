'use client';

import { Button } from '@/components/common/Button';
import FloatInput from '@/components/common/FloatInput';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, loginSchema } from '../schemas';
import axiosClient from '@/httpClient';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import PasswordInput from '@/components/common/PasswordInput';

function FormLogin() {
    const [message, setMessage] = useState('');
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const router = useRouter();

    const onSubmit = async (data: LoginSchema) => {
        setMessage('');
        try {
            const response = await axiosClient.post('api/auth/login', data, {
                baseURL: '',
            });

            const status = response.status;

            if (status === 200) {
                router.push('/');
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { message }: { message: string } = error.response.data;
                if (message) {
                    setError('email', {
                        type: 'manual',
                    });
                    setError('password', {
                        type: 'manual',
                    });
                    setMessage(message);
                }
            } else {
                setMessage('An unexpected error occurred.');
            }
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-xl font-semibold py-5">
                Sign in to your account
            </h2>
            {message && <p className="text-error-500">{message}</p>}
            <div className="my-5">
                <FloatInput
                    {...register('email')}
                    error={!!errors.email}
                    defaultValue={'pythagore1102@gmail.com'}
                    type="email"
                    label="Email address"
                    className="h-[50px]"
                />
                {errors.email && (
                    <p className="text-error-500 pt-1">
                        {errors.email.message}
                    </p>
                )}
            </div>
            <div className="py-2">
                <p className="my-2 text-right">Forgot password?</p>
                <PasswordInput
                    {...register('password')}
                    defaultValue={'password1234'}
                    error={!!errors.password}
                    label="Password"
                    className="h-[50px]"
                />
                {errors.password && (
                    <p className="text-error-500 pt-1">
                        {errors.password.message}
                    </p>
                )}
            </div>

            {isSubmitting && <p>Loading...</p>}
            <div className="text-center pt-4">
                <Button className=" w-full h-[50px]">Sign in</Button>
            </div>
            <div className="flex items-center justify-center w-full my-4">
                <div className="h-px bg-gray-500 flex-grow"></div>
                <span className="mx-4 text-gray-800 font-medium">OR</span>
                <div className="h-px bg-gray-500 flex-grow"></div>
            </div>
            <div className="flex items-center gap-5 justify-center">
                <Image
                    src={'/images/google.png'}
                    alt=""
                    width={35}
                    height={35}
                />
                <Image src={'/images/git.png'} alt="" width={35} height={35} />
                <Image
                    src={'/images/facebook.png'}
                    alt=""
                    width={35}
                    height={35}
                />
            </div>
        </form>
    );
}

export default FormLogin;
