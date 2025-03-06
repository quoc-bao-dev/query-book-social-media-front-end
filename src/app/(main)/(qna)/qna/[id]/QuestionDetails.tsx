'use client';

import { QuestionResponse } from '@/types/question';
import AnswerSection from './partials/AnswerSection';
import QuestionSection from './partials/QuestionSection';

type QuestionDetailsProps = {
  question: QuestionResponse;
};
const QuestionDetails = ({ question }: QuestionDetailsProps) => {
  return (
    <div className='  p-4 bg-card max-h-full pt-14 px-14'>
      {/* Câu hỏi */}

      <QuestionSection question={question} />
      {/* Phản hồi */}
      <AnswerSection questionId={question._id} />
    </div>
  );
};

export default QuestionDetails;
