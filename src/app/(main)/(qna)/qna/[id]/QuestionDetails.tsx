'use client';

import { QuestionResponse } from '@/types/question';
import AnswerSection from './partials/AnswerSection';
import QuestionSection from './partials/QuestionSection';

type QuestionDetailsProps = {
  question: QuestionResponse;
};
const QuestionDetails = ({ question }: QuestionDetailsProps) => {
  return (
    <div className='mx-35 p-4 bg-card max-h-full pt-20 px-14'>
      {/* Câu hỏi */}

      <QuestionSection question={question} />
      {/* Phản hồi */}
      <AnswerSection questionId={question._id} />
    </div>
  );
};

export default QuestionDetails;
