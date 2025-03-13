import { useQueryClient } from '@tanstack/react-query';
import { BookmarkIcon } from 'lucide-react';
import { useState } from 'react';

import ArrowDown from '@/components/icons/ArrowDown';
import ArrowUp from '@/components/icons/ArrowUp';
import ChatBubbleOvalLeftIcon from '@/components/icons/ChatBubbleOvalLeftIcon';
import { useAnswerQuery } from '@/queries/answer';
import {
  useGetMySaveQuestionQuery,
  useSaveQuestionMutation,
} from '@/queries/question';
import ModalComment from './ModalComment';

type ActionBarProps = {
  id: string;
  countComment: number;
};

type SavedQuestion = {
  questionId: {
    _id: string;
  };
};

const ActionBar = ({ id }: ActionBarProps) => {
  const queryClient = useQueryClient();
  const { data: answerData } = useAnswerQuery(id);
  const countComment = answerData?.length || 0;

  const { data: savedQuestions } = useGetMySaveQuestionQuery();
  const saveMutation = useSaveQuestionMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const isSaved = savedQuestions?.some((item) => item.questionId._id === id);

  const handleSaveQuestion = async () => {
    if (saveMutation.isPending) return;

    queryClient.setQueryData<SavedQuestion[]>(
      ['my-save-question'],
      (oldData) => {
        if (!oldData) return [];
        return isSaved
          ? oldData.filter((item) => item.questionId._id !== id)
          : [...oldData, { questionId: { _id: id } }];
      },
    );

    try {
      await saveMutation.mutateAsync(id);
      queryClient.invalidateQueries({ queryKey: ['my-save-question'] });
    } catch (error) {
      console.error('Lỗi khi lưu câu hỏi:', error);

      //return if error
      queryClient.setQueryData(['my-save-question'], savedQuestions);
    }
  };

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

        {/* save  */}
        <button
          onClick={handleSaveQuestion}
          className='flex items-center gap-1 disabled:opacity-50'
          disabled={saveMutation.isPending}
        >
          <BookmarkIcon
            className={`w-5 h-5 transition ${
              isSaved ? 'fill-info-500 text-info-200' : 'text-gray-600'
            }`}
          />
          <span>
            {saveMutation.isPending ? 'Saving...' : isSaved ? 'Saved' : 'Save'}
          </span>
        </button>
      </div>

      <ModalComment
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        id={id}
      />
    </>
  );
};

export default ActionBar;
