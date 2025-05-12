'use client';
import { QuestionResponse } from '@/types/question';
import { formatDistanceToNow } from 'date-fns';
import ActionBar from '../../../detail-qna/partials/ActionBar';
import AvatarUser from '../../../partials/AvatarUser';
import ButtonBack from '../../../partials/ButtonBack';
import CodeEditor from '../../../partials/CodeEditor';
import FileType from '../../../partials/FileType';
import HashTagPost from '../../../partials/HashTagPost';
import ImageRender from '../../../partials/ImageRender';
import QuestionContent from '../../../partials/QuestionContent';
import QuestionTitle from '../../../partials/QuestionTitle';
import { useTranslations } from 'next-intl';
import { enUS, vi } from 'date-fns/locale';

const QuestionSection = ({ question }: { question: QuestionResponse }) => {
  const isValidCode = (code: string | undefined) => {
    if (!code) return false; // Không có dữ liệu
    const trimmedCode = code.trim();

    // Kiểm tra nếu code chỉ chứa comment hoặc khoảng trắng
    const isOnlyComment = /^(\s*\/\/.*|\s*)$/.test(trimmedCode);
    return trimmedCode.length > 0 && !isOnlyComment;
  };
  const t = useTranslations('CardQuestion');
  const locale = t('locale'); // Ví dụ: "en" hoặc "vi"
  const getLocale = (locale: string) => {
    return locale === 'vi' ? vi : enUS;
  };

  return (
    <div className='bg-card p-4'>
      <ButtonBack href='/qna' />

      {/* User Info */}
      <div className='flex items-center gap-3'>
        <AvatarUser
          src={question.userId.avatarUrl!}
          firstName={question.userId.firstName}
          lastName={question.userId.lastName}
        />
        <div className='flex justify-center items-center gap-2'>
          <p className='font-semibold text-neutral-500'>
            {question.userId.firstName} {question.userId.lastName}
          </p>
          <p className='text-2xl text-neutral-500 '>•</p>
          <p className='text-sm text-neutral-500 '>
            {question.createdAt &&
              (new Date().getTime() - new Date(question.createdAt).getTime() <
              60000
                ? t('justnow') // Hiển thị "Vừa xong" hoặc "Just now"
                : formatDistanceToNow(new Date(question.createdAt), {
                    addSuffix: true,
                    locale: getLocale(locale),
                  }))}
          </p>
        </div>
      </div>

      {/* Question Title */}
      <QuestionTitle postId={question._id} title={question.title} />

      {/* Question Content */}
      <QuestionContent content={question.question} />

      {/* Image Render */}
      {question.images && question.images?.length > 0 && (
        <ImageRender images={question.images} />
      )}

      {/* Code Block */}
      {isValidCode(question.code?.code) && (
        <CodeEditor
          code={question.code?.code || ''}
          fileType={question.code?.fileType || 'plaintext'}
        />
      )}
      {/* Hashtags */}
      <HashTagPost hashtags={question?.hashtags} />

      <div className='flex justify-between items-center'>
        <ActionBar id={question._id} countComment={0} />
        {isValidCode(question.code?.code) && (
          <FileType fileType={question.code?.fileType || 'plaintext'} />
        )}
      </div>
    </div>
  );
};

export default QuestionSection;
