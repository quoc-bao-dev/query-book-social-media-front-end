import Avatar from '@/components/common/Avatar';
import { useAnswerQuery } from '@/queries/answer';
import { getFirstCharacter } from '@/utils/nameUtilts';
import { formatDistanceToNow } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

type Props = {
  id: string;
  name: string;
  title: string;
  avatar: string;
  hashtags: { name: string }[];
  question: string;
  createdAt: string;
  votes?: number;
};

const CardQuestion = ({
  id,
  title,
  hashtags,
  avatar,
  question,
  name,
  createdAt,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const { data: answerData } = useAnswerQuery(id);
  const countComment = answerData?.length || 0;

  const t = useTranslations('CardQuestion');
  const locale = t('locale'); // Ví dụ: "en" hoặc "vi"
  const getLocale = (locale: string) => (locale === 'vi' ? vi : enUS);

  return (
    <div
      className='relative border-b py-4 bg-card flex flex-col rounded-lg shadow-md mb-4 transition-all duration-300 ease-in-out hover:shadow-lg'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Nội dung chính */}
      <div className='flex items-center pl-6'>
        <div className='flex-1 flex flex-col'>
          <Link
            href={`/qna/${id}`}
            className='text-xl font-semibold text-neutral-900 cursor-pointer hover:text-green-600 overflow-hidden'
            style={{ maxWidth: 'calc(100% - 60px)' }}
          >
            {title?.length > 60 ? `${title.slice(0, 50)}...` : title}
          </Link>
          <p className='text-sm text-neutral-500'>
            {question?.length > 60 ? `${question.slice(0, 100)}...` : question}
          </p>

          {/* Avatar và thông tin người đăng */}
          <div className='flex items-center space-x-2 mt-1'>
            <Avatar
              className='w-10 h-10 rounded-full'
              src={avatar}
              fallBack={getFirstCharacter(name)}
            />

            <div className='flex justify-around items-center gap-1'>
              <p className='text-sm text-neutral-500'>
                {t('by')} {name}
              </p>
              <p className='text-2xl text-neutral-500'>•</p>
              <p className='text-sm text-neutral-500'>
                {createdAt &&
                  formatDistanceToNow(new Date(createdAt), {
                    addSuffix: true,
                    locale: getLocale(locale),
                  })}
              </p>
            </div>
          </div>

          {/* Hiển thị tags */}
          <div className='flex space-x-2 mt-2 cursor-pointer'>
            {hashtags.map((tag, index) => (
              <span
                key={index}
                className='text-xs bg-info-100 text-info-500 px-2 py-1 mr-1 rounded-md cursor-pointer'
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hiển thị số lượng bình luận khi hover */}
      {isHovered && (
        <div className='absolute top-0 right-0 bg-info-100 text-info-500 font-semibold text-xs px-3 py-1 rounded-bl-lg'>
          {countComment} {t('comment')}
        </div>
      )}
    </div>
  );
};

export default CardQuestion;
