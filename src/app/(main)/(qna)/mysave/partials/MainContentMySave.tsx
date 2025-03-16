'use client';
import { useGetMySaveQuestionQuery } from '@/queries/question';
import { useEffect, useState } from 'react';
import PostsMySave from './PostsMySave';
import SearchBarMySave from './SearchBarMySave';
import { useTranslations } from 'next-intl';

const MainContentMySave = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data } = useGetMySaveQuestionQuery();
  const t = useTranslations('MainContentQnA');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Lọc theo title và hashtags từ questionId
  const filteredData = Array.isArray(data)
    ? data.filter((post: any) => {
        const lowerCaseSearch = searchTerm.toLowerCase().trim();

        // Lấy title từ questionId (nếu có)
        const title = post.questionId?.title
          ? post.questionId.title.toLowerCase()
          : '';

        // Lấy hashtags từ questionId (chỉ lấy những phần tử là string)

        return title.includes(lowerCaseSearch);
      })
    : [];

  return (
    <div className='mx-auto p-4 bg-background max-h-full pt-[65px]'>
      {/* Thanh tìm kiếm */}
      <SearchBarMySave searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Render bài viết */}
      {filteredData.length > 0 ? (
        filteredData
          .slice()
          .reverse()
          .map((post: any) => (
            <PostsMySave key={post._id} post={post} searchTerm={searchTerm} />
          ))
      ) : (
        <p className='text-center text-gray-500'>{t('noresultsfound')}</p>
      )}
    </div>
  );
};

export default MainContentMySave;
