'use client';

import { useEffect, useMemo, useState } from 'react';
import SetCurUserProfileSignal from '@/app/(main)/(profile)/partials/SetCurUserProfileSignal';
import { useGetMyQuestion } from '@/queries/question';
import { useAuth } from '@/store/authSignal';
import { useSearchParams } from 'next/navigation';
import MainContentAskQuestion from '../../ask-question/partials/MainContentAskQuestion';
import AskQuestionButton from '../../partials/AskQuestionButton';
import PostsMyQuestion from './PostsMyQuestion';
import SearchBarMyQuestion from './SearchBarMyQuestion';
import { useTranslations } from 'next-intl';
import { useAppLoading } from '@/components/Layout/AppLoading';

const MainContentMyQuestion = () => {
  const { user } = useAuth();
  const { setLoading } = useAppLoading();
  const param = useSearchParams();
  const mode = param.get('mode');
  const t = useTranslations('MainContentQnA');

  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading } = useGetMyQuestion(); // Lấy dữ liệu và trạng thái loading

  const currentUserId = user?.id;

  // useEffect để cập nhật trạng thái loading toàn cục
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  // useEffect để cuộn lên đầu trang khi component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Lọc bài viết dựa trên searchTerm
  const filteredPosts = useMemo(() => {
    return (
      data?.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()),
      ) || []
    );
  }, [data, searchTerm]);

  // Nếu đang ở chế độ "ask", hiển thị component đặt câu hỏi
  if (mode === 'ask') {
    return <MainContentAskQuestion />;
  }

  return (
    <div className='mx-auto p-4 bg-background max-h-full pt-[65px]'>
      <SetCurUserProfileSignal user={user} />

      {/* Thanh tìm kiếm */}
      <SearchBarMyQuestion
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className='flex justify-end items-center mb-4'>
        <AskQuestionButton />
      </div>

      {/* Hiển thị loading */}
      {filteredPosts.length > 0 ? (
        filteredPosts
          .slice()
          .reverse()
          .map((post) => (
            <PostsMyQuestion
              key={post._id}
              post={post}
              user={user}
              searchTerm={searchTerm}
              currentUserId={currentUserId}
            />
          ))
      ) : (
        <p className='text-center text-neutral-500 mt-4'>
          {t('noresultsfound')}
        </p>
      )}
    </div>
  );
};

export default MainContentMyQuestion;
