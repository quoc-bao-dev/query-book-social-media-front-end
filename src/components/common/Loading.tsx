'use client';
import { motion } from 'framer-motion';
import React from 'react';

const LoadingEffect: React.FC = () => {
  return (
    <div className='relative flex items-center justify-center'>
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={i}
          className='absolute w-20 h-20 bg-gradient-to-r from-info-500 to-primary-500'
          animate={{
            rotate: [0, 360],
            scale: [1, 1.5, 1],
            opacity: [0.3, 1, 0.3],
            borderRadius: ['50%', '10%', '50%'],
          }}
          transition={{
            duration: 1.5 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default LoadingEffect;
