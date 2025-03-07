/* eslint-disable @next/next/no-img-element */
import CodeIcon from '@/components/icons/CodeIcon';
import SendIcon from '@/components/icons/SendIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/store/authSignal';
import { SaveQuestionResponse } from '@/types/saveQuestion';
import { getFirstCharacter } from '@/utils/nameUtilts';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';
import { ImageIcon } from 'lucide-react';
import { useState } from 'react';
import ActionBar from '../../detail-qna/partials/ActionBar';
import CodeEditor from '../../partials/CodeEditor';
import DropdownMenu from '../../partials/DropdownMenu';
import HashTagPost from '../../partials/HashTagPost';
import ImageRender from '../../partials/ImageRender';
import FileType from '../../partials/FileType';
import QuestionTitle from '../../partials/QuestionTitle';
import QuestionContent from '../../partials/QuestionContent';
import Link from 'next/link';

interface PostProps {
  post: SaveQuestionResponse;
}

const PostsMySave = ({ post }: PostProps) => {
  // console.log('hehehe', post.questionId.images);

  const { user } = useAuth();

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const isValidCode = (code: string | undefined) => {
    if (!code) return false;
    const trimmedCode = code.trim();
    const isOnlyComment = /^(\s*\/\/.*|\s*)$/.test(trimmedCode);
    return trimmedCode.length > 0 && !isOnlyComment;
  };

  return (
    <div className='rounded-lg shadow-lg p-4 mb-6 border border-border bg-card'>
      {/* Header */}
      <div className='flex items-center justify-between mt-3'>
        <div className='flex items-center space-x-2'>
          <Avatar className='w-10 h-10 rounded-full'>
            <AvatarImage src={post.questionId.userId.avatarUrl ?? undefined} />

            <AvatarFallback>
              {getFirstCharacter(post.questionId.userId.firstName!)}
            </AvatarFallback>
          </Avatar>
          <p className='font-semibold'>
            {post.questionId.userId.firstName} {post.questionId.userId.lastName}
          </p>
          <p className='text-2xl text-neutral-500'>•</p>
          <p className='text-sm text-neutral-500'>
            {post.questionId.createdAt &&
              formatDistanceToNow(post.questionId.createdAt, {
                addSuffix: true,
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
      <Link href={`/qna/${post.questionId._id}`}>
        <QuestionTitle title={post.questionId.title!} />
      </Link>

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
        <ActionBar id={post.questionId._id!} />
        {isValidCode(post.questionId.code?.code) && (
          <FileType fileType={post.questionId.code?.fileType || 'plaintext'} />
        )}
      </div>

      {/* Reply Section */}
      <div className='mt-4 flex items-center gap-3'>
        <img
          src={user?.avatarUrl}
          alt='user'
          className='w-10 h-10 rounded-full'
        />
        <input
          type='text'
          placeholder='Write a reply...'
          className='w-[80%] p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
        />
        <div className='flex items-center gap-1'>
          <button className='p-2 rounded-lg hover:text-primary-600'>
            <ImageIcon className='w-6 h-6' />
          </button>
          <button className='p-2 rounded-lg hover:text-primary-600'>
            <CodeIcon className='w-6 h-6' />
          </button>

          <button className=' p-2  rounded-lg hover:text-primary-600'>
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsMySave;
