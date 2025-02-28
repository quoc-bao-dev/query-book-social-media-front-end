import { useEffect, useRef } from 'react';

const textarea = () => {
  type RegisterFunction = (name: string) => {
    ref: (instance: HTMLTextAreaElement | null) => void;
  };

  interface AutoResizeTextareaProps {
    register: RegisterFunction;
  }

  const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
    register,
  }) => {
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
  };

  return (
    <textarea
      {...register('content')}
      ref={textareaRef}
      id='auto-resize-textarea'
      className='border-none w-full break-words px-4 py-3 focus:outline-none overflow-hidden resize-none'
      placeholder='Nguyễn ơi, bạn đang nghĩ gì?'
      onInput={handleInput}
    ></textarea>
  );
};

export default textarea;
