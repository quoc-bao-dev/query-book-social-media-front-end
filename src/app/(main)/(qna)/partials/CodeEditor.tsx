import MonacoEditor from '@monaco-editor/react';
import React from 'react';

interface CodeEditorProps {
  code: string;
  fileType: string;
}

const CodeEditor = ({ code, fileType }: CodeEditorProps) => {
  if (!code.trim()) return null; // Không render nếu không có code

  return (
    <div>
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
