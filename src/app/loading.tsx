import LoadingEffect from '@/components/common/Loading';

const Loading = () => {
  return (
    <div className='text-center bg-primary-50 text-primary-600 h-screen flex justify-center items-center text-4xl'>
      <LoadingEffect />
    </div>
  );
};

export default Loading;
