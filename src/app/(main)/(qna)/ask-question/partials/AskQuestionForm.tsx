/* eslint-disable @next/next/no-img-element */
'use client';

import { Button } from '@/components/common/Button';
import ImageIcon from '@/components/icons/ImageIcon';
import { useCreateQuestionMutation } from '@/queries/question';
import { uploadImages } from '@/utils/uploadUtils'; // Hàm upload ảnh
import { zodResolver } from '@hookform/resolvers/zod';
import MonacoEditor from '@monaco-editor/react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ModalError from '../../partials/ModalError';
import { QuestionSchema, questionSchema } from '../schema/questionSchema';
import HashTagInput from './HashTagInput';
import LanguageSeletor from './LanguageSeletor';
import TopicSelect from './TopicSelect';
import { useTranslations } from 'next-intl';
import { useAppLoading } from '@/components/Layout/AppLoading';

export default function AskQuestionForm() {
  const [selectedLanguage, setSelectedLanguage] = useState('typescript');
  const { mutateAsync, isPending } = useCreateQuestionMutation();
  const [images, setImages] = useState<File[]>([]); // State lưu ảnh
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const { loading, done } = useAppLoading(); // Sử dụng loading
  const t = useTranslations('AskQuestion');

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<QuestionSchema>({
    resolver: zodResolver(questionSchema),
  });

  // Chọn ảnh
  const handleUploadImages = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.click();

    input.onchange = (e: Event) => {
      const files = (e.target as HTMLInputElement)?.files;
      if (files) {
        const fileArray = Array.from(files);

        if (fileArray.length + images.length > 5) {
          setErrorMessage(t('errortitle'));
          setIsErrorModalOpen(true);
          return;
        }

        setImages((prev) => [...prev, ...fileArray]);
        setErrorMessage(null);
      }
    };
  };

  const onSubmit = async (data: QuestionSchema) => {
    loading(); // Bật trạng thái loading
    let uploadedImages: string[] = [];

    if (images.length > 0) {
      try {
        const uploadResult = await uploadImages(images);
        uploadedImages = uploadResult?.files.map((file) => file.filename) || [];
      } catch (error) {
        console.error('Upload failed', error);
        done(); // Tắt loading nếu lỗi xảy ra
        return;
      }
    }

    const payload = {
      topic: data.topic,
      title: data.title,
      question: data.content,
      code: {
        fileType: selectedLanguage,
        code: data.code,
      },
      hashtags: data.hashtags,
      images: uploadedImages,
    };

    try {
      await mutateAsync(payload);
      // console.log('upload', payload);
    } catch (error) {
      console.error('Error posting question:', error);
    } finally {
      done();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <TopicSelect register={register} error={errors.topic?.message} />
      <div>
        <label className='block font-medium mb-2'>{t('title')}</label>
        <input
          {...register('title')}
          type='text'
          className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500'
          placeholder={t('phtitle')}
        />
        {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
      </div>

      <div>
        <label className='block font-medium mb-2'>{t('content')}</label>
        <textarea
          {...register('content')}
          placeholder={t('phcontent')}
          className='w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-green-500'
        />
        {errors.content && (
          <p className='text-red-500'>{errors.content.message}</p>
        )}
      </div>

      <div>
        <label className='block font-medium mb-2'>{t('code')}</label>
        <LanguageSeletor
          curLaguage={selectedLanguage}
          setCurlanguage={setSelectedLanguage}
        />
        <Controller
          name='code'
          control={control}
          render={({ field }) => (
            <MonacoEditor
              onChange={field.onChange}
              language={selectedLanguage}
              height={300}
              theme='vs-dark'
            />
          )}
        />
        {errors.code && <p className='text-red-500'>{errors.code.message}</p>}
      </div>

      <div>
        <label className='block font-medium mb-2'>{t('hashtag')}</label>
        <Controller
          control={control}
          name='hashtags'
          render={({ field }) => <HashTagInput onChange={field.onChange} />}
        />
        {errors.hashtags && (
          <p className='text-red-500'>{errors.hashtags.message}</p>
        )}
      </div>

      {/* Upload Image Section */}
      <div>
        <div className='flex items-center justify-between'>
          <label className='left-0 font-medium mb-2'>{t('image')}</label>
          {images.length > 1 && (
            <button
              type='button'
              onClick={() => setImages([])}
              className='mb-2 text-primary-600 hover:underline'
            >
              {t('clearall')}
            </button>
          )}
        </div>

        {images.length > 0 ? (
          <div className='relative w-full h-32 flex gap-1'>
            {images.map((image, index) => (
              <div key={index} className='relative w-1/5 h-full'>
                <img
                  className='w-full h-full object-cover rounded-lg'
                  src={URL.createObjectURL(image)}
                  alt={`preview-${index}`}
                />
                {/* Nút Xóa ảnh riêng từng ảnh */}
                <button
                  type='button'
                  className='absolute size-7 top-1 right-1 bg-black/70 text-white rounded-full p-1 text-xs'
                  onClick={() =>
                    setImages((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  ✕
                </button>
              </div>
            ))}

            {/* Nút thêm ảnh xuất hiện khi có ảnh bị xóa (ảnh < 5) */}
            {images.length < 5 && (
              <button
                type='button'
                onClick={handleUploadImages}
                className='flex items-center justify-center size-32 border-2 border-dashed border-gray-400 rounded-lg hover:bg-gray-100'
              >
                <span className='text-2xl text-gray-500'>+</span>
              </button>
            )}
          </div>
        ) : (
          // Nếu chưa có ảnh, hiển thị vùng upload
          <div
            onClick={handleUploadImages}
            className='w-full h-32 border bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200'
          >
            <ImageIcon />
          </div>
        )}
      </div>
      <ModalError
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        message={errorMessage || ''}
      />

      <Button
        type='submit'
        disabled={isPending}
        className='w-full bg-primary-500 p-3 rounded-lg text-neutral-900 font-semibold hover:bg-primary-700'
      >
        {isPending ? t('buttoncreating') : t('buttonpost')}
      </Button>
    </form>
  );
}
