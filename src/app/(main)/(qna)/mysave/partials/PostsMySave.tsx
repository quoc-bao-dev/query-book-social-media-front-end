import Avatar from '@/components/common/Avatar';
import { Button } from '@/components/common/Button';
import {
  useDeleteQuestionMutation,
  useEditQuestionMutation,
} from '@/queries/question';
import { useAuth } from '@/store/authSignal';
import { SaveQuestionResponse } from '@/types/saveQuestion';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ActionBar from '../../detail-qna/partials/ActionBar';
import CodeEditor from '../../partials/CodeEditor';
import DropdownMenu from '../../partials/DropdownMenu';
import FileType from '../../partials/FileType';
import HashTagPost from '../../partials/HashTagPost';
import ImageRender from '../../partials/ImageRender';
import QuestionContent from '../../partials/QuestionContent';
import QuestionTitle from '../../partials/QuestionTitle';
import MonacoEditor from '@monaco-editor/react';

interface PostProps {
  post: SaveQuestionResponse;
  searchTerm: string;
}

const PostsMySave = ({ post, searchTerm }: PostProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuth(); // Lấy thông tin user
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(
    post.questionId.question || '',
  );
  const [editedCode, setEditedCode] = useState(
    post.questionId.code?.code || '',
  );
  const { mutate: editQuestion } = useEditQuestionMutation();
  const { mutate: deleteQuestion } = useDeleteQuestionMutation(); // Hook xóa bài viết

  const currentUserId = user?.id; // Lấy ID người dùng hiện tại

  // Dùng useMemo để tránh tính toán lại nếu currentUserId hoặc post không thay đổi
  const isOwner = useMemo(
    () => currentUserId === post.questionId?.userId?._id,
    [currentUserId, post],
  );

  // Kiểm tra nội dung hợp lệ
  const isValidCode = (code: string | undefined) =>
    (code ?? '').trim().length > 0;

  // Xử lý click bên ngoài để đóng menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Tối ưu toggle menu
  const toggleMenu = useCallback(() => setShowMenu((prev) => !prev), []);

  // Lưu thay đổi câu hỏi
  const handleSave = useCallback(() => {
    if (!editedContent.trim() && !editedCode.trim()) return; // Không lưu nếu cả hai trống

    editQuestion(
      {
        questionId: post.questionId._id!,
        payload: {
          question: editedContent,
          code: {
            code: editedCode,
            fileType: post.questionId.code?.fileType || 'plaintext',
          },
        },
      },
      {
        onSuccess: () => {
          post.questionId.question = editedContent; // Cập nhật UI ngay lập tức
          if (post && post.questionId && post.questionId.code) {
            post.questionId.code.code = editedCode;
          }
          setIsEditing(false);
        },
      },
    );
  }, [editedContent, editedCode, editQuestion, post]);

  // Hủy chỉnh sửa, khôi phục nội dung ban đầu
  const handleCancel = useCallback(() => {
    setEditedContent(post.questionId.question || '');
    setIsEditing(false);
  }, [post]);

  // Hàm xóa bài viết
  const handleDelete = useCallback(() => {
    if (!post.questionId._id) return;

    deleteQuestion(post.questionId._id, {
      onSuccess: () => {
        window.location.href = '/mysave';
      },
    });

    setShowMenu(false); // Đóng menu sau khi xóa
  }, [deleteQuestion, post]);

  const t = useTranslations('CardQuestion');
  const locale = t('locale'); // Ví dụ: "en" hoặc "vi"

  // Đơn giản hóa hàm lấy locale
  const getLocale = (locale: string) => (locale === 'vi' ? vi : enUS);

  return (
    <div
      ref={menuRef}
      className='rounded-lg shadow-lg p-4 mb-6 border border-border bg-card'
    >
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

        <div className='relative' ref={menuRef}>
          <button
            onClick={toggleMenu}
            className='p-2 rounded-full hover:bg-gray-200 transition-all duration-200'
          >
            <EllipsisVerticalIcon className='h-6 w-6 text-gray-500' />
          </button>
          {showMenu && (
            <DropdownMenu
              isOwner={isOwner}
              questionId={post.questionId._id!}
              onClose={() => setShowMenu(false)}
              onEdit={() => setIsEditing(true)}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      {/* Title */}
      <QuestionTitle
        postId={post.questionId._id!}
        title={post.questionId.title!}
        searchTerm={searchTerm}
      />

      {/* Content */}
      {isEditing ? (
        <div className='mt-1'>
          <textarea
            className='w-full mt-2 min-h-max shadow-xl p-2 border-2 border-neutral-400 rounded-lg '
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        </div>
      ) : (
        <QuestionContent content={post.questionId.question!} />
      )}

      {/* image  */}
      {post.questionId?.images && (
        <ImageRender images={post.questionId?.images} />
      )}

      {/* Code Editor */}
      {isValidCode(post.questionId?.code?.code) &&
        (isEditing ? (
          <MonacoEditor
            className='h-[300px]'
            value={editedCode}
            theme='vs-dark'
            language={post.questionId.code?.fileType || 'javascript'}
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
            code={post.questionId?.code?.code || ''}
            fileType={post.questionId?.code?.fileType || 'plaintext'}
          />
        ))}

      {isEditing && (
        <div className='flex space-x-2 justify-end mt-2'>
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
