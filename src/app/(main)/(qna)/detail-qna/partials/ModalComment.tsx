/* eslint-disable @next/next/no-img-element */
'use client';
import Avatar from '@/components/common/Avatar';
import Modal from '@/components/common/Modal';
import ChatBubbleOvalLeftIcon from '@/components/icons/ChatBubbleOvalLeftIcon';
import CodeIcon from '@/components/icons/CodeIcon';
import HeartIcon from '@/components/icons/HeartIcon';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { Button } from '@/components/common/Button';
import SendIcon from '@/components/icons/SendIcon';
import {
  useAnswerMutation,
  useAnswerQuery,
  useEditAnswerMutation,
} from '@/queries/answer';
import { useAuth } from '@/store/authSignal';
import { uploadImages } from '@/utils/uploadUtils';
import { ChevronDoubleUpIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import MonacoEditor from '@monaco-editor/react';
import { formatDistanceToNow } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';
import { ImageIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import LanguageSeletor from '../../ask-question/partials/LanguageSeletor';
import { QuestionSchema } from '../../ask-question/schema/questionSchema';
import CommentOptions from '../../partials/CommentOptions';
import ImageRender from '../../partials/ImageRender';
import ModalError from '../../partials/ModalError';
import Vote from '../../partials/Vote';
import { questionSchema } from '../../qna/[id]/schema/questionSchema';

type ModalCommentProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
};
const ModalComment = ({ isOpen, onClose, id }: ModalCommentProps) => {
  // 1. Hooks và State
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('typescript');
  const [hasCode, setHasCode] = useState(false);
  const [visibleComments, setVisibleComments] = useState(5);
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
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const commentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const lastCommentRef = useRef<HTMLDivElement | null>(null);
  const commentsContainerRef = useRef<HTMLDivElement>(null);

  // 2. API Hooks (Queries & Mutations)
  const { user } = useAuth();
  const currentUserId = user?.id;

  const { data } = useAnswerQuery(id);
  const editAnswerMutation = useEditAnswerMutation(id);
  const { mutateAsync } = useAnswerMutation(id);

  // 3. Form Handling
  const {
    control,
    watch,
    reset,
    formState: {},
  } = useForm<QuestionSchema>({
    resolver: zodResolver(questionSchema),
  });

  const code = watch('code');

  // 4. Localization
  const t = useTranslations('ModalComment');
  const locale = t('locale'); // Ví dụ: "en" hoặc "vi"
  const getLocale = (locale: string) => {
    return locale === 'vi' ? vi : enUS;
  };

  // 5. Handlers (Event Functions)
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

  const handleSave = () => {
    if (code?.trim()) {
      setHasCode(true);
      setShowCodeEditor(false);
    }
  };

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
      id,
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

  const handleShowMore = () => {
    setVisibleComments((prev) => prev + 4);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleScroll = () => {
    if (commentsContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        commentsContainerRef.current;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;
      setShowScrollToTop(isNearBottom);
    }
  };

  // 6. Data Processing (Before Render)
  const sortedData = data
    ?.map((item) => {
      const votes = item.votes || [];
      const totalVotes =
        votes.filter((v) => v.voteType === 'up').length -
        votes.filter((v) => v.voteType === 'down').length;

      return { ...item, totalVotes };
    })
    .sort((a, b) => b.totalVotes - a.totalVotes);

  // 7. useEffect (Side Effects)
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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className='mt-14 bg-card p-3 sm:p-6 rounded-xl shadow-2xl w-[90%] sm:w-[600px] md:w-[750px] lg:w-[900px] max-w-full 
  h-full max-h-[90vh] flex flex-col ml-4 sm:ml-0'
      >
        {/* Header */}
        <div className='flex justify-between items-center border-b pb-4'>
          <h2 className='text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900'>
            {t('comment')}
          </h2>

          <button
            onClick={onClose}
            className='text-neutral-700 hover:text-neutral-300 transition text-xl font-bold'
          >
            <XCircleIcon className='size-8' />
          </button>
        </div>

        {/* Nội dung bình luận */}
        <div
          ref={commentsContainerRef}
          onScroll={handleScroll}
          className='mt-4 space-y-4 overflow-y-auto max-h-[60vh] pr-2 scrollbar scrollbar-w-[4px] scrollbar-thumb-gray-400 scrollbar-track-transparent'
        >
          {sortedData && sortedData.length > 0 ? (
            sortedData.slice(0, visibleComments).map((item, index, arr) => (
              <div
                key={item._id}
                ref={(el) => {
                  commentRefs.current[item._id] = el;
                  if (index === arr.length - 1) {
                    lastCommentRef.current = el;
                  }
                }}
                className={`
                  relative mt-5 ml-14 pl-6 pr-6 pt-2 border-l-2 border-primary-500
                   transition-all duration-500 ease-in-out
                  ${
                    highlightedCommentId === item._id
                      ? 'bg-primary-500/25 rounded-xl max-w-max'
                      : 'bg-transparent'
                  }
                `}
              >
                <div className='absolute left-[-5px] top-1/2 -translate-y-1/2'>
                  {typeof item.votes !== 'undefined' ? (
                    <Vote
                      questionId={id}
                      answerId={item._id}
                      votes={item.votes}
                      onVote={() => setHighlightedCommentId(item._id)}
                    />
                  ) : (
                    <div className='flex items-center justify-center text-neutral-400'>
                      No votes yet
                    </div>
                  )}
                </div>

                <div className='mb-14'>
                  <div className='flex items-center gap-3'>
                    <Avatar
                      src={item.userId.avatarUrl!}
                      className='w-10 h-10 rounded-full'
                      fallBack={`${item.userId.firstName} ${item.userId.lastName}`}
                    />
                    <p className='font-semibold cursor-pointer'>
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
                  {editingAnswerId === item._id ? (
                    <div className='mt-1'>
                      <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className='w-full p-2 border-2 border-neutral-500 rounded-lg '
                        rows={3}
                      />
                    </div>
                  ) : (
                    <p className='mt-1 text-lg text-neutral-700 whitespace-pre-wrap break-words'>
                      {item.content}
                    </p>
                  )}

                  {item.images && <ImageRender images={item.images} />}

                  {item.code?.code && (
                    <div className='mt-3 border border-gray-300 rounded-lg overflow-hidden shadow-sm'>
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
                            onChange={(newValue) =>
                              setEditedCode(newValue || '')
                            }
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
                  {editingAnswerId === item._id && (
                    <div className='flex gap-2 mt-2 justify-end'>
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
                  )}

                  <div className='mt-2 flex justify-start items-center gap-4 text-neutral-700 text-sm'>
                    <p>
                      {item.createdAt &&
                        (new Date().getTime() -
                          new Date(item.createdAt).getTime() <
                        60000
                          ? t('justnow') // Hiển thị "Vừa xong" hoặc "Just now"
                          : formatDistanceToNow(new Date(item.createdAt), {
                              addSuffix: true,
                              locale: getLocale(locale),
                            }))}
                    </p>
                    <p className='text-2xl text-neutral-500'>•</p>

                    <button className='mt-0.5 flex items-center gap-1 font-semibold hover:text-primary-600 transition'>
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
            ))
          ) : (
            <p className='text-center text-neutral-600 font-semibold text-lg mt-4'>
              {t('nocomment')}
            </p>
          )}

          {showScrollToTop && (
            <button
              onClick={() => {
                commentsContainerRef.current?.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }}
              className='fixed bottom-40 right-1/2 bg-primary-500 hover:bg-primary-600 text-white rounded-full p-2 shadow-lg transition-all duration-300 z-50'
              style={{
                transform: 'translateX(50%)',
              }}
            >
              <ChevronDoubleUpIcon className='size-6' />
            </button>
          )}

          {data && visibleComments < data.length && (
            <button
              onClick={handleShowMore}
              className='mt-2 text-primary-600 hover:underline'
            >
              {t('morecomment')}
            </button>
          )}

          <ModalError
            isOpen={isErrorModalOpen}
            onClose={() => setIsErrorModalOpen(false)}
            message={errorMessage || ''}
          />

          <div className='border-t pt-4 bg-card sticky bottom-[-1px]'>
            {images.length > 0 && (
              <div className='ml-12  flex gap-2 py-2 z-50'>
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
                          setImages((prev) =>
                            prev.filter((_, i) => i !== index),
                          )
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
                    <span className='text-2xl text-neutral-500'>+</span>
                  </button>
                )}
                <button
                  onClick={() => setImages([])}
                  className='mt-2 text-primary-600 hover:underline'
                >
                  {t('clearall')}
                </button>
              </div>
            )}
            {/* Input bình luận */}
            <div className='sm:z-50 z-50 pb-1 flex items-center gap-2'>
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
                className='w-[80%]  placeholder-neutral-400 focus:placeholder-neutral-600  p-2 border border-primary-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                onKeyDown={handleKeyDown}
              />

              <div className='flex items-center gap-1'>
                <button
                  className='p-2 rounded-lg hover:text-primary-600'
                  onClick={handleUploadIamges}
                >
                  <ImageIcon className='size-6' strokeWidth={2} />
                </button>
                <button
                  onClick={() => setShowCodeEditor(true)}
                  className='relative p-2 rounded-lg hover:text-primary-600'
                >
                  <CodeIcon className='size-6' />

                  {/* Hiển thị dấu chấm đỏ nếu có code */}
                  {hasCode && (
                    <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
                  )}
                </button>

                {showCodeEditor && (
                  <Dialog
                    open={showCodeEditor}
                    onOpenChange={setShowCodeEditor}
                  >
                    <DialogContent className='max-w-2xl bg-card p-5 rounded-lg'>
                      {/* Ẩn DialogTitle để tránh lỗi accessibility */}
                      <VisuallyHidden>
                        <DialogTitle>{t('codesnippet')}</DialogTitle>
                      </VisuallyHidden>

                      <p className='text-2xl text-center font-semibold text-neutral-900'>
                        {t('codesnippet')}
                      </p>
                      <p className='text-neutral-900 font-semibold'>
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
                              value={field.value}
                              height={400}
                              theme='vs-dark'
                            />

                            <div className='flex justify-end gap-2 mt-4'>
                              <Button
                                onClick={() => {
                                  field.onChange('');
                                  setHasCode(false);
                                }}
                                className='px-4 py-2 rounded-lg bg-neutral-400 text-white shadow-md transition-all duration-300 ease-in-out hover:bg-error-200 hover:shadow-lg active:scale-95'
                              >
                                {t('clear')}
                              </Button>

                              <Button
                                onClick={handleSave}
                                className='px-4 py-2 rounded-lg text-white shadow-md transition-all duration-300 ease-in-out hover:bg-primary-400 hover:shadow-lg active:scale-95'
                              >
                                {t('save')}
                              </Button>
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
      </div>
    </Modal>
  );
};

export default ModalComment;
