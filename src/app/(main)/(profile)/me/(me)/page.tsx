import PostCreate from '@/app/(main)/(home)/(feeds)/partials/PostCreate';
import PostContent from './partials/PostContent';

const Page = () => {
  return (
    <div className='md:w-[698px]'>
      {/* From create Post */}
      <PostCreate />
      {/* From create Post */}
      <PostContent />
    </div>
  );
};

export default Page;
