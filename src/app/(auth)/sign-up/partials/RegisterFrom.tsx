'use client';

import { Button } from '@/components/common/Button';
import FloatInput from '@/components/common/FloatInput';
import axiosClient from '@/httpClient';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerSchema, RegisterSchema } from '../schemas';
import axios from 'axios';

const RegisterFrom = () => {
    const [message, setMessage] = useState('');

    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterSchema) => {
        try {
            setMessage('');
            const response = await axiosClient.post(
                '/api/auth/register',
                data,
                {
                    baseURL: '',
                }
            );

            const status = response.status;

            if (status === 200) {
                router.push('/verify-otp/active-account');
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { message }: { message: string } = error.response.data;
                if (message) {
                    if (message.includes('Email')) {
                        setError('email', {
                            type: 'manual',
                        });
                    }
                    if (
                        message.includes('Username') ||
                        message.includes('Handle')
                    ) {
                        setError('username', {
                            type: 'manual',
                        });
                    }
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
                Sign up to your account
            </h2>
            {message && <div className=" text-red-500">{message}</div>}
            <div className="py-5">
                <FloatInput
                    {...register('email')}
                    error={!!errors.email}
                    type="email"
                    label="Email"
                    className="h-[50px]"
                    value={'quocbaodev1102@gmail.com'}
                />
                {errors.email && (
                    <p className="text-red-500 pt-1">{errors.email.message}</p>
                )}
            </div>
            <div className="py-5">
                <FloatInput
                    {...register('username')}
                    error={!!errors.username}
                    label="User Name"
                    className="h-[50px]"
                    value={'quocbaodev1102'}
                />
                {errors.username && (
                    <p className="text-red-500 pt-1">
                        {errors.username.message}
                    </p>
                )}
            </div>
            <div className="py-5">
                <FloatInput
                    {...register('password')}
                    error={!!errors.password}
                    label="Password"
                    type="password"
                    className="h-[50px]"
                    value={'Passwrod1234@'}
                />
                {errors.password && (
                    <p className="text-red-500 pt-1">
                        {errors.password.message}
                    </p>
                )}
            </div>
            <div className="py-5">
                <FloatInput
                    {...register('confirmPassword')}
                    error={!!errors.confirmPassword}
                    label="Confirm Password"
                    type="password"
                    className="h-[50px]"
                    value={'Passwrod1234@'}
                />
                {errors.confirmPassword && (
                    <p className="text-red-500 pt-1">
                        {errors.confirmPassword.message}
                    </p>
                )}
            </div>
            <div className="text-center pt-4">
                <Button className=" w-full h-[50px]">Sign up</Button>
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
};

export default RegisterFrom;
