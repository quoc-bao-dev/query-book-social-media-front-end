/* eslint-disable @next/next/no-img-element */

'use client';
import SendIcon from '@/components/icons/SendIcon';
import { UserResponse } from '@/types/user';
import DropdownMenu from '../../partials/DropdownMenu';

import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import MonacoEditor from '@monaco-editor/react';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import ActionBar from '../../detail-qna/partials/ActionBar';
import { ImageIcon } from 'lucide-react';
import CodeIcon from '@/components/icons/CodeIcon';
interface Post {
  _id: string;
  title: string;
  question: string;
  createdAt: string;
  code?: {
    code?: string;
    fileType?: string;
  };
  imageUrl?: string;
  hashtags: { name: string }[];
  likes: number;
  comments: number;
}

const PostsMyQuestion = ({
  post,
  user,
}: {
  post: Post;
  user: UserResponse;
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div className='rounded-lg shadow-lg p-4 mb-6 border border-border bg-card'>
      {/* User Info */}
      <div className='flex items-center justify-between mt-3 '>
        <div className='flex items-center space-x-2'>
          <img
            src={user?.avatarUrl}
            alt='user'
            className='w-10 h-10 rounded-full'
          />
          <div className='flex justify-around items-center gap-2'>
            <p className='font-semibold text-neutral-900'>{user?.fullName}</p>
            <p className='text-2xl text-neutral-500 '>•</p>
            <p className='text-sm text-neutral-500'>
              {post?.createdAt &&
                formatDistanceToNow(post?.createdAt, { addSuffix: true })}
            </p>
          </div>
        </div>

        {/* Menu */}
        <button onClick={toggleMenu} className='relative'>
          <EllipsisVerticalIcon className='h-6 w-6 text-gray-500' />
          {showMenu && <DropdownMenu />}
        </button>
      </div>

      {/* Title */}
      <h2 className='mt-2 text-3xl font-semibold text-neutral-900'>
        {post.title}
      </h2>

      {/* Content */}
      <p className='mt-2 text-lg text-neutral-600'>{post.question}</p>

      {/* Hashtags */}
      {post?.hashtags.map((item: any) => (
        <span
          key={item._id}
          className='text-xs bg-info-100 text-info-500 px-2 py-1 mr-1 rounded-md cursor-pointer'
        >
          #{item.name}
        </span>
      ))}

      {/* Code Editor */}
      {post.code?.code && (
        <MonacoEditor
          className='h-[300px] pt-[10px]'
          value={post.code.code}
          theme='vs-dark'
          language={post.code.fileType}
          options={{ readOnly: true, domReadOnly: true }}
        />
      )}

      {/* Image */}
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt='Post Image'
          className='w-full h-[500px] object-cover mx-auto mt-4 rounded-lg'
        />
      )}

      {/* Actions */}
      <ActionBar id={post._id} />

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
          className='w-[50%] p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
        />
        <div className='flex items-center gap-1'>
          <button className='p-2 rounded-lg hover:text-primary-600'>
            <ImageIcon className='w-6 h-6' />
          </button>
          <button className='p-2 rounded-lg hover:text-primary-600'>
            <CodeIcon className='w-6 h-6' />
          </button>

          <button className='p-2  rounded-lg hover:text-primary-600'>
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsMyQuestion;
