'use client';

import { useGetMySaveQuestionQuery } from '@/queries/question';
import { useEffect, useState } from 'react';
import PostsMySave from './PostsMySave';
import SearchBarMySave from './SearchBarMySave';
import { useTranslations } from 'next-intl';
import { useAppLoading } from '@/components/Layout/AppLoading';
import { SaveQuestionResponse } from '@/types/saveQuestion';

const MainContentMySave = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { setLoading } = useAppLoading();

  const { data, isLoading } = useGetMySaveQuestionQuery(); // Lấy trạng thái loading từ query
  const t = useTranslations('MainContentQnA');

  useEffect(() => {
    setLoading(isLoading); // Cập nhật trạng thái loading của ứng dụng
  }, [isLoading, setLoading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Lọc theo title từ questionId
  const filteredData: SaveQuestionResponse[] = Array.isArray(data)
    ? data.filter((post: SaveQuestionResponse) => {
        const lowerCaseSearch = searchTerm.toLowerCase().trim();
        const title = post.questionId?.title
          ? post.questionId.title.toLowerCase()
          : '';

        return title.includes(lowerCaseSearch);
      })
    : [];

  return (
    <div className='mx-auto p-4 bg-background max-h-full pt-[65px]'>
      {/* Thanh tìm kiếm */}
      <SearchBarMySave searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Hiển thị trạng thái loading */}
      {filteredData.length > 0 ? (
        filteredData
          .slice()
          .reverse()
          .map((post: SaveQuestionResponse) => (
            <PostsMySave key={post._id} post={post} searchTerm={searchTerm} />
          ))
      ) : (
        <p className='text-center text-gray-500'>{t('noresultsfound')}</p>
      )}
    </div>
  );
};

export default MainContentMySave;
