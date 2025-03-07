'use client';
/* eslint-disable @next/next/no-img-element */

import Modal from '@/components/common/Modal';
import { useAnswerQuery } from '@/queries/answer';
import { useState } from 'react';

type ModalCommentProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
};

const ModalComment = ({ isOpen, onClose, id }: ModalCommentProps) => {
  const [comment, setComment] = useState('');
  // console.log('jhvjsdhdsh', id);
  const { data } = useAnswerQuery(id);
  console.log('hehaevfjshgf', data);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='bg-card p-6 rounded-2xl shadow-2xl w-[600px] max-h-[700px] flex flex-col'>
        {/* Header */}
        <div className='flex justify-between items-center border-b pb-4'>
          <h2 className='text-2xl font-semibold text-gray-900'>Bình luận</h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700 transition text-xl font-bold'
          >
            ✕
          </button>
        </div>

        {/* Nội dung bình luận */}
        <div className='mt-4 space-y-4 overflow-y-auto max-h-[400px] pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
          {data?.map((item) => (
            <div
              key={item._id}
              className='flex items-start gap-4 p-3 bg-input rounded-lg'
            >
              <img
                src={item.userId.avatarUrl}
                alt='Avatar'
                className='w-10 h-10 rounded-full'
              />
              <div>
                <p className='text-sm font-medium text-gray-900'>
                  {item.userId.firstName} {item.userId.lastName}
                </p>
                <p className='text-sm text-gray-700'>Bình luận mẫu</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input bình luận */}
        <div className='mt-5 flex items-center border-t pt-4'>
          <input
            type='text'
            placeholder='Viết bình luận...'
            className='w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className='ml-3 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-all duration-200'>
            Gửi
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComment;
