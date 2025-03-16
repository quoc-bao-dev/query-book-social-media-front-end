'use client';

import { useGetAllTopic } from '@/queries/topic';
import { TopicResponse } from '@/types/topic';
import { useTranslations } from 'next-intl';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface TopicSelectProps {
  register: UseFormRegister<FieldValues>;
  error?: string;
}

export default function TopicSelect({ register, error }: TopicSelectProps) {
  const { data, isLoading, error: fetchError } = useGetAllTopic();
  const t = useTranslations('AskQuestion');

  return (
    <div>
      <label className='block text-neutral-900 font-medium mb-2'>
        {t('topic')}
      </label>
      {isLoading ? (
        <p>{t('loadtopic')}</p>
      ) : fetchError ? (
        <p className='text-red-500'>Failed to load topics</p>
      ) : (
        <select
          {...register('topic')}
          className='w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-green-500'
        >
          <option value='' hidden>
            {t('select')}
          </option>
          {data?.map((topic: TopicResponse) => (
            <option key={topic._id} value={topic._id}>
              {topic.name}
            </option>
          ))}
        </select>
      )}
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  );
}
