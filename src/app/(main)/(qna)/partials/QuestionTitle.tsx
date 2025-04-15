import Link from 'next/link';

interface QuestionTitleProps {
  postId: string;
  title: string;
  searchTerm?: string;
}

const highlightText = (text: string, searchTerm?: string) => {
  if (!searchTerm?.trim()) return text;

  const regex = new RegExp(
    `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'gi',
  );

  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className='bg-warning-400 text-neutral-100 font-bold'>
        {part}
      </span>
    ) : (
      part
    ),
  );
};

const QuestionTitle: React.FC<QuestionTitleProps> = ({
  postId,
  title,
  searchTerm,
}) => {
  if (!title) return null; // Tránh lỗi nếu title không hợp lệ

  return (
    <Link href={`/qna/${postId}`}>
      <h2 className='text-xl mt-2 font-semibold hover:text-primary-500'>
        {highlightText(title, searchTerm)}
      </h2>
    </Link>
  );
};

export default QuestionTitle;
