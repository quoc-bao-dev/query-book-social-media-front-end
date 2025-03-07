const QuestionContent = ({ content }: { content: string }) => {
  return (
    <div className='mt-2 text-xl text-neutral-600 whitespace-pre-wrap break-words'>
      {content}
    </div>
  );
};

export default QuestionContent;
