'use client';
import Modal from '@/components/common/Modal';
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
import {
  sListImageDetailFeed,
  useListImageDetailFeed,
} from '../signal/listImageDeltaiFeed';
import { cn } from '@/lib/utils';

const ProcessingBar = ({
  isActive,
  isSeen,
}: {
  isActive: boolean;
  isSeen: boolean;
}) => {
  return (
    <motion.div
      initial={{ width: '0%' }}
      animate={{
        width: isActive ? '100%' : isSeen ? '100%' : '0%',
      }}
      transition={{ duration: isActive ? 3 : 0 }}
      className={cn('absolute left-0 top-0 h-full rounded-full', {
        'bg-primary-500': isSeen || isActive,
        'bg-gray-500': !isSeen && !isActive,
      })}
    />
  );
};

const ImageDetailFeedModal = () => {
  const { isShow, listImages, curIndex } = sListImageDetailFeed.use();
  const { closeModal, setCurIndex } = useListImageDetailFeed();

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextImage();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [nextImage]);

  return (
    <Modal isOpen={isShow} onClose={closeModal}>
      <div className='flex z-50'>
        <div className='relative bg-card w-[500px] rounded-lg'>
          <div className='flex w-full relative justify-center items-center h-[580px] pt-3'>
            {listImages.length > 1 && (
              <div className='absolute left-5' onClick={prevImage}>
                <ChevronLeftIcon className='size-12 ' />
              </div>
            )}
            <div className='h-full mt-10 w-auto'>
              <Image
                src={listImages[curIndex]}
                alt=''
                className='w-full h-full object-contain  rounded-md'
                width={1000}
                height={1000}
              />
            </div>

            {listImages.length > 1 && (
              <div className='absolute right-5' onClick={nextImage}>
                <ChevronRightIcon className='size-12' />
              </div>
            )}
          </div>

          {/* List Images */}
          <div className=' max-w-[600px] mx-auto py-2'>
            <div className='flex w-full justify-center items-end gap-2 h-[100px]'>
              <div className='h-3 w-full  flex gap-2 px-2'>
                {listImages.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setCurIndex(index)}
                    className={cn(
                      'relative flex-1 h-full bg-gray-300 rounded-full overflow-hidden cursor-pointer',
                      {
                        'bg-gray-300': index > curIndex,
                      },
                    )}
                  >
                    <ProcessingBar
                      isActive={index === curIndex}
                      isSeen={index < curIndex}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            onClick={closeModal}
            className='absolute top-1 rounded-full right-1 w-8 h-8 bg-gray-300'
          >
            <DeleteIcon className='size-8' />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageDetailFeedModal;
