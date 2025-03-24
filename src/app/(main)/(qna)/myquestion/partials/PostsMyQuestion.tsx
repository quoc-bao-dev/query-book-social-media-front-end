'use client';
import { UserResponse } from '@/types/user';
import MonacoEditor from '@monaco-editor/react';
import ActionBar from '../../detail-qna/partials/ActionBar';
import CodeEditor from '../../partials/CodeEditor';
import FileType from '../../partials/FileType';
import HashTagPost from '../../partials/HashTagPost';
import ImageRender from '../../partials/ImageRender';
import QuestionContent from '../../partials/QuestionContent';
import QuestionTitle from '../../partials/QuestionTitle';
import PostUserInfoMyQuestion from './PostUserInfoMyQuestion';
import {
  useDeleteQuestionMutation,
  useEditQuestionMutation,
} from '@/queries/question';
import { useCallback, useState } from 'react';
import { Button } from '@/components/common/Button';
import { useTranslations } from 'next-intl';
interface Post {
  _id: string;
  title: string;
  question: string;
  createdAt?: string;
  code?: {
    code?: string;
    fileType?: string;
  };
  topic: {
    _id: string;
    name: string;
    description: string;
    interestScore: number;
    __v: number;
  };
  userId: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: {
      _id: string;
      file: string;
      sourceType: string;
      type: string;
      createdAt: string;
    };
  };

  imageUrl?: string;
  images?: string[];
  hashtags: { name: string }[];
  likes?: number;
  comments?: string[];
}
const PostsMyQuestion = ({
  post,
  user,
  searchTerm,
  currentUserId,
}: {
  post: Post;
  user: UserResponse;
  searchTerm?: string;
  currentUserId?: string;
}) => {
  const isOwner = post.userId._id === currentUserId;

  const t = useTranslations('ModalComment');

  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(post.question);
  const [editedCode, setEditedCode] = useState(post.code?.code || '');

  const { mutate: editQuestion } = useEditQuestionMutation();
  const { mutate: deleteQuestion } = useDeleteQuestionMutation();

  const isValidCode = (code: string | undefined) => {
    if (!code?.trim()) return false;
    return !/^(\s*\/\/.*|\s*)$/.test(code.trim());
  };

  // Lưu thay đổi
  const handleSave = useCallback(() => {
    if (!editedQuestion.trim()) return; // Không lưu nếu nội dung rỗng

    editQuestion({
      questionId: post._id,
      payload: {
        question: editedQuestion,
        code: {
          fileType: post.code?.fileType || 'plaintext', // Giữ nguyên loại file
          code: editedCode, // Truyền nội dung code
        },
      },
    });

    // Cập nhật UI ngay lập tức
    post.question = editedQuestion;
    if (post.code) {
      post.code.code = editedCode;
    }

    setIsEditing(false);
  }, [editedQuestion, editedCode, editQuestion, post]);

  // Hủy chỉnh sửa
  const handleCancel = useCallback(() => {
    setEditedQuestion(post.question);
    setIsEditing(false);
  }, [post.question]);

  const handleDelete = useCallback(() => {
    if (!post._id) return;
    deleteQuestion(post._id);
  }, [deleteQuestion, post._id]);
  return (
    <div className='rounded-lg shadow-lg p-4 mb-6 border border-border bg-card'>
      {/* User Info */}
      <PostUserInfoMyQuestion
        avatarUrl={user?.avatarUrl}
        fullName={user?.fullName}
        createdAt={post?.createdAt ?? ''}
        questionId={post._id}
        isOwner={isOwner}
        onEdit={() => setIsEditing(true)}
        onDelete={handleDelete}
      />

      {/* Title */}
      <QuestionTitle
        postId={post._id}
        title={post.title}
        searchTerm={searchTerm}
      />

      {/* Content */}
      {post?.question &&
        (isEditing ? (
          <div>
            <textarea
              className='w-full p-2'
              value={editedQuestion}
              onChange={(e) => setEditedQuestion(e.target.value)}
            />
          </div>
        ) : (
          <QuestionContent content={post.question} />
        ))}

      {/* Image */}
      {post.images && <ImageRender images={post.images} />}
      {/* Code Editor */}
      {isValidCode(post.code?.code) &&
        (isEditing ? (
          <MonacoEditor
            className='h-[300px]'
            value={editedCode}
            theme='vs-dark'
            language={post.code?.fileType || 'javascript'}
            options={{
              readOnly: false,
              domReadOnly: false,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
            }}
            onChange={(newValue) => setEditedCode(newValue || '')}
          />
        ) : (
          <CodeEditor
            code={post.code?.code || ''}
            fileType={post.code?.fileType || 'plaintext'}
          />
        ))}

      {post.question && isEditing && (
        <div className='flex gap-2 justify-end mt-2'>
          <Button onClick={handleSave} className='px-4 py-2 rounded-md'>
            {t('save')}
          </Button>
          <Button
            onClick={handleCancel}
            className='px-4 py-2 bg-neutral-400 hover:bg-error-500 rounded-md'
          >
            {t('cancel')}
          </Button>
        </div>
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
