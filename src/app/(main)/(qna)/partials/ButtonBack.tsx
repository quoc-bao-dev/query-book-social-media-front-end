import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';

const ButtonBack = ({ href = '/qna' }: { href?: string }) => {
  return (
    <Link
      href={href}
      className='flex items-center justify-center w-10 h-10 mb-3 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-700'
    >
      <ArrowLeftIcon className='w-6 h-6' />
    </Link>
  );
};

export default ButtonBack;
