const PlusIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='white'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      className='size-12 drop-shadow-lg pl-2'
    >
      <defs>
        <filter id='shadow' x='-50%' y='-50%' width='200%' height='200%'>
          <feDropShadow
            dx='2'
            dy='2'
            stdDeviation='3'
            flood-color='black'
            flood-opacity='0.5'
          />
          className={`size-12 ${className}`}
        </filter>
      </defs>

      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z'
        filter='url(#shadow)'
      />
    </svg>
  );
};

export default PlusIcon;
