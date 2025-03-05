const SkeletonUserRow = () => {
  return (
    <div className='animate-pulse flex-1 flex flex-col gap-2'>
      {Array.from({ length: 7 }).map((_, index) => (
        <div className='p-4 bg-card' key={index}>
          <div className='flex items-center gap-2'>
            <div className='size-10 rounded-full bg-gray-300'></div>
            <div className='flex flex-col gap-1 flex-1'>
              <div className='h-4 bg-gray-300 rounded w-1/3'></div>
              <div className='h-4 bg-gray-300 rounded w-full'></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonUserRow;
