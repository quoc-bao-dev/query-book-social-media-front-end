import ArrowDown from '@/components/icons/ArrowDown';
import ArrowUp from '@/components/icons/ArrowUp';
import ChatBubbleOvalLeftIcon from '@/components/icons/ChatBubbleOvalLeftIcon';
import { useAnswerQuery } from '@/queries/answer';
import {
  useGetMySaveQuestionQuery,
  useSaveQuestionMutation,
  useUnsaveQuestionMutation, //  API hủy lưu
} from '@/queries/question';
import { useQueryClient } from '@tanstack/react-query';
import { BookmarkIcon } from 'lucide-react';
import React from 'react';

type ActionBarProps = {
  id: string;
  countComment?: number;
};

const ActionBar = ({ id }: ActionBarProps) => {
  const queryClient = useQueryClient();

  const { data: answerData } = useAnswerQuery(id);
  const countComment = answerData?.length || 0;
  console.log('answerData', answerData);

  const { data } = useGetMySaveQuestionQuery();
  const saveMutation = useSaveQuestionMutation();
  const unsaveMutation = useUnsaveQuestionMutation(); // API hủy lưu

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
      <ArrowUp className='w-5 h-5 fill-primary-500 text-primary-500' />
      <span className='font-semibold'>2.3k</span>
      <ArrowDown className='w-5 h-5 fill-red-600 text-red-600' />
      <span className='font-semibold'>200</span>
      <ChatBubbleOvalLeftIcon className='w-5 h-5 text-neutral-600' />
      <span className='font-semibold'>{countComment}</span>
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
