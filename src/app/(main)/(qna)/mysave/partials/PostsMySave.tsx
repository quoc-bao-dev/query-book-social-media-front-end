/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import MonacoEditor from '@monaco-editor/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import ActionBar from '../../detail-qna/partials/ActionBar';
import SendIcon from '@/components/icons/SendIcon';
import CodeIcon from '@/components/icons/CodeIcon';
import { ImageIcon } from 'lucide-react';
import { SaveQuestionResponse } from '@/types/saveQuestion';
import DropdownMenu from '../../partials/DropdownMenu';
import { useAuth } from '@/store/authSignal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getFirstCharacter } from '@/utils/nameUtilts';
import ImageRender from '../../partials/ImageRender';

interface PostProps {
  post: SaveQuestionResponse;
}

const PostsMySave = ({ post }: PostProps) => {
  console.log('hehehe', post);

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
      <p className='mt-2 text-3xl font-semibold text-neutral-900'>
        {post.questionId.title}
      </p>
      {/* Content */}
      <div className='mt-2 text-lg text-neutral-600 whitespace-pre-wrap break-words'>
        {post.questionId.question}
      </div>
      {/* image  */}
      {post.questionId?.images && (
        <ImageRender images={post.questionId?.images} />
      )}

      {/* Hashtags */}
      {post.questionId?.hashtags &&
        post.questionId?.hashtags?.length > 0 &&
        post.questionId.hashtags.map((tag, index) => (
          <span
            key={index}
            className='text-xs bg-info-100 text-info-500 px-2 py-1 mr-1 rounded-md cursor-pointer'
          >
            #{tag.name}
          </span>
        ))}

      {/* Code Editor */}
      {isValidCode(post.questionId.code?.code) && (
        <MonacoEditor
          className='h-[300px] pt-[10px]'
          value={post.questionId.code?.code}
          theme='vs-dark'
          language={post.questionId.code?.fileType}
          options={{ readOnly: true, domReadOnly: true }}
        />
      )}

      {/* Actions */}
      <div className='flex justify-between items-center'>
        <ActionBar id={post.questionId._id!} />
        {isValidCode(post.questionId.code?.code) && (
          <p className='mt-2 text-info-500 capitalize border border-info-400 px-2 py-1 rounded-lg bg-info-100 text-xs'>
            {post.questionId.code?.fileType}
          </p>
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
