import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

const AskQuestionButton = () => {
  const t = useTranslations('AskQuestionButton');

  return (
    <div>
      <Link href='/myquestion?mode=ask'>
        <button className='px-4 py-2 bg-primary-500 font-semibold text-neutral-900 rounded-md shadow hover:bg-primary-300 transition'>
          {t('button')}
        </button>
      </Link>
    </div>
  );
};

export default AskQuestionButton;
