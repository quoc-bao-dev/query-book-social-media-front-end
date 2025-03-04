'use client';

import { useCreateQuestionMutation } from '@/queries/question';
import { zodResolver } from '@hookform/resolvers/zod';
import MonacoEditor from '@monaco-editor/react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { QuestionSchema, questionSchema } from '../schema/questionSchema';
import HashTagInput from './HashTagInput';
import LanguageSeletor from './LanguageSeletor';
import TopicSelect from './TopicSelect';
import { Button } from '@/components/common/Button';

export default function AskQuestionForm() {
  const [selectedLanguage, setSelectedLanguage] = useState('typescript');
  const { mutateAsync, isPending } = useCreateQuestionMutation();

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
      {/* Topic Select Component */}
      <TopicSelect register={register} error={errors.topic?.message} />

      {/* Title Input */}
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

      {/* Content Input */}
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

      {/* Code Editor */}
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

      {/* Hashtag Input */}
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

      {/* Upload Image/Video */}
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

      {/* Submit Button */}
      <Button
        type='submit'
        disabled={isPending}
        className='w-full bg-primary-500 text-accent-foreground p-3 rounded-lg font-semibold hover:bg-primary-200 transition duration-300'
      >
        {isPending ? 'Creating...' : 'Post'}
      </Button>
    </form>
  );
}
