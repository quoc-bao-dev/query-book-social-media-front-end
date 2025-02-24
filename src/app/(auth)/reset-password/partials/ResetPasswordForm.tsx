'use client';
import { Button } from '@/components/common/Button';
import PasswordInput from '@/components/common/PasswordInput';
import { config } from '@/config';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  ResetPasswordSchema,
  ResetPasswordSchemaType,
} from '../schemas/reset-pass-schema';

const ResetPasswordForm = () => {
  const token = useSearchParams().get('token');

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
  });
  const onSubmit = async (data: ResetPasswordSchemaType) => {
    console.log(data);
    console.log(token);
    const res = await axios.post(`${config.BASE_URL}/auth/reset-password`, {
      password: data.password,
      resetPassToken: token,
    });

    if (res.status === 200) {
      router.push('/login');
    }
  };
  return (
    <div className=' mt-4'>
      <p className='mb-4'>Enter your new password to reset your password</p>
      <form
        className='flex flex-col gap-5 w-[350px]'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='w-full'>
          <PasswordInput
            className='w-full'
            {...register('password')}
            label='New Password'
          />
          {errors.password && (
            <p className='mt-2 text-red-500'>{errors.password.message}</p>
          )}
        </div>
        <div className='w-full'>
          <PasswordInput
            className='w-full'
            {...register('confirmPassword')}
            label='Confirm Password'
          />
          {errors.confirmPassword && (
            <p className='mt-2 text-red-500'>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button>Reset Password</Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
