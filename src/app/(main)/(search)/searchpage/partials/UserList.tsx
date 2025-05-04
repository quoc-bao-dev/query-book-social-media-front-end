import Avatar from '@/components/common/Avatar';
import { MapPinIcon } from '@heroicons/react/24/solid';

const UserList = ({
  users,
  showMore,
  setShowMore,
}: {
  users: any[];
  showMore: boolean;
  setShowMore: (val: boolean) => void;
}) => {
  const displayedUsers = showMore ? users : users.slice(0, 3);

  return (
    <div className='mt-6'>
      <h2 className='text-lg font-semibold text-gray-800'>Users</h2>
      <div className='mt-3 space-y-3'>
        {displayedUsers.length > 0 ? (
          displayedUsers.map((user) => (
            <div
              key={user.id}
              className='flex items-center p-4 bg-background border border-gray-200 rounded-lg shadow hover:shadow-lg transition'
            >
              <Avatar
                src={user.avatar}
                className='w-12 h-12 rounded-full border border-gray-300'
                fallBack={user.avatar}
              />
              <div className='ml-4'>
                <p className='text-md font-semibold text-gray-900'>
                  {user.name}
                </p>
                <p className='text-sm text-gray-500'>{user.title}</p>
                <div className='flex items-center text-sm text-gray-600 mt-1'>
                  <MapPinIcon className='w-4 h-4 mr-1 text-gray-500' />
                  <span>{user.location}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className='text-gray-500'>No users found.</p>
        )}
      </div>
      {users.length > 3 && (
        <button
          onClick={() => setShowMore(!showMore)}
          className='mt-3 text-primary-600 hover:underline'
        >
          {showMore ? 'Show less' : 'See more'}
        </button>
      )}
    </div>
  );
};

export default UserList;
