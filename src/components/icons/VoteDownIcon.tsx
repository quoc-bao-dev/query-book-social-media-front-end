const VoteDownIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='15'
      height='15'
      viewBox='0 0 15 15'
      fill='currentColor'
      className={`size-6 ${className}`}
    >
      <path d='M7.5 12L0 4h15z' />
    </svg>
  );
};

export default VoteDownIcon;
