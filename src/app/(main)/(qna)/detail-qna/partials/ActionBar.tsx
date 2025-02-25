import HeartIcon from '@/components/icons/HeartIcon';
import ShareIcon from '@/components/icons/ShareIcon';
import {
  useGetMySaveQuestionQuery,
  useSaveQuestionMutation,
  useUnsaveQuestionMutation, // 🆕 API hủy lưu
} from '@/queries/question';
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';
import { useQueryClient } from '@tanstack/react-query';
import { BookmarkIcon } from 'lucide-react';
import React from 'react';

type ActionBarProps = {
  id: string;
};

const ActionBar = ({ id }: ActionBarProps) => {
  const queryClient = useQueryClient();

  const { data } = useGetMySaveQuestionQuery();
  const saveMutation = useSaveQuestionMutation();
  const unsaveMutation = useUnsaveQuestionMutation(); // 🆕 API hủy lưu

  const isSaved = data?.some((_item) => _item.questionId._id === id);

  const handleSaveQuestion = async () => {
    try {
      if (isSaved) {
        await unsaveMutation.mutateAsync(id); // Hủy lưu nếu đã lưu trước đó
      } else {
        await saveMutation.mutateAsync(id); // Lưu nếu chưa lưu
      }
      queryClient.invalidateQueries({ queryKey: ['my-save-question'] }); // Refresh danh sách đã lưu
    } catch (error) {
      console.error('Error toggling save state:', error);
    }
  };

  return (
    <div className='mt-2 flex items-center gap-2 text-gray-600'>
      <HeartIcon className='w-5 h-5 fill-error-300 text-error-200' />
      <span>2.3k</span>
      <ChatBubbleOvalLeftIcon className='w-5 h-5 text-neutral-700 fill-neutral-600' />
      <span>200</span>
      <ShareIcon className='w-5 h-5 text-neutral-800 fill-neutral-600' />
      <span>Share</span>
      <button onClick={handleSaveQuestion} className='flex items-center'>
        <BookmarkIcon
          className={`w-5 h-5 transition ${
            isSaved ? 'fill-info-500 text-info-200' : 'text-gray-600'
          }`}
        />
        <span>{isSaved ? 'Saved' : 'Save'}</span>
      </button>
    </div>
  );
};

export default ActionBar;
