const QuestionTitle = ({ title }: { title: string }) => {
  return (
    <div className='mt-2 text-3xl font-semibold text-neutral-900 hover:text-primary-500 transition-all duration-300'>
      {title}
    </div>
  );
};

export default QuestionTitle;
