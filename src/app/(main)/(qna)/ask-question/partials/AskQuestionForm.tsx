'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import MonacoEditor from '@monaco-editor/react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { QuestionSchema, questionSchema } from '../schema/questionSchema';
import LanguageSeletor from './LanguageSeletor';
import { useCreateQuestionMutation } from '@/queries/question';
import HashTagInput from './HashTagInput';

export default function AskQuestionForm() {
  const [selectedLanguage, setSelectedLanguage] = useState('typescript');
  const { mutateAsync } = useCreateQuestionMutation();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<QuestionSchema>({
    resolver: zodResolver(questionSchema),
  });

  const onSubmit = async (data: QuestionSchema) => {
    const payload = {
      topic: data.topic,
      title: data.title,
      question: data.content,
      code: {
        fileType: selectedLanguage,
        code: data.code,
      },
      hashtags: data.hashtags,
    };

    try {
      await mutateAsync(payload);
      window.location.href = '/myquestion'; // Chuyển hướng sau khi gửi thành công
    } catch (error) {
      console.error('Error posting question:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div>
        <label className='block text-neutral-900 font-medium mb-2'>Topic</label>
        <select
          {...register('topic')}
          className='w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-green-500'
          defaultValue='67aec593090fde960dd8f81c'
        >
          <option value=''>Select a topic...</option>
          <option value='67aec593090fde960dd8f81c'>Topic A</option>
          <option value='78bfc6824311dc87a19e34fd'>Topic B</option>
          <option value='89dcd7935522ed98b20f45fe'>Topic C</option>
        </select>
        {errors.topic && <p className='text-red-500'>{errors.topic.message}</p>}
      </div>

      <div>
        <label className='block text-neutral-900 font-medium mb-2'>Title</label>
        <input
          {...register('title')}
          type='text'
          className='w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-green-500'
          placeholder='Write a title...'
        />
        {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
      </div>

      <div>
        <label className='block text-neutral-900 font-medium mb-2'>
          Content
        </label>
        <textarea
          {...register('content')}
          placeholder='Write something...'
          className='w-full p-3 border border-border rounded-lg h-32 focus:ring-2 focus:ring-green-500'
        />
        {errors.content && (
          <p className='text-red-500'>{errors.content.message}</p>
        )}
      </div>

      <div>
        <label className='block text-neutral-900 font-medium mb-2'>
          Have you code?
        </label>
        <LanguageSeletor
          curLaguage={selectedLanguage}
          setCurlanguage={setSelectedLanguage}
          className='mb-4'
        />
        <p>Demo</p>
        <Controller
          name='code'
          control={control}
          render={({ field }) => (
            <MonacoEditor
              onChange={field.onChange}
              language={selectedLanguage}
              height={500}
              value={`const helloWorld = () => {};`}
              theme='vs-dark'
            />
          )}
        />
        {errors.code && <p className='text-red-500'>{errors.code.message}</p>}
      </div>

      <div>
        <label className='block text-neutral-900 font-medium mb-2'>
          Hashtag
        </label>
        <Controller
          control={control}
          name='hashtags'
          render={({ field }) => <HashTagInput onChange={field.onChange} />}
        />
        {errors.hashtags && (
          <p className='text-red-500'>{errors.hashtags.message}</p>
        )}
      </div>

      <div>
        <label className='block text-neutral-900 font-medium mb-2'>
          Upload Image/Video
        </label>
        <div className='border border-border bg-neutral-100 rounded-lg p-6 flex items-center justify-center cursor-pointer hover:bg-input'>
          <div className='text-center text-gray-500'>
            <span className='text-xl'>📷</span>
            <p className='text-sm mt-1'>Thêm ảnh/video</p>
          </div>
        </div>
      </div>

      <button
        type='submit'
        className='w-full bg-primary-500 text-accent-foreground p-3 rounded-lg font-semibold hover:bg-primary-200 transition duration-300'
      >
        Post
      </button>
    </form>
  );
}
