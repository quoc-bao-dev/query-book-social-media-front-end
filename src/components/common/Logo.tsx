import Image from 'next/image';

const Logo = ({ className }: { className?: string }) => {
  return (
    <Image
      className={className}
      src={'/images/logo_QBook.png'}
      width={200}
      height={200}
      alt='logo'
    />
  );
};

export default Logo;
