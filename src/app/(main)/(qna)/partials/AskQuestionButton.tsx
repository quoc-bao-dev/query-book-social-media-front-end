import Link from 'next/link';
import React from 'react';

const AskQuestionButton = () => {
  return (
    <div>
      <Link href='/myquestion?mode=ask'>
        <button className='px-4 py-2 bg-primary-500 text-white rounded-md shadow hover:bg-primary-300 transition'>
          Ask a Question
        </button>
      </Link>
    </div>
  );
};

export default AskQuestionButton;
