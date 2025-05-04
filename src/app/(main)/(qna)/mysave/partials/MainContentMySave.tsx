'use client';

import { useGetMySaveQuestionQuery } from '@/queries/question';
import { useEffect, useMemo, useState } from 'react';
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

  // Cập nhật trạng thái loading của ứng dụng
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  // Cuộn lên đầu trang khi component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Lọc theo title từ questionId, dùng useMemo để tối ưu
  const filteredData = useMemo(() => {
    const lowerCaseSearch = searchTerm.toLowerCase().trim();

    return Array.isArray(data)
      ? data.filter((post) =>
          post.questionId?.title?.toLowerCase().includes(lowerCaseSearch),
        )
      : [];
  }, [data, searchTerm]);

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
