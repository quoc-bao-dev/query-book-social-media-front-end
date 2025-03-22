const ErrorIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      className={`size-12 text-red-500 ${className}`}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 9v4m0 4h.01M4.93 4.93a10.07 10.07 0 0114.14 0m-14.14 0a10.07 10.07 0 000 14.14m14.14-14.14a10.07 10.07 0 010 14.14'
      />
    </svg>
  );
};

export default ErrorIcon;
