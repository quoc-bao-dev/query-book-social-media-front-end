'use client';

import { Button } from '@/components/common/Button';
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPage,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
}) => {
  return (
    <div className='py-5 flex gap-4 justify-center items-center'>
      {hasPreviousPage && (
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          className='flex items-center px-2 py-2 text-sm text-neutral-900 hover:text-neutral-600'
        >
          <ChevronLeftIcon className='h-5 w-5 ' />
        </Button>
      )}

      {/* Hiển thị danh sách số trang */}
      <div className='flex gap-2'>
        {Array.from({ length: totalPage }, (_, index) => index + 1).map(
          (page) => (
            <Button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 text-sm rounded-md ${
                page === currentPage
                  ? 'bg-neutral-600 text-neutral-200'
                  : 'text-neutral-900 '
              }`}
            >
              {page}
            </Button>
          ),
        )}
      </div>

      {hasNextPage && (
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          className='flex items-center px-2 py-2 text-sm text-neutral-900 hover:text-neutral-600 '
        >
          <ChevronRightIcon className='h-5 w-5' />
        </Button>
      )}
    </div>
  );
};

export default Pagination;
