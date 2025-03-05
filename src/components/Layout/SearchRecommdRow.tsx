import { RecommandSearch, setRecommandedSearch } from '@/utils/search';
import Avatar from '../common/Avatar';
import Link from 'next/link';

type SearchRecommdRowProps = Pick<RecommandSearch, 'type' | 'data'> & {
  onClick?: () => void;
};

const SearchRecommdRow = ({ type, data }: SearchRecommdRowProps) => {
  if (type === 'user') {
    return (
      <Link
        onClick={() => setRecommandedSearch({ type, data })}
        href={`/${data.id}`}
        className='p-2 rounded-lg bg-card flex gap-2 hover:bg-gray-200/40 cursor-pointer'
      >
        <Avatar
          className='h-[48px] w-[48px]'
          src={data.avatar}
          fallBack={data.userName}
        />
        <div className='flex-1'>
          <h2 className='font-semibold text-neutral-600'>{data.userName}</h2>
          <p className='text-sm text-neutral-600/70'>{data.handle}</p>
        </div>
      </Link>
    );
  }

  if (type === 'post') {
    return <div>{data.id}</div>;
  }
};

export default SearchRecommdRow;
