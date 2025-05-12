import { Button } from '@/components/common/Button';
import Friends from './partials/Friends';

const Page = () => {
  return (
    <div>
      <div className='pt-4'>
        <div className='w-[500px] mx-auto'>
          <div className='w-full flex'>
            <input
              type='text'
              placeholder='Search'
              className='flex-1 px-4 py-4 border border-gray-300 rounded-l-lg ring-0 outline-none'
            />
            <Button className='rounded-l-none'>Search</Button>
          </div>
        </div>
      </div>
      <div className='pt-4'>
        <div className='flex justify-between'>
          {/* link */}
          <div className='flex gap-2'>
            <div className='font-semibold px-3 py-2 hover:bg-gray-200/80 cursor-pointer border-b-2 text-neutral-800 border-neutral-800'>
              All
            </div>
            <div className='font-semibold px-3 py-2 hover:bg-gray-200/80 cursor-pointer border-b-2 text-neutral-800 border-neutral-800'>
              Friends
            </div>
            <div className='font-semibold px-3 py-2 hover:bg-gray-200/80 cursor-pointer border-b-2 text-neutral-800 border-neutral-800'>
              Requests
            </div>
            <div className='font-semibold px-3 py-2 hover:bg-gray-200/80 cursor-pointer border-b-2 text-neutral-800 border-neutral-800'>
              Followers
            </div>
            <div className='font-semibold px-3 py-2 hover:bg-gray-200/80 cursor-pointer border-b-2 text-neutral-800 border-neutral-800'>
              Following
            </div>
          </div>
          {/* link */}

          {/* filter */}
          <select name='' id=''>
            <option value='all'>All</option>
            <option value='online'>Online</option>
            <option value='offline'>Offline</option>
          </select>
          {/* filter */}
        </div>
      </div>
      <div className='pt-4'>
        <Friends />
      </div>
    </div>
  );
};

export default Page;
