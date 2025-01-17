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
        try {
            const response = await axiosClient.post('/auth/login', data);
            const {
                status,
                data: { accessToken, refreshToken },
            } = response.data;

            if (status === 200) {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                router.push('/');
            }
        } catch (error: any) {
            const { message } = error.response.data;
            if (message) {
                setError('email', {
                    type: 'manual',
                });
                setError('password', {
                    type: 'manual',
                });
                setMessage(message);
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
                <FloatInput
                    {...register('password')}
                    error={!!errors.password}
                    type="password"
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
