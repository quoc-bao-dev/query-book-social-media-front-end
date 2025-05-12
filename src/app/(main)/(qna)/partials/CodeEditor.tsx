'use client';
import SaveCodeIcon from '@/components/icons/SaveCodeIcon';
import MonacoEditor from '@monaco-editor/react';
import { useCallback, useEffect, useState } from 'react';
import SaveCodeSuccessIcon from './SaveCodeSuccessIcon';
import { useTranslations } from 'next-intl';

interface CodeEditorProps {
  code: string;
  fileType: string;
}

const CodeEditor = ({ code, fileType }: CodeEditorProps) => {
  const [copied, setCopied] = useState(false);
  const t = useTranslations('question');

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
  }, [code]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  if (!code?.trim()) return null;

  return (
    <div className='relative group'>
      <div className='absolute z-20 top-2 right-2 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        <button
          onClick={handleCopy}
          className='w-8 h-8 flex items-center justify-center text-white p-1'
        >
          <span className='absolute'>
            {copied ? (
              <SaveCodeSuccessIcon className='w-6 h-6' />
            ) : (
              <SaveCodeIcon className='w-6 h-6' />
            )}
          </span>
        </button>
        <span
          className={`text-xs text-white mt-1 transition-opacity duration-300 ${
            copied ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {t('copycode')}
        </span>
      </div>

      <MonacoEditor
        className='h-[300px] pt-[10px]'
        value={code}
        theme='vs-dark'
        language={fileType}
        options={{ readOnly: true, domReadOnly: true }}
      />
    </div>
  );
};

export default CodeEditor;
