import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchBarMySaveProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBarMySave = ({
  searchTerm,
  setSearchTerm,
}: SearchBarMySaveProps) => {
  return (
    <div className='mb-6 relative'>
      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
        <MagnifyingGlassIcon className='h-5 w-5 text-primary-600' />
      </div>
      <input
        type='text'
        placeholder='Search by author or tag...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='w-full pl-10 px-4 py-2 placeholder-neutral-500 placeholder:opacity-70 border border-none rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
      />
    </div>
  );
};

export default SearchBarMySave;
