/* eslint-disable @next/next/no-img-element */
'use client';

import Avatar from '@/components/common/Avatar';
import { Button } from '@/components/common/Button';
import ChatBubbleOvalLeftIcon from '@/components/icons/ChatBubbleOvalLeftIcon';
import CodeIcon from '@/components/icons/CodeIcon';
import HeartIcon from '@/components/icons/HeartIcon';
import SendIcon from '@/components/icons/SendIcon';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  useAnswerMutation,
  useAnswerQuery,
  useEditAnswerMutation,
} from '@/queries/answer';
import { useAuth } from '@/store/authSignal';
import { uploadImages } from '@/utils/uploadUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import MonacoEditor from '@monaco-editor/react';
import { formatDistanceToNow } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';
import { ImageIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import LanguageSeletor from '../../../ask-question/partials/LanguageSeletor';
import { QuestionSchema } from '../../../ask-question/schema/questionSchema';
import CommentOptions from '../../../partials/CommentOptions';
import ImageRender from '../../../partials/ImageRender';
import ModalError from '../../../partials/ModalError';
import Vote from '../../../partials/Vote';
import { questionSchema } from '../schema/questionSchema';
import { ChevronDoubleUpIcon } from '@heroicons/react/24/solid';

type AnswerSectionProps = {
  questionId: string;
};

const AnswerSection = ({ questionId }: AnswerSectionProps) => {
  // Hooks liên quan đến state
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('typescript');
  const [hasCode, setHasCode] = useState(false);
  const [visibleComments, setVisibleComments] = useState(4);
  const [images, setImages] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState('');
  const [editedCode, setEditedCode] = useState('');
  const [highlightedCommentId, setHighlightedCommentId] = useState<
    string | null
  >(null);
  const [isPending, setIsPending] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const commentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const lastCommentRef = useRef<HTMLDivElement | null>(null);
  const answerSectionRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Hooks liên quan đến dữ liệu
  const { user } = useAuth();
  const currentUserId = user?.id;

  const { data } = useAnswerQuery(questionId);
  const editAnswerMutation = useEditAnswerMutation(questionId);
  const { mutateAsync } = useAnswerMutation(questionId);

  const t = useTranslations('ModalComment');
  const locale = t('locale'); // Ví dụ: "en" hoặc "vi"
  const getLocale = (locale: string) => (locale === 'vi' ? vi : enUS);

  // useForm hook
  const {
    control,
    watch,
    reset,
    formState: {},
  } = useForm<QuestionSchema>({
    resolver: zodResolver(questionSchema),
  });
  const code = watch('code');

  // Xử lý chỉnh sửa câu trả lời
  const handleEdit = (answerId: string, content: string, code?: string) => {
    setEditingAnswerId(answerId);
    setEditedContent(content);
    if (code) {
      setEditedCode(code); // Nếu có code, chỉnh sửa code thay vì nội dung text
    }
  };

  const handleSaveEdit = async (answerId: string) => {
    if (editedContent.trim()) {
      await editAnswerMutation.mutateAsync({
        answerId,
        payload: {
          content: editedContent,
          code: { fileType: 'javascript', code: editedCode }, // Cập nhật code
        },
      });
      setEditingAnswerId(null);
      setEditedContent('');
      setEditedCode('');
    }
  };

  const handleCancelEdit = () => {
    setEditingAnswerId(null);
  };

  // Xử lý hiển thị thêm bình luận
  const handleShowMore = () => {
    setVisibleComments((prev) => prev + 4);
    setTimeout(() => {
      lastCommentRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 100);
  };

  // Xử lý lưu code
  const handleSave = () => {
    if (code?.trim()) {
      setHasCode(true);
      setShowCodeEditor(false);
    }
  };

  // Xử lý upload ảnh
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

  // Xử lý gửi câu trả lời
  const handleSubmit = async () => {
    const answer = inputRef.current?.value?.trim();
    const trimmedCode = code?.trim();

    if (!answer && !trimmedCode && images.length === 0) return;

    setIsPending(true); // Bắt đầu loading

    let uploadedImages: string[] = [];
    if (images.length > 0) {
      try {
        const uploadResult = await uploadImages(images);
        uploadedImages = uploadResult?.files.map((file) => file.filename) || [];
      } catch (error) {
        console.error('Upload failed', error);
        setIsPending(false);
        return;
      }
    }

    const payload = {
      questionId,
      content: answer || '',
      images: uploadedImages,
      ...(trimmedCode && {
        code: {
          fileType: selectedLanguage,
          code: trimmedCode,
        },
      }),
    };

    await mutateAsync(payload);
    setIsPending(false); // Kết thúc loading

    if (inputRef.current) inputRef.current.value = '';
    reset();
    setImages([]);
    setHasCode(false);
    setShowCodeEditor(false);
    setSelectedLanguage('typescript');
  };

  // Xử lý sự kiện Enter để gửi bình luận
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Sắp xếp dữ liệu câu trả lời dựa trên số vote
  const sortedData = data
    ?.map((item) => {
      const votes = item.votes || [];
      const totalVotes =
        votes.filter((v) => v.voteType === 'up').length -
        votes.filter((v) => v.voteType === 'down').length;

      return { ...item, totalVotes };
    })
    .sort((a, b) => b.totalVotes - a.totalVotes);

  // useEffect để theo dõi comment nổi bật
  useEffect(() => {
    if (highlightedCommentId) {
      setTimeout(() => {
        commentRefs.current[highlightedCommentId]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 100);

      setTimeout(() => setHighlightedCommentId(null), 3000);
    }
  }, [sortedData, highlightedCommentId]);

  // Debug log dữ liệu câu trả lời
  console.log('Cấu trúc của data:', data);
  data?.forEach((item) => {
    if (Array.isArray(item.votes)) {
      console.log(`Cấu trúc votes tại item:`, item.votes);
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      if (lastCommentRef.current) {
        const commentRect = lastCommentRef.current.getBoundingClientRect();
        // Show button when last comment is in viewport (or slightly above)
        const isLastCommentVisible = commentRect.top <= window.innerHeight;
        setShowScrollButton(isLastCommentVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sortedData]); // Add sortedData to dependency array

  return (
    <div ref={answerSectionRef}>
      {sortedData?.slice(0, visibleComments).map((item, index, arr) => (
        <div
          key={item._id}
          ref={(el) => {
            commentRefs.current[item._id] = el;
            if (index === arr.length - 1) {
              lastCommentRef.current = el;
            }
          }}
          className={`
            relative pl-6 border-l-2 border-primary-500
            transition-all duration-500 ease-in-out
            pr-6 pt-2
            ${
              highlightedCommentId === item._id
                ? 'bg-primary-500/25  rounded-xl  max-w-max'
                : 'bg-transparent'
            }
          `}
        >
          {item.votes ? (
            <Vote
              questionId={questionId}
              answerId={item._id}
              votes={item.votes}
              onVote={() => setHighlightedCommentId(item._id)} // Lưu ID bình luận sau khi vote
            />
          ) : (
            <>placehodle</>
          )}

          <div className='mb-14 '>
            <div className='flex items-center gap-3 z-20'>
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
                onEdit={() =>
                  handleEdit(item._id, item.content, item.code?.code)
                }
              />
            </div>
            {item.content && (
              <div className='mt-3'>
                {editingAnswerId === item._id ? (
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className='w-full p-2 '
                    rows={3}
                  />
                ) : (
                  <p className=' text-lg text-neutral-700 whitespace-pre-wrap break-words'>
                    {item.content}
                  </p>
                )}
              </div>
            )}

            {item.images && <ImageRender images={item.images} />}
            {item.code?.code && (
              <div className=' border border-gray-300 rounded-lg overflow-hidden shadow-sm mt-3'>
                {editingAnswerId === item._id ? (
                  <div>
                    <MonacoEditor
                      className='h-[300px]'
                      value={editedCode}
                      theme='vs-dark'
                      language={item.code.fileType || 'javascript'}
                      options={{
                        readOnly: false,
                        domReadOnly: false,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                      }}
                      onChange={(newValue) => setEditedCode(newValue || '')}
                    />
                  </div>
                ) : (
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
                )}
              </div>
            )}

            {(item.code?.code || item.content) && (
              <div className='flex mt-2 justify-end'>
                {editingAnswerId === item._id ? (
                  <div className='flex gap-2'>
                    <Button
                      onClick={() => handleSaveEdit(item._id)}
                      className='px-4 py-2 rounded-md'
                    >
                      {t('save')}
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      className='px-4 py-2 bg-neutral-400 hover:bg-error-500 rounded-md'
                    >
                      {t('cancel')}
                    </Button>
                  </div>
                ) : null}
              </div>
            )}
            <div className='mt-1 flex justify-start items-center gap-4 text-neutral-700 text-sm'>
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
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-32 right-[40%] p-2 text-white bg-primary-500 rounded-full shadow-lg hover:bg-primary-600 transition-colors duration-300'
          aria-label='Scroll to top'
        >
          <ChevronDoubleUpIcon className='size-6' />
        </button>
      )}
      <div className='sticky z-30 translate-x-[-50px] bottom-8 left-0 w-[113%] bg-card mx-auto pb-14 pt-3 md:py-4 md:bottom-0'>
        {images.length > 0 && (
          <div className='flex items-center gap-2 py-2 '>
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
        {/* input bình luận */}
        <div className='mt-4 bg-card flex items-center gap-2'>
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
            className='w-[70%] placeholder-neutral-400 focus:placeholder-neutral-600 p-2 border border-primary-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
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
              disabled={isPending}
              onClick={handleSubmit}
              className={`p-2 rounded-full flex items-center justify-center ${
                isPending
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:text-primary-500'
              }`}
            >
              {isPending ? (
                <div className='h-6 w-6 border-4 border-transparent border-t-neutral-900 border-l-neutral-900 rounded-full animate-spin'></div>
              ) : (
                <SendIcon className='size-6' />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerSection;
