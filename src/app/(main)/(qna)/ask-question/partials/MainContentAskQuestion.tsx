'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import AskQuestionForm from './AskQuestionForm';
import { useTranslations } from 'next-intl';

export default function MainContentAskQuestion() {
  const t = useTranslations('AskQuestion');

  return (
    <div className='max-w-2xl mx-auto p-8 mb-10 bg-card shadow-lg rounded-xl'>
      <Link
        href='/myquestion'
        className='flex items-center justify-center w-10 h-10 mb-3 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-700'
      >
        <ArrowLeftIcon className='w-6 h-6' />
      </Link>
      <h2 className='text-3xl font-bold text-center text-gray-800'>
        {t('formname')}
      </h2>
      <AskQuestionForm />
    </div>
  );
}
