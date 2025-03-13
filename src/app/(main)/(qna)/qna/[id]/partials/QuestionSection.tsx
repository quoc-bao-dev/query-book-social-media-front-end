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

const QuestionSection = ({ question }: { question: QuestionResponse }) => {
  console.log('question section', question);

  const isValidCode = (code: string | undefined) => {
    if (!code) return false; // Không có dữ liệu
    const trimmedCode = code.trim();

    // Kiểm tra nếu code chỉ chứa comment hoặc khoảng trắng
    const isOnlyComment = /^(\s*\/\/.*|\s*)$/.test(trimmedCode);
    return trimmedCode.length > 0 && !isOnlyComment;
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
