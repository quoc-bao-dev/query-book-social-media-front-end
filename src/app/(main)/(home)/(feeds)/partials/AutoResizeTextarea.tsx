'use client';
import { useAuth } from '@/store/authSignal';
import { useEffect, useRef } from 'react';

type AutoResizeTextareaProps = {
  onchange: () => void;
  defaultValue?: string;
};

const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
  onchange,
  defaultValue,
}) => {
  const { user } = useAuth();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <textarea
      ref={textareaRef}
      id='auto-resize-textarea'
      className='border-none w-full break-words px-4 py-3 focus:outline-none overflow-hidden resize-none rounded-lg'
      placeholder={`${user?.lastName} ơi, bạn đang nghĩ gì thế?`}
      onInput={handleInput}
      onChange={onchange}
      defaultValue={defaultValue}
    ></textarea>
  );
};

export default AutoResizeTextarea;
