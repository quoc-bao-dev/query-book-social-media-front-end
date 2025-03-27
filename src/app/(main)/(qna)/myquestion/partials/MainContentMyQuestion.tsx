'use client';

import { useEffect, useState } from 'react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const t = useTranslations('MainContentQnA');

  const { data, isLoading } = useGetMyQuestion(); // Lấy trạng thái loading từ query

  const currentUserId = user?.id;

  useEffect(() => {
    setLoading(isLoading); // Cập nhật trạng thái loading toàn cục
  }, [isLoading, setLoading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredPosts =
    data?.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

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
          .reverse()
          .slice()
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
