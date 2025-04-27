import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

const AskQuestionButton = () => {
  const t = useTranslations('AskQuestionButton');

  return (
    <div>
      <Link href='/myquestion?mode=ask'>
        <button className='hidden md:inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors'>
          {t('button')}
        </button>
      </Link>
    </div>
  );
};

export default AskQuestionButton;
