import Avatar from '@/components/common/Avatar';
import { SaveQuestionResponse } from '@/types/saveQuestion';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import ActionBar from '../../detail-qna/partials/ActionBar';
import CodeEditor from '../../partials/CodeEditor';
import DropdownMenu from '../../partials/DropdownMenu';
import FileType from '../../partials/FileType';
import HashTagPost from '../../partials/HashTagPost';
import ImageRender from '../../partials/ImageRender';
import QuestionContent from '../../partials/QuestionContent';
import QuestionTitle from '../../partials/QuestionTitle';
import { enUS, vi } from 'date-fns/locale';
import { useTranslations } from 'next-intl';

interface PostProps {
  post: SaveQuestionResponse;
  searchTerm: string;
}

const PostsMySave = ({ post, searchTerm }: PostProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const isValidCode = (code: string | undefined) => {
    if (!code) return false;
    const trimmedCode = code.trim();
    return trimmedCode.length > 0; // Chỉ cần có nội dung là đủ
  };

  const t = useTranslations('CardQuestion');
  const locale = t('locale'); // Ví dụ: "en" hoặc "vi"
  const getLocale = (locale: string) => {
    return locale === 'vi' ? vi : enUS;
  };

  return (
    <div className='rounded-lg shadow-lg p-4 mb-6 border border-border bg-card'>
      {/* Header */}
      <div className='flex items-center justify-between mt-3'>
        <div className='flex items-center space-x-2'>
          <Avatar
            className='w-10 h-10 rounded-full'
            src={post?.questionId?.userId?.avatarUrl ?? undefined}
            fallBack={post?.questionId?.userId?.firstName ?? 'User'}
          />
          <p className='font-semibold'>
            {post.questionId.userId?.firstName}{' '}
            {post.questionId.userId?.lastName}
          </p>
          <p className='text-2xl text-neutral-500'>•</p>
          <p className='text-sm text-neutral-500'>
            {post.questionId.createdAt &&
              formatDistanceToNow(new Date(post.questionId.createdAt), {
                addSuffix: true,
                locale: getLocale(locale),
              })}
          </p>
        </div>

        <div className='relative'>
          <button onClick={toggleMenu}>
            <EllipsisVerticalIcon className='h-6 w-6 text-gray-500' />
          </button>
          {showMenu && <DropdownMenu />}
        </div>
      </div>

      {/* Title */}
      <QuestionTitle
        postId={post.questionId._id!}
        title={post.questionId.title!}
        searchTerm={searchTerm}
      />

      {/* Content */}
      <QuestionContent content={post.questionId.question!} />

      {/* image  */}
      {post.questionId?.images && (
        <ImageRender images={post.questionId?.images} />
      )}

      {/* Code Editor */}
      {isValidCode(post.questionId.code?.code) && (
        <CodeEditor
          code={post.questionId.code?.code || ''}
          fileType={post.questionId.code?.fileType || 'plaintext'}
        />
      )}

      {/* Hashtags */}
      {post.questionId?.hashtags && (
        <HashTagPost hashtags={post.questionId.hashtags} />
      )}

      {/* Actions */}
      <div className='flex justify-between items-center'>
        <ActionBar id={post.questionId._id!} countComment={0} />
        {isValidCode(post.questionId.code?.code) && (
          <FileType fileType={post.questionId.code?.fileType || 'plaintext'} />
        )}
      </div>

      {/* Reply Section */}
    </div>
  );
};

export default PostsMySave;
