import { motion } from 'framer-motion';

const LoadingIcon = ({ size = 30, color = '#3b82f6' }) => {
  return (
    <motion.div
      className='flex items-center justify-center'
      animate={{ rotate: 360, opacity: [0.5, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
    >
      <svg
        width={size}
        height={size}
        viewBox='0 0 50 50'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <motion.circle
          cx='25'
          cy='25'
          r='20'
          stroke={color}
          strokeWidth='5'
          strokeLinecap='round'
          strokeDasharray='100 40'
          strokeDashoffset='0'
          initial={{ strokeDashoffset: 140 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: 'easeInOut',
          }}
        />
      </svg>
    </motion.div>
  );
};

export default LoadingIcon;
