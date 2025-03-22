import React from 'react';

interface HashTagPostProps {
  hashtags: { name: string }[];
}

const HashTagPost = ({ hashtags }: HashTagPostProps) => {
  if (!hashtags || hashtags.length === 0) return null;

  return (
    <div className='mt-2'>
      {hashtags.map((tag, index) => (
        <span
          key={index}
          className='text-xs bg-info-100 text-info-500 px-2 py-1 mr-1 rounded-md cursor-pointer'
        >
          #{tag.name}
        </span>
      ))}
    </div>
  );
};

export default HashTagPost;
