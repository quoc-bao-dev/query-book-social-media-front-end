 
'use client';

import Avatar from '@/components/common/Avatar';
import CodeIcon from '@/components/icons/CodeIcon';
import SendIcon from '@/components/icons/SendIcon';
import { Dialog, DialogContent } from '@/components/ui/dialog'; // Nếu bạn có thư viện UI hoặc có thể tự custom modal
import { useAnswerMutation, useAnswerQuery } from '@/queries/answer';
import { useAuth } from '@/store/authSignal';
import { QuestionResponse } from '@/types/question';
import { zodResolver } from '@hookform/resolvers/zod';
import MonacoEditor from '@monaco-editor/react';
import { formatDistanceToNow } from 'date-fns';
import { ImageIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import LanguageSeletor from '../../ask-question/partials/LanguageSeletor';
import { QuestionSchema } from '../../ask-question/schema/questionSchema';
import QuestionSection from './partials/QuestionSection';
import { questionSchema } from './schema/questionSchema';

type QuestionDetailsProps = {
  question: QuestionResponse;
};
const QuestionDetails = ({ question }: QuestionDetailsProps) => {
  // FIXME: use react hook form

  const inputRef = useRef<HTMLInputElement>(null);
  const { data } = useAnswerQuery(question._id);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('typescript');

  const { mutateAsync } = useAnswerMutation(question._id);
  const { user } = useAuth();
  const {
    control,
    formState: { errors },
  } = useForm<QuestionSchema>({
    resolver: zodResolver(questionSchema),
  });

  const handleSubmit = () => {
    const answer = inputRef.current?.value;
    if (!answer) return;
    mutateAsync({
      content: answer,
    }).then(() => {
      if (inputRef.current?.value) inputRef.current.value = '';
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  console.log('[answers]', data);

  return (
    <div className='mx-35 p-4 bg-card max-h-full pt-20 px-14'>
      {/* Câu hỏi */}

      <QuestionSection question={question} />
      {/* Phản hồi */}
      {data?.map((item) => (
        <div key={item._id} className='mt-2 pl-6 border-l-2 border-gray-200'>
          <div className='flex items-center gap-3'>
            <div className='flex items-center space-x-2'>
              <Avatar
                src={item.userId.avatarUrl!}
                className='w-10 h-10 rounded-full'
                fallBack={`${question.userId.firstName} ${question.userId.lastName} `}
              />
              <p className='font-semibold'>
                {item.userId.firstName} {item.userId.lastName}
              </p>
              <p className='text-2xl text-neutral-500 '>•</p>
              <p className='text-sm text-gray-500'>
                {item.createdAt &&
                  formatDistanceToNow(item.createdAt, { addSuffix: true })}
              </p>
            </div>
          </div>

          <p className='mt-1 text-lg text-neutral-600'>{item.content}</p>
          <div className='mt-2 flex items-center gap-2 text-accent-foreground'></div>
        </div>
      ))}

      <div className='mt-4 flex items-center justify-start gap-2'>
        <Avatar
          src={user?.avatarUrl}
          className='w-10 h-10 rounded-full'
          fallBack={`${user?.fullName} `}
        />
        <input
          ref={inputRef}
          type='text'
          placeholder='Write a reply...'
          className='w-[80%] p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          onKeyDown={handleKeyDown}
        />
        <div className='flex items-center gap-1'>
          <button className='p-2 rounded-lg hover:text-primary-600'>
            <ImageIcon className='w-6 h-6' />
          </button>
          <button
            onClick={() => setShowCodeEditor(true)}
            className='p-2 rounded-lg hover:text-primary-600'
          >
            <CodeIcon className='w-6 h-6' />
          </button>
          {showCodeEditor && (
            <Dialog open={showCodeEditor} onOpenChange={setShowCodeEditor}>
              <DialogContent className='max-w-2xl bg-neutral-700 p-5 rounded-lg'>
                <div className='flex justify-between items-center mb-4'>
                  <h3 className='text-xl font-semibold text-neutral-200'>
                    Code Snippet
                  </h3>
                  <button
                    onClick={() => setShowCodeEditor(false)}
                    className=''
                  ></button>
                </div>

                {/* Selector chọn ngôn ngữ */}
                <p className='text-neutral-200 font-semibold'>
                  Select Language
                </p>
                <LanguageSeletor
                  curLaguage={selectedLanguage}
                  setCurlanguage={setSelectedLanguage}
                  className='mb-4 text-neutral-800 hover:bg-input'
                />

                {/* Monaco Editor */}
                <Controller
                  name='code'
                  control={control}
                  render={({ field }) => (
                    <MonacoEditor
                      onChange={field.onChange}
                      language={selectedLanguage}
                      height={400}
                      value={`const helloWorld = () => {};`}
                      theme='vs-dark'
                    />
                  )}
                />
                <button className='p-2 rounded-lg text-neutral-200 hover:text-primary-600 flex items-center justify-end gap-2'>
                  <SendIcon className='w-7 h-7' />
                </button>
              </DialogContent>
            </Dialog>
          )}

          <button
            onClick={handleSubmit}
            className=' p-2  rounded-lg hover:text-primary-600'
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetails;
