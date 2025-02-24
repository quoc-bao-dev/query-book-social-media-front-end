'use client';
import { Button } from '@/components/ui/button';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

const Typewriter = dynamic(
  () => import('react-simple-typewriter').then((mod) => mod.Typewriter),
  { ssr: false },
);

const Title = () => {
  return (
    <motion.h1
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className='relative z-50 text-6xl font-extrabold text-neutral-900 leading-tight'
    >
      Welcome to{' '}
      <span className='text-secondary-500'>
        <Typewriter words={['Query Book']} loop={true} cursor />
      </span>
    </motion.h1>
  );
};
export default function Welcome() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [80, -80]);
  const rotateY = useTransform(x, [-60, 60], [-80, 80]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      x.set((clientX / innerWidth) * 100 - 50);
      y.set((clientY / innerHeight) * 100 - 50);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [x, y]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        ease: 'easeInOut',
        duration: 0.6,
        delay: 0.2,
        type: 'easeInOut',
      }}
      className='absolute inset-0 flex flex-col items-center justify-center text-center px-6 overflow-hidden'
    >
      {/* Background Animation */}
      <motion.div
        className='absolute inset-0 bg-gradient-to-r from-secondary-200 dark:from-secondary-300 via-info-100 to-primary-50'
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
        style={{ backgroundSize: '300% 300%' }}
      />

      <Title />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className='text-xl relative z-50 text-neutral-600 mt-4 max-w-2xl'
      >
        Discover, connect, and share knowledge with professionals worldwide.
        Join us and start exploring!
      </motion.p>

      <motion.div
        style={{
          perspective: 10000, // Tạo chiều sâu
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d', // Giữ hiệu ứng 3D khi xoay
          }}
          className='relative' // Để có thể đặt ánh sáng hoặc hiệu ứng khác nếu cần
        >
          <Image
            className='mt-6 w-[400px] h-auto'
            style={{ filter: 'drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.2))' }}
            src={'/images/logo_QBook.png'}
            alt='Query Book Logo'
            width={300}
            height={300}
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className='flex justify-center mt-8'
      >
        <Link href={'/welcome?step=1'}>
          <motion.div
            whileHover={{
              scale: 1.1,
              boxShadow: '0px 4px 15px rgba(255, 255, 255, 0.3)',
            }}
            whileTap={{ scale: 0.9 }}
            className='rounded-lg'
          >
            <Button
              size='lg'
              className='relative z-50 px-8 py-4 text-xl font-semibold  shadow-lg rounded-lg'
            >
              Get Started
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
