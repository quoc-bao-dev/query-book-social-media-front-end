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

const MainContentMyQuestion = () => {
  const { user } = useAuth();

  const param = useSearchParams();
  const mode = param.get('mode');
  const [searchTerm, setSearchTerm] = useState('');
  const t = useTranslations('MainContentQnA');

  const { data } = useGetMyQuestion();

  const filteredPosts =
    data?.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
