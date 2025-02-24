'use client';
import { Button } from '@/components/common/Button';
import FloatInput from '@/components/common/FloatInput';
import { config } from '@/config';
import axios from 'axios';
import { useRef, useState } from 'react';

const ForgotPasswordForm = () => {
  const [link, setLink] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const email = emailRef.current?.value;
    if (email && emailRegex.test(email)) {
      // call api
      try {
        const res = await axios
          .post(`${config.BASE_URL}/auth/forgot-password`, {
            email,
          })
          .then((res) => res.data);
        if (res.status === 200) {
          console.log(res.data);
          const link = `https://mail.google.com/mail/u/0/#search/${res.data.messageId.slice(
            1,
            -1,
          )}`;
          setLink(link);
          setMessage('You will receive an email, please check your email');
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const { message }: { message: string } = error.response.data;
          if (message) {
            setError(message);
          }
        }
      }
    } else {
      setError('Invalid email');
    }
  };
  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-4 mt-4'>
      <FloatInput label='Email' ref={emailRef} />
      {error && <p className='text-red-500 py-1'>{error}</p>}
      {message && (
        <div className=' w-full h-fit rounded-lg flex  gap-2 bg-info-100/85 text-info-500 overflow-hidden'>
          <div className='w-[6px] min-h-full bg-info-500'></div>
          <p className='px-6 py-3'>{message}</p>
        </div>
      )}
      {link && (
        <a href={`${link}`} target='_blank'>
          check your email
        </a>
      )}
      <Button type='submit' disabled={!!link}>
        Enter your email
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
