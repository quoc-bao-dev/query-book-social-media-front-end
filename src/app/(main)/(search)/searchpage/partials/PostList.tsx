/* eslint-disable @next/next/no-img-element */
const PostList = ({
  posts,
  showMore,
  setShowMore,
}: {
  posts: any[];
  showMore: boolean;
  setShowMore: (val: boolean) => void;
}) => {
  const displayedPosts = showMore ? posts : posts.slice(0, 3);

  return (
    <div className='mt-6'>
      <h2 className='text-lg font-semibold text-neutral-900'>Posts</h2>
      <div className='mt-3 space-y-4'>
        {displayedPosts.length > 0 ? (
          displayedPosts.map((post) => (
            <div
              key={post.id}
              className='p-5 bg-background border rounded-lg shadow-md'
            >
              <div className='flex items-center gap-3'>
                <img
                  src={post.authorAvatar}
                  alt={post.author}
                  className='w-10 h-10 rounded-full'
                />
                <div>
                  <p className='font-semibold text-neutral-900'>
                    {post.author}
                  </p>
                  <span className='text-sm text-neutral-600'>
                    {new Date(post.createdAt).toLocaleString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
              <p className='mt-3 font-medium text-neutral-900'>
                {post.content}
              </p>
              {post.image && (
                <img
                  src={post.image}
                  alt='Post image'
                  className='mt-3 rounded-lg w-full max-h-60 object-cover'
                />
              )}
            </div>
          ))
        ) : (
          <p className='text-gray-500'>No posts found.</p>
        )}
      </div>
      {posts.length > 3 && (
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

export default PostList;
