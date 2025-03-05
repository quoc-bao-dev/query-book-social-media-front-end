import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function AskQuestionModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Nút mở modal */}
      <button
        onClick={() => setIsOpen(true)}
        className='ml-4 px-4 py-2 bg-primary-400 text-white rounded-lg hover:bg-green-500 transition flex items-center gap-2 shadow-xl hover:shadow-2xl'
      >
        <PlusIcon className='w-4 h-4' />
        Ask a Question
      </button>

      {/* Modal */}
      {isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className='bg-background p-6 rounded-2xl w-[400px] shadow-lg'
          >
            {/* Header */}
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-accent-foreground text-xl font-semibold mx-auto'>
                Ask a Question
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className='absolute right-5 top-5'
              >
                <X className='w-6 h-6 text-gray-600 hover:text-gray-800' />
              </button>
            </div>

            {/* Form nhập liệu */}
            <div className='space-y-4'>
              <div>
                <label className='text-sm font-semibold text-accent-foreground'>
                  Title
                </label>
                <input
                  type='text'
                  className=' w-full border border-border rounded-lg p-2 mt-1 focus:ring focus:ring-green-200'
                />
              </div>

              <div>
                <label className='text-sm font-semibold'>Content</label>
                <textarea
                  className='w-full border border-border rounded-lg p-2 mt-1 focus:ring focus:ring-green-200'
                  rows={3}
                ></textarea>
              </div>

              {/* Upload ảnh/video */}
              <div className='border border-border rounded-lg p-6 flex items-center justify-center cursor-pointer hover:bg-input'>
                <div className='text-center text-gray-500'>
                  <span className='text-xl'>📷</span>
                  <p className='text-sm mt-1'>Thêm ảnh/video</p>
                </div>
              </div>
            </div>

            {/* Nút hành động */}
            <div className='flex justify-between mt-6'>
              <button
                onClick={() => setIsOpen(false)}
                className='px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700'
              >
                Cancel
              </button>
              <button className='px-4 py-2 bg-[#00A76F] text-white rounded-lg hover:bg-green-500 transition'>
                Post
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
