/* eslint-disable @next/next/no-img-element */
'use client';

import Avatar from '@/components/common/Avatar';
import ChatBubbleOvalLeftIcon from '@/components/icons/ChatBubbleOvalLeftIcon';
import CodeIcon from '@/components/icons/CodeIcon';
import HeartIcon from '@/components/icons/HeartIcon';
import SendIcon from '@/components/icons/SendIcon';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAnswerMutation, useAnswerQuery } from '@/queries/answer';
import { useAuth } from '@/store/authSignal';
import { uploadImages } from '@/utils/uploadUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import MonacoEditor from '@monaco-editor/react';
import { formatDistanceToNow } from 'date-fns';
import { ImageIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import LanguageSeletor from '../../../ask-question/partials/LanguageSeletor';
import { QuestionSchema } from '../../../ask-question/schema/questionSchema';
import ImageRender from '../../../partials/ImageRender';
import ModalError from '../../../partials/ModalError';
import { questionSchema } from '../schema/questionSchema';
import Vote from '../../../partials/Vote';
import { useTranslations } from 'next-intl';
import { enUS, vi } from 'date-fns/locale';
import CommentOptions from '../../../partials/CommentOptions';

type AnswerSectionProps = {
  questionId: string;
};

const AnswerSection = ({ questionId }: AnswerSectionProps) => {
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('typescript');
  const [hasCode, setHasCode] = useState(false); // State để kiểm tra có code không
  const [visibleComments, setVisibleComments] = useState(4);
  const [images, setImages] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const t = useTranslations('ModalComment');
  const locale = t('locale'); // Ví dụ: "en" hoặc "vi"
  const getLocale = (locale: string) => {
    return locale === 'vi' ? vi : enUS;
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const { user } = useAuth();
  const currentUserId = user?.id;

  const { data } = useAnswerQuery(questionId);

  const handleShowMore = () => {
    setVisibleComments((prev) => prev + 4); // Hiển thị thêm 4 bình luận
  };

  const handleSave = () => {
    if (code?.trim()) {
      setHasCode(true); // Đánh dấu là có code
      setShowCodeEditor(false); // Ẩn modal
    }
  };
  // FIXME
  const handleUploadIamges = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.click();

    input.onchange = (e: Event) => {
      const files = (e.target as HTMLInputElement)?.files;
      if (files) {
        const fileArray = Array.from(files);
        console.log('Selected Files:', fileArray);

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

  const { mutateAsync } = useAnswerMutation(questionId);
  const {
    control,
    watch,
    reset,
    formState: {},
  } = useForm<QuestionSchema>({
    resolver: zodResolver(questionSchema),
  });

  const code = watch('code');

  const handleSubmit = async () => {
    const answer = inputRef.current?.value?.trim();
    const trimmedCode = code?.trim();

    if (!answer && !trimmedCode && images.length === 0) return;

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
      questionId,
      content: answer || '',
      images: uploadedImages, // Gửi ảnh lên server
      ...(trimmedCode && {
        code: {
          fileType: selectedLanguage,
          code: trimmedCode,
        },
      }),
    };

    // console.log('hahaha', payload);

    await mutateAsync(payload);

    if (inputRef.current) inputRef.current.value = '';
    reset();
    setImages([]); // Reset ảnh sau khi gửi
    setHasCode(false);
    setShowCodeEditor(false);
    setSelectedLanguage('typescript');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  console.log('Cấu trúc của data:', data);
  data?.forEach((item) => {
    if (Array.isArray(item.votes)) {
      console.log(`Cấu trúc votes tại item:`, item.votes);
    }
  });

  const sortedData = data
    ?.map((item) => {
      const votes = item.votes || []; // Đảm bảo votes luôn là mảng
      const totalVotes =
        votes.filter((v) => v.voteType === 'up').length -
        votes.filter((v) => v.voteType === 'down').length;

      return { ...item, totalVotes };
    })
    .sort((a, b) => b.totalVotes - a.totalVotes);

  return (
    <div>
      {sortedData?.slice(0, visibleComments).map((item) => (
        <div
          key={item._id}
          className='relative mt-5 pl-6 border-l-2 border-neutral-100'
        >
          {item.votes ? (
            <Vote
              questionId={questionId}
              answerId={item._id}
              votes={item.votes}
            />
          ) : (
            <>placehodle</>
          )}

          <div className='mb-14'>
            <div className='flex items-center gap-3'>
              <Avatar
                src={item.userId.avatarUrl!}
                className='w-10 h-10 rounded-full'
                fallBack={`${item.userId.firstName} ${item.userId.lastName}`}
              />
              <p className='font-semibold'>
                {item.userId.firstName} {item.userId.lastName}
              </p>
              <CommentOptions
                answerId={item._id}
                questionId={item.questionId}
                isOwner={currentUserId === item.userId._id}
              />
            </div>
            <p className='mt-1 text-lg text-neutral-600'>{item.content}</p>

            {item.images && <ImageRender images={item.images} />}
            {item.code?.code && (
              <div className='mt-3 border border-gray-300 rounded-lg overflow-hidden shadow-sm'>
                <MonacoEditor
                  className='h-[300px]'
                  value={item.code.code}
                  theme='vs-dark'
                  language={item.code.fileType || 'javascript'}
                  options={{
                    readOnly: true,
                    domReadOnly: true,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                  }}
                />
              </div>
            )}
            <div className='mt-2 flex justify-start items-center gap-4 text-neutral-700 text-sm'>
              <p>
                {item.createdAt &&
                  (new Date().getTime() - new Date(item.createdAt).getTime() <
                  60000
                    ? t('justnow') // Hiển thị "Vừa xong" hoặc "Just now"
                    : formatDistanceToNow(new Date(item.createdAt), {
                        addSuffix: true,
                        locale: getLocale(locale),
                      }))}
              </p>
              <p className='text-2xl text-neutral-500'>•</p>

              <button className='flex items-center gap-1 font-semibold hover:text-primary-600 transition'>
                <HeartIcon className='w-4 h-4' />
                <span>{t('like')}</span>
              </button>

              <button className='flex items-center gap-1 font-semibold hover:text-primary-600 transition'>
                <ChatBubbleOvalLeftIcon className='w-4 h-4' />
                <span>{t('reply')}</span>
              </button>
            </div>
          </div>
        </div>
      ))}
      <ModalError
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        message={errorMessage || ''}
      />

      {data && visibleComments < data.length && (
        <button
          onClick={handleShowMore}
          className=' text-primary-600 hover:underline'
        >
          {t('morecomment')}
        </button>
      )}
      <div className='sticky translate-x-[-48px] bottom-8 left-0 w-full bg-card mx-auto pb-14 pt-3 md:py-4 md:bottom-0'>
        {images.length > 0 && (
          <div className='flex items-center gap-2 py-2 z-50'>
            {images.map((image, index) => {
              const imageUrl =
                image instanceof File ? URL.createObjectURL(image) : '';
              return (
                <div key={index} className='relative group'>
                  {imageUrl && (
                    <img
                      className='size-28 rounded-lg object-cover'
                      src={imageUrl}
                      alt='preview'
                    />
                  )}
                  {/* Nút xóa ảnh */}
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
              );
            })}

            {/* Nút thêm ảnh nếu chưa đủ 5 ảnh */}
            {images.length < 5 && (
              <button
                type='button'
                onClick={handleUploadIamges}
                className='flex items-center justify-center size-28 border-2 border-dashed border-gray-400 rounded-lg hover:bg-gray-100'
              >
                <span className='text-2xl text-gray-500'>+</span>
              </button>
            )}
            <button
              onClick={() => setImages([])}
              className='mt-2 w-28 text-primary-600 hover:underline'
            >
              {t('clearall')}
            </button>
          </div>
        )}

        <div className='mt-4 flex items-center gap-2'>
          <Avatar
            src={user?.avatarUrl}
            className='w-10 h-10 rounded-full'
            fallBack={user?.fullName}
          />
          <input
            ref={inputRef}
            type='text'
            placeholder={
              user?.fullName
                ? t('phinput', { name: user?.fullName })
                : t('phinputNoName') // Nếu không có tên, dùng một chuỗi thay thế
            }
            className='w-[80%] p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
            onKeyDown={handleKeyDown}
          />

          <div className='flex items-center gap-1'>
            <button
              className='p-2 rounded-lg hover:text-primary-600'
              onClick={handleUploadIamges}
            >
              <ImageIcon className='w-6 h-6' />
            </button>
            <button
              onClick={() => setShowCodeEditor(true)}
              className='relative p-2 rounded-lg hover:text-primary-600'
            >
              <CodeIcon className='w-6 h-6' />

              {/* Hiển thị dấu chấm đỏ nếu có code */}
              {hasCode && (
                <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
              )}
            </button>

            {showCodeEditor && (
              <Dialog open={showCodeEditor} onOpenChange={setShowCodeEditor}>
                <DialogContent className='max-w-2xl bg-card p-5 rounded-lg'>
                  <p className='text-2xl text-center font-semibold text-neutral-900'>
                    {t('codesnippet')}
                  </p>
                  <p className=' text-neutral-900 font-semibold'>
                    {t('selectlanguage')}
                  </p>
                  <LanguageSeletor
                    curLaguage={selectedLanguage}
                    setCurlanguage={setSelectedLanguage}
                    className='mb-4 text-neutral-900 hover:bg-input'
                  />
                  <Controller
                    name='code'
                    control={control}
                    render={({ field }) => (
                      <div>
                        <MonacoEditor
                          onChange={field.onChange}
                          language={selectedLanguage}
                          value={field.value} // Sử dụng field.value để cập nhật giá trị
                          height={400}
                          theme='vs-dark'
                        />

                        <div className='flex justify-end gap-4 mt-4'>
                          {/* Nút Clear Code */}
                          <button
                            onClick={() => {
                              field.onChange(''); // Xóa code trong Monaco Editor
                              setHasCode(false); // Ẩn dấu chấm đỏ trên icon Code
                            }}
                            className='px-4 py-2 rounded-lg bg-error-500 text-white shadow-md transition-all duration-300 ease-in-out hover:bg-error-200 hover:shadow-lg active:scale-95'
                          >
                            {t('clear')}
                          </button>

                          <button
                            onClick={handleSave}
                            className='px-4 py-2 rounded-lg bg-info-500 text-white shadow-md transition-all duration-300 ease-in-out hover:bg-info-600 hover:shadow-lg active:scale-95'
                          >
                            {t('save')}
                          </button>
                        </div>
                      </div>
                    )}
                  />
                </DialogContent>
              </Dialog>
            )}
            <button
              onClick={handleSubmit}
              className='p-2 rounded-lg hover:text-primary-600'
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerSection;
