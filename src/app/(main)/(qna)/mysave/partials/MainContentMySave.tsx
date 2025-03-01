 

'use client';
import { useGetMySaveQuestionQuery } from '@/queries/question';
import { useEffect, useState } from 'react';
import PostsMySave from './PostsMySave';
import SearchBarMySave from './SearchBarMySave';

const MainContentMySave = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data = [] } = useGetMySaveQuestionQuery();

  // console.log('[my save]', data);
  console.log('[my save data]', JSON.stringify(data, null, 2));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='mx-auto p-4 bg-background max-h-full pt-[65px]'>
      {/* Thanh tìm kiếm */}
      <SearchBarMySave searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Render bài viết */}
      {Array.isArray(data) && data.length > 0 ? (
        data
          .slice()
          .reverse()
          .map((item: any) => <PostsMySave key={item._id} post={item} />)
      ) : (
        <p className='text-center text-gray-500'>No saved questions found.</p>
      )}
    </div>
  );
};

export default MainContentMySave;
