'use client';
import { UserResponse } from '@/types/user';

import ActionBar from '../../detail-qna/partials/ActionBar';
import CodeEditor from '../../partials/CodeEditor';
import FileType from '../../partials/FileType';
import HashTagPost from '../../partials/HashTagPost';
import ImageRender from '../../partials/ImageRender';
import QuestionContent from '../../partials/QuestionContent';
import QuestionTitle from '../../partials/QuestionTitle';
import PostUserInfoMyQuestion from './PostUserInfoMyQuestion';
interface Post {
  _id: string;
  title: string;
  question: string;
  createdAt?: string;
  code?: {
    code?: string;
    fileType?: string;
  };
  imageUrl?: string;
  images?: string[];
  hashtags: { name: string }[];
  likes?: number;
  comments?: string[];
}

const isValidCode = (code: string | undefined) => {
  if (!code) return false; // Không có dữ liệu
  const trimmedCode = code.trim();

  // Kiểm tra nếu code chỉ chứa comment hoặc khoảng trắng
  const isOnlyComment = /^(\s*\/\/.*|\s*)$/.test(trimmedCode);
  return trimmedCode.length > 0 && !isOnlyComment;
};

const PostsMyQuestion = ({
  post,
  user,
  searchTerm,
}: {
  post: Post;
  user: UserResponse;
  searchTerm: string;
}) => {
  return (
    <div className='rounded-lg shadow-lg p-4 mb-6 border border-border bg-card'>
      {/* User Info */}
      <PostUserInfoMyQuestion
        avatarUrl={user?.avatarUrl}
        fullName={user?.fullName}
        createdAt={post?.createdAt ?? ''}
      />

      {/* Title */}
      <QuestionTitle
        postId={post._id}
        title={post.title}
        searchTerm={searchTerm}
      />

      {/* Content */}
      <QuestionContent content={post.question} />

      {/* Image */}
      {post.images && <ImageRender images={post.images} />}
      {/* Code Editor */}
      {isValidCode(post.code?.code) && (
        <CodeEditor
          code={post.code?.code || ''}
          fileType={post.code?.fileType || 'plaintext'}
        />
      )}
      {/* Hashtags */}
      <HashTagPost hashtags={post?.hashtags} />

      {/* Actions */}
      <div className='flex justify-between items-center'>
        <ActionBar id={post._id} countComment={post.comments?.length || 0} />
        {isValidCode(post.code?.code) && (
          <FileType fileType={post.code?.fileType || 'plaintext'} />
        )}
      </div>
    </div>
  );
};

export default PostsMyQuestion;
