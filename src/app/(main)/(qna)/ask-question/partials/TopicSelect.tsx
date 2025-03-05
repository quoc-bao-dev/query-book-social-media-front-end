'use client';

import { useGetAllTopic } from '@/queries/topic';
import { TopicResponse } from '@/types/topic';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface TopicSelectProps {
  register: UseFormRegister<FieldValues>;
  error?: string;
}

export default function TopicSelect({ register, error }: TopicSelectProps) {
  const { data, isLoading, error: fetchError } = useGetAllTopic();

  return (
    <div>
      <label className='block text-neutral-900 font-medium mb-2'>Topic</label>
      {isLoading ? (
        <p>Loading topics...</p>
      ) : fetchError ? (
        <p className='text-red-500'>Failed to load topics</p>
      ) : (
        <select
          {...register('topic')}
          className='w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-green-500'
        >
          <option value='' hidden>
            Select a topic...
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
