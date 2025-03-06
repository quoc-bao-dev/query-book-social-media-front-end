/* eslint-disable @next/next/no-img-element */
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
import { uploadImages } from '@/utils/uploadUtils'; // Hàm upload ảnh
import ImageIcon from '@/components/icons/ImageIcon';
import Modal from '@/components/common/Modal';
import ErrorIcon from '@/components/icons/ErrorIcon';

export default function AskQuestionForm() {
  const [selectedLanguage, setSelectedLanguage] = useState('typescript');
  const { mutateAsync, isPending } = useCreateQuestionMutation();
  const [images, setImages] = useState<File[]>([]); // State lưu ảnh
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

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
          setErrorMessage('Bạn chỉ được upload tối đa 5 ảnh.');
          setIsErrorModalOpen(true);
          return;
        }

        setImages((prev) => [...prev, ...fileArray]);
        setErrorMessage(null);
      }
    };
  };

  const onSubmit = async (data: QuestionSchema) => {
    let uploadedImages: string[] = [];

    if (images.length > 0) {
      try {
        const uploadResult = await uploadImages(images);
        uploadedImages = uploadResult?.files.map((file) => file.filename) || [];
      } catch (error) {
        console.error('Upload failed', error);
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

      window.location.href = '/myquestion'; // Chuyển hướng sau khi gửi thành công
    } catch (error) {
      console.error('Error posting question:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <TopicSelect register={register} error={errors.topic?.message} />
      <div>
        <label className='block font-medium mb-2'>Title</label>
        <input
          {...register('title')}
          type='text'
          className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500'
          placeholder='Write a title...'
        />
        {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
      </div>

      <div>
        <label className='block font-medium mb-2'>Content</label>
        <textarea
          {...register('content')}
          placeholder='Write something...'
          className='w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-green-500'
        />
        {errors.content && (
          <p className='text-red-500'>{errors.content.message}</p>
        )}
      </div>

      <div>
        <label className='block font-medium mb-2'>Have you code?</label>
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
        <label className='block font-medium mb-2'>Hashtag</label>
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
        <label className='block font-medium mb-2'>Upload Image</label>

        {images.length > 0 ? (
          <div className='relative w-full h-32 flex justify-center items-center gap-2'>
            {images.map((image, index) => (
              <div key={index} className='relative flex-1 h-full'>
                <img
                  className='w-full h-full object-cover rounded-lg'
                  src={URL.createObjectURL(image)}
                  alt={`preview-${index}`}
                />
                {/* Nút Xóa ảnh riêng từng ảnh */}
                <button
                  className='absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 text-xs'
                  onClick={() =>
                    setImages((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  ✕
                </button>
              </div>
            ))}
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
      <Modal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
      >
        <div className='bg-white p-6 rounded-xl shadow-xl w-96 text-center'>
          {/* Icon cảnh báo */}
          <div className='flex justify-center'>
            <ErrorIcon />
          </div>

          {/* Tiêu đề lỗi */}
          <h2 className='text-xl font-semibold text-red-600 mt-4'>Lỗi</h2>

          {/* Nội dung thông báo */}
          <p className='mt-2 text-gray-600'>{errorMessage}</p>

          {/* Nút đóng modal */}
          <button
            className='mt-6 px-5 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all'
            onClick={() => setIsErrorModalOpen(false)}
          >
            OK
          </button>
        </div>
      </Modal>

      <Button
        type='submit'
        disabled={isPending}
        className='w-full bg-primary-500 p-3 rounded-lg text-white font-semibold hover:bg-primary-700'
      >
        {isPending ? 'Creating...' : 'Post'}
      </Button>
    </form>
  );
}
