import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { BookmarkIcon } from 'lucide-react';

import ArrowDown from '@/components/icons/ArrowDown';
import ArrowUp from '@/components/icons/ArrowUp';
import ChatBubbleOvalLeftIcon from '@/components/icons/ChatBubbleOvalLeftIcon';
import { useAnswerQuery } from '@/queries/answer';
import {
  useGetMySaveQuestionQuery,
  useSaveQuestionMutation,
  useUnsaveQuestionMutation,
} from '@/queries/question';
import ModalComment from './ModalComment';

type ActionBarProps = {
  id: string;
};

const ActionBar = ({ id }: ActionBarProps) => {
  const queryClient = useQueryClient();
  const { data: answerData } = useAnswerQuery(id);
  const countComment = answerData?.length || 0;

  const { data } = useGetMySaveQuestionQuery();
  const saveMutation = useSaveQuestionMutation();
  const unsaveMutation = useUnsaveQuestionMutation();

  const isSaved = data?.some((_item) => _item.questionId._id === id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveQuestion = async () => {
    try {
      if (isSaved) {
        await unsaveMutation.mutateAsync(id);
      } else {
        await saveMutation.mutateAsync(id);
      }
      queryClient.invalidateQueries({ queryKey: ['my-save-question'] });
    } catch (error) {
      console.error('Error toggling save state:', error);
    }
  };
  console.log('id', id);

  return (
    <>
      <div className='mt-2 flex items-center gap-2 text-gray-600'>
        <ArrowUp className='w-5 h-5 fill-primary-500 text-primary-500' />
        <span className='font-semibold'>2.3k</span>
        <ArrowDown className='w-5 h-5 fill-red-600 text-red-600' />
        <span className='font-semibold'>200</span>

        {/* Nút mở modal bình luận */}
        <button
          onClick={() => setIsModalOpen(true)}
          className='flex items-center gap-1 text-neutral-600 hover:text-neutral-900 transition'
        >
          <ChatBubbleOvalLeftIcon className='w-5 h-5' />
          <span className='font-semibold'>{countComment}</span>
        </button>

        {/* Nút lưu bài viết */}
        <button onClick={handleSaveQuestion} className='flex items-center'>
          <BookmarkIcon
            className={`w-5 h-5 transition ${
              isSaved ? 'fill-info-500 text-info-200' : 'text-gray-600'
            }`}
          />
          <span>{isSaved ? 'Saved' : 'Save'}</span>
        </button>
      </div>

      {/* Modal hiển thị bình luận */}
      <ModalComment
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        id={id}
      />
    </>
  );
};

export default ActionBar;
