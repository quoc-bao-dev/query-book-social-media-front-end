'use client';
import MonacoEditor from '@monaco-editor/react';
import jsonToTS from 'json-to-ts';
import { useEffect, useState } from 'react';

const JsonToType = () => {
  const [mode, setMode] = useState<'type' | 'interface'>('interface');
  const [code, setCode] = useState<string>('');
  const [formattedCode, setFormattedCode] = useState<string>('');

  const convert = (json: string) => {
    try {
      const parsedJson = JSON.parse(json);
      const tsInterfaces = jsonToTS(parsedJson)
        .map((tsInterface) => {
          return mode === 'type'
            ? tsInterface.replace(/^interface\s+(\w+)/, 'export type $1 =')
            : `export ${tsInterface}`;
        })
        .join('\n\n');
      return tsInterfaces;
    } catch (error) {
      return '//Error parsing JSON!';
    }
  };

  useEffect(() => {
    if (code) {
      setFormattedCode(convert(code));
    }
  }, [mode, code]);

  return (
    <div className=' h-[calc(100vh-var(--header-height))] flex flex-col gap-4 pt-4'>
      <h1 className='text-2xl font-bold'>JSON to Type</h1>
      <select
        className='w-fit px-5 py-2 rounded-md'
        onChange={(e) => setMode(e.target.value as any)}
      >
        <option value='type'>Type</option>
        <option value='interface'>Interface</option>
      </select>
      <div className='grid grid-cols-2 gap-4 flex-1 mb-4'>
        {/* vs code */}
        <MonacoEditor
          language='json'
          className='h-full'
          onChange={(value) => setCode(value || '')}
        />
        {/* vs code */}

        {/* vs code */}
        <MonacoEditor
          language='typescript'
          className='h-full'
          value={formattedCode}
        />
        {/* vs code */}
      </div>
    </div>
  );
};

export default JsonToType;
