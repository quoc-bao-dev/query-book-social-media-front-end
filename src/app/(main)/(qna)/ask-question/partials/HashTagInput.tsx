import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

type HashTagInputProps = {
  onChange: (data: string[]) => void;
};

const HashTagInput = ({ onChange }: HashTagInputProps) => {
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const t = useTranslations('AskQuestion');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      e.preventDefault();
      if (!hashtags.includes(input.trim())) {
        setHashtags([...hashtags, input.trim()]);
      }
      setInput('');
    }
  };

  useEffect(() => {
    onChange(hashtags);
  }, [hashtags, onChange]);

  const removeHashtag = (tag: string) => {
    setHashtags(hashtags.filter((t) => t !== tag));
  };

  return (
    <div>
      <div className='flex flex-wrap gap-2 mb-2'>
        {hashtags.map((tag) => (
          <span
            key={tag}
            className='flex items-center px-2 py-1 text-sm font-medium bg-[#4B5563] text-[#F8FAFC] rounded'
          >
            #{tag}
            <button
              className='ml-2 text-error-500'
              onClick={() => removeHashtag(tag)}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type='text'
        className='w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
        placeholder={t('phhashtag')}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default HashTagInput;
