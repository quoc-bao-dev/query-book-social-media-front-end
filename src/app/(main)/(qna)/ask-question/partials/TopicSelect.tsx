'use client';

import { useEffect, useState } from 'react';
import { useGetAllTopic } from '@/queries/topic';
import { TopicResponse } from '@/types/topic';
import { useTranslations } from 'next-intl';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface TopicSelectProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  error?: string;
}

export default function TopicSelect({
  register,
  setValue,
  error,
}: TopicSelectProps) {
  const { data, isLoading, error: fetchError } = useGetAllTopic();

  const [selectedTopic, setSelectedTopic] = useState<string>('');

  const t = useTranslations('AskQuestion');
  useEffect(() => {
    if (data) {
      const defaultTopic = data.find(
        (topic: TopicResponse) => topic.name === 'React',
      );
      if (defaultTopic) {
        setValue('topic', defaultTopic._id);
        setSelectedTopic(defaultTopic._id);
      }
    }
  }, [data, setValue]);

  return (
    <div>
      <label className='block text-neutral-900 font-medium mb-2'>
        {t('topic')}
      </label>
      {isLoading ? (
        <p>{t('loadtopic')}</p>
      ) : fetchError ? (
        <p className='text-red-500'>
          Failed to load topics: {fetchError.message}
        </p>
      ) : (
        <select
          {...register('topic')}
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className='w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-green-500'
        >
          <option value='' hidden>
            {t('select')}
          </option>
          {data?.map((topic: TopicResponse) => (
            <option className='capitalize' key={topic._id} value={topic._id}>
              {topic.name}
            </option>
          ))}
        </select>
      )}
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  );
}
