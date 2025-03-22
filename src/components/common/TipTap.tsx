'use client';
import './TipTap.scss';

import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { BubbleMenu, EditorContent, isActive, useEditor } from '@tiptap/react';
import React, {
  Children,
  PropsWithChildren,
  useCallback,
  useEffect,
} from 'react';
import Left from '../icons/Left';
import Center from '../icons/Center';
import Right from '../icons/Right';
import H1 from '../icons/H1';
import H2 from '../icons/H2';
import H3 from '../icons/H3';
import { Bold, Italic, Strikethrough } from 'lucide-react';

export default ({
  value,
  onChange,
}: {
  onChange: (value?: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Heading,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      StarterKit,
    ],
    content: value, // Gán giá trị từ form
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // Trả về nội dung HTML
    },
  });
  const editBubbleMenu = [
    {
      Children: (
        <div className='flex items-center gap-1'>
          <Bold className='size-4' />
        </div>
      ),
      onclick: () => editor?.chain().focus().toggleBold().run(),
      isActive: editor?.isActive('bold'),
    },
    {
      Children: (
        <div className='flex items-center gap-1'>
          <Italic className='size-4' />
        </div>
      ),
      onclick: () => editor?.chain().focus().toggleItalic().run(),
      isActive: editor?.isActive('italic'),
    },
    {
      Children: (
        <div className='flex items-center gap-1'>
          <Strikethrough className='size-4' />
        </div>
      ),
      onclick: () => editor?.chain().focus().toggleStrike().run(),
      isActive: editor?.isActive('strike'),
    },
  ];
  const editorAction = [
    {
      children: <Left className='size-5' />,
      onClick: () => editor?.chain().focus().setTextAlign('left').run(),
      isActive: editor?.isActive({ textAlign: 'left' }),
    },
    {
      children: <Center className='size-5' />,
      onClick: () => editor?.chain().focus().setTextAlign('center').run(),
      isActive: editor?.isActive({ textAlign: 'center' }),
    },
    {
      children: <Right className='size-5' />,
      onClick: () => editor?.chain().focus().setTextAlign('right').run(),
      isActive: editor?.isActive({ textAlign: 'right' }),
    },
    {
      children: <Center className='size-5' />,
      onClick: () => editor?.chain().focus().setTextAlign('justify').run(),
      isActive: editor?.isActive({ textAlign: 'justify' }),
    },
    {
      children: <H1 className='size-5' />,
      onClick: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor?.isActive({ level: 1 }),
    },
    {
      children: <H2 className='size-5' />,
      onClick: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor?.isActive({ level: 2 }),
    },
    {
      children: <H3 className='size-5' />,
      onClick: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor?.isActive({ level: 3 }),
    },
  ];

  const ActionButton = useCallback(
    ({
      children,
      onClick,
      isActive,
    }: { onClick: () => void; isActive: boolean } & PropsWithChildren) => (
      <button
        onClick={onClick}
        className={`p-1 rounded-md transition text-gray-700 ${
          isActive
            ? 'bg-info-100 text-info-500'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        {children}
      </button>
    ),
    [editor],
  );
  const BubbleMenuButton = useCallback(
    ({
      children,
      onClick,
      isActive,
    }: { onClick: () => void; isActive: boolean } & PropsWithChildren) => (
      <button
        onClick={onClick}
        className={`p-1 rounded-md transition text-gray-700 bg-cyan-300 ${
          isActive
            ? 'bg-info-100 text-info-500'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        {children}
      </button>
    ),
    [editor],
  );

  useEffect(() => {
    onChange(editor?.getHTML());
    console.log(editor?.getHTML());
  }, [editor?.getHTML()]);

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className='p-2 bg-gray-100 rounded-md shadow-sm'>
        <div className='flex items-center gap-1'>
          {editorAction.map((action, index) => (
            <ActionButton
              key={index}
              onClick={action.onClick}
              isActive={action.isActive!}
            >
              <span className=''>{action.children}</span>
            </ActionButton>
          ))}
        </div>
      </div>

      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className='bubble-menu'>
            {editBubbleMenu.map((action, index) => (
              <BubbleMenuButton
                key={index}
                onClick={action.onclick}
                isActive={!!action.isActive}
              >
                {action.Children}
              </BubbleMenuButton>
            ))}
          </div>
        </BubbleMenu>
      )}

      <EditorContent
        className='outline-none text-gray-800 bg-card p-4 border mt-4 rounded-lg mb-5'
        editor={editor}
      />
    </>
  );
};
