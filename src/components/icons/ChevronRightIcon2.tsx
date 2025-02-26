import React from 'react';

const ChevronRightIcon2 = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={3}
      stroke='black'
      className={`size-6 drop-shadow-md ${className}`}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='m8.25 4.5 7.5 7.5-7.5 7.5'
      />
    </svg>
  );
};

export default ChevronRightIcon2;
