'use client';

import Modal from '@/components/common/Modal';
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import {
  sListImageDetail,
  useListImageDetail,
} from '../signal/listImageDetail';

const ImageDetailModal = () => {
  const { isShow, listImages, curIndex } = sListImageDetail.use();
  const { closeModal, setCurIndex } = useListImageDetail();

  const nextImage = () => {
    setCurIndex((curIndex + 1) % listImages.length);
  };

  const prevImage = () => {
    if (curIndex <= 0) {
      setCurIndex(listImages.length - 1);
      return;
    }
    setCurIndex(Math.abs(curIndex - 1) % listImages.length);
  };

  return (
    <Modal isOpen={isShow} onClose={closeModal}>
      <div className='flex z-50'>
        <div className='relative bg-card w-[800px] rounded-lg'>
          <div className='flex w-full relative justify-center items-center h-[580px] pt-3'>
            {listImages.length > 1 && (
              <div className='absolute left-5' onClick={prevImage}>
                <ChevronLeftIcon className='size-12 text-gray-600' />
              </div>
            )}
            <div className='flex h-full max-w-[600px] max-h-[550px] items-center'>
              <Image
                src={listImages[curIndex]}
                alt=''
                className='w-full h-full object-contain rounded-md'
                width={1000}
                height={1000}
              />
            </div>

            {listImages.length > 1 && (
              <div className='absolute right-5' onClick={nextImage}>
                <ChevronRightIcon className='size-12 fill-gray-600' />
              </div>
            )}
          </div>

          {/* List Images */}
          {listImages.length > 1 && (
            <div className='flex w-[600px] mx-auto overflow-x-auto py-2 '>
              <div className='flex gap-2 items-center w-fit'>
                {listImages.map((image, index) => (
                  <div key={index} className='size-[80px] bg-slate-100'>
                    <Image
                      onClick={() => setCurIndex(index)}
                      key={index}
                      src={image}
                      alt=''
                      className={cn(
                        'w-full h-full object-contain rounded-sm ',
                        {
                          'border-[3px] border-primary-500': curIndex === index,
                        },
                      )}
                      width={1000}
                      height={1000}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div
            onClick={closeModal}
            className='flex absolute top-1 rounded-full right-1 w-6 h-6 justify-center items-center bg-gray-100'
          >
            <DeleteIcon className='size-4' />
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ImageDetailModal;
