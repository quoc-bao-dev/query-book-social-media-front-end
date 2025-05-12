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
import Avatar from '@/components/common/Avatar';

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
  const { isShow, listImages, curIndex, auTh } = sListImageDetailFeed.use();
  const { closeModal, setCurIndex } = useListImageDetailFeed();
  console.log('auTh', auTh);

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
      <div className='z-50'>
        <div className='relative flex justify-center bg-gray-900 w-[395px] h-[700px] mx-auto rounded-lg'>
          {/* Author */}
          <div className='absolute top-5 left-5 flex items-center'>
            <Avatar src={auTh.avatarUrl} className='' />
            <span className='font-bold ml-2 text-gray-200'>
              {auTh.userName}
            </span>
          </div>

          {listImages.length > 1 && (
            <div className='' onClick={prevImage}>
              <ChevronLeftIcon className='size-10 absolute top-1/2 left-2 text-white' />
            </div>
          )}

          {/* Image */}
          <Image
            src={listImages[curIndex]}
            alt=''
            className='w-full object-contain rounded-md'
            width={1000}
            height={1000}
          />

          <div className='absolute bottom-1  flex w-full justify-center items-end gap-2 h-[100px]'>
            <div className='h-3 w-full flex gap-2 px-2'>
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

          {/* Next button */}
          {listImages.length > 1 && (
            <div className='' onClick={nextImage}>
              <ChevronRightIcon className='size-10 absolute top-1/2 right-2 text-white' />
            </div>
          )}

          {/* Close button */}
          <div
            onClick={closeModal}
            className='absolute top-1 rounded-full right-1 w-6 h-6 bg-gray-300 justify-center items-center flex'
          >
            <DeleteIcon className='size-6' />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageDetailFeedModal;
