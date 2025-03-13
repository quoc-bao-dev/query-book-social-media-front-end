import Link from 'next/link';
import DOMPurify from 'dompurify';

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
  return text.replace(
    regex,
    `<span class="bg-warning-400 text-neutral-100 font-bold">$1</span>`,
  );
};

const QuestionTitle = ({ postId, title, searchTerm }: QuestionTitleProps) => {
  const highlightedTitle = DOMPurify.sanitize(highlightText(title, searchTerm));

  return (
    <Link href={`/qna/${postId}`}>
      <h2
        className='text-xl font-semibold'
        dangerouslySetInnerHTML={{ __html: highlightedTitle }}
      />
    </Link>
  );
};

export default QuestionTitle;
