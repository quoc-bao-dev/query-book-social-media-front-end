import MonacoEditor from '@monaco-editor/react';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import ActionBar from '../../../detail-qna/partials/ActionBar';
import { QuestionResponse } from '@/types/question';
import Avatar from '@/components/common/Avatar';

const QuestionSection = ({ question }: { question: QuestionResponse }) => {
  const isValidCode = (code: string | undefined) => {
    if (!code) return false; // Không có dữ liệu
    const trimmedCode = code.trim();

    // Kiểm tra nếu code chỉ chứa comment hoặc khoảng trắng
    const isOnlyComment = /^(\s*\/\/.*|\s*)$/.test(trimmedCode);
    return trimmedCode.length > 0 && !isOnlyComment;
  };

  return (
    <div className='bg-card p-4'>
      <Link
        href='/qna'
        className='flex items-center justify-center w-10 h-10 mb-3 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-700'
      >
        <ArrowLeftIcon className='w-6 h-6' />
      </Link>

      {/* User Info */}
      <div className='flex items-center gap-3'>
        <Avatar
          src={question.userId.avatarUrl!}
          className='w-10 h-10 rounded-full'
          fallBack={`${question.userId.firstName} ${question.userId.lastName} `}
        />
        <div className='flex justify-center items-center gap-2'>
          <p className='font-semibold text-neutral-500'>
            {question.userId.firstName} {question.userId.lastName}
          </p>
          <p className='text-2xl text-neutral-500 '>•</p>
          <p className='text-sm text-neutral-500 '>
            {question.createdAt && (
              <span>
                {formatDistanceToNow(new Date(question.createdAt), {
                  addSuffix: true,
                })}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Question Content */}
      <h2 className='mt-2 text-3xl font-semibold text-neutral-900'>
        {question.title}
      </h2>
      <div className='mt-2 text-lg text-neutral-600 whitespace-pre-wrap break-words'>
        {question.question}
      </div>

      {/* Hashtags */}
      {question?.hashtags.map((item: any) => (
        <span
          key={item._id}
          className='text-xs bg-info-100 text-info-500 px-2 py-1 mr-1 rounded-md cursor-pointer'
        >
          #{item.name}
        </span>
      ))}

      {/* Code Block */}
      {isValidCode(question.code?.code) && (
        <MonacoEditor
          className='h-[350px] pt-[10px]'
          value={question.code.code}
          theme='vs-dark'
          language={question.code.fileType}
          options={{ readOnly: true, domReadOnly: true }}
        />
      )}

      <div className='flex justify-between items-center'>
        <ActionBar id={question._id} />
        {isValidCode(question.code?.code) && (
          <p className='mt-2 text-info-500 capitalize border border-info-400 px-2 py-1 rounded-lg bg-info-100 text-xs'>
            {question.code.fileType}
          </p>
        )}
      </div>
    </div>
  );
};

export default QuestionSection;
