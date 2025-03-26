import React from 'react';

const ChevronLeftIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={2.5}
      stroke='white'
      className={className}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M15.75 4.5l-7.5 7.5 7.5 7.5'
      />
    </svg>
  );
};

export default ChevronLeftIcon;
