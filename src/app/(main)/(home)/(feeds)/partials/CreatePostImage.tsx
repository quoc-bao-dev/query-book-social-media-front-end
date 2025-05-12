'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useListImageDetail } from '../signal/listImageDetail';
import DeleteIcon from '@/components/icons/DeleteIcon';
type Props = {
  lsImage: string[];
  onDelete: (index: number) => void;
};
const CreatePostImage = ({ lsImage, onDelete }: Props) => {
  const { showModal, setImages, setCurIndex } = useListImageDetail();

  const [File, setFiles] = useState(lsImage);

  // Xóa ảnh theo từng index
  const closeFile = (indexToRemove: number) => {
    onDelete(indexToRemove);
    setFiles((prevFiles) =>
      // Lọc qua Image nào khác indexToRemove thì giữ lại không thì xóa đi
      prevFiles.filter((_, index) => index !== indexToRemove),
    );
  };

  // Sử dụng useEffect để setFiles khi lsImage thay đổi
  useEffect(() => {
    setFiles(lsImage);
  }, [lsImage]);

  const showDetail = (index: number) => () => {
    setImages(lsImage);
    setCurIndex(index);
    showModal();
  };

  if (File.length === 0) {
    return null;
  }

  if (File.length === 1) {
    return (
      <div>
        <div className='relative z-40'>
          {File.map((mediaUrl, index) => (
            <div className='flex relative w-[200px]' key={index}>
              <Image
                onClick={showDetail(index)}
                key={index}
                src={`${mediaUrl}`}
                className='rounded-md text-center object-contain'
                alt=''
                width={1000}
                height={1000}
              />

              <div
                onClick={() => closeFile(index)}
                className='absolute top-1 right-1 rounded-[50%] bg-gray-100'
              >
                <DeleteIcon className='size-6 text-primary-500' />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (File.length === 2) {
    return (
      <div>
        <div className='relative z-40'>
          <div className='grid grid-cols-2 gap-2 p-2 items-center'>
            {File.map((item, index) => (
              <div key={index} className='flex relative'>
                <Image
                  onClick={showDetail(index)}
                  src={item}
                  alt='Khu bếp'
                  className='w-full rounded-lg shadow aspect-square object-cover'
                  width={1000}
                  height={0}
                />
                <div
                  onClick={() => closeFile(index)}
                  className='absolute top-1 right-1 rounded-[50%] bg-gray-100'
                >
                  <DeleteIcon className='size-6 text-primary-500' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (File.length === 3) {
    return (
      <div>
        <div className='relative z-40'>
          <div className='grid grid-cols-3 gap-2 p-2 items-end'>
            {File.map((item, index) => (
              <div key={index} className='flex relative'>
                <Image
                  onClick={showDetail(index)}
                  src={item}
                  alt=''
                  className='w-full rounded-lg mb-4 aspect-square object-cover'
                  width={1000}
                  height={0}
                />
                <div
                  onClick={() => closeFile(index)}
                  className='absolute top-1 right-1 rounded-[50%] bg-gray-100'
                >
                  <DeleteIcon className='size-6 text-primary-500' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (File.length === 4) {
    return (
      <div>
        <div className='relative z-40'>
          <div className='grid grid-cols-2 gap-[6px] p-2'>
            {File.map((item, index) => (
              <div key={index} className='flex relative'>
                <Image
                  onClick={showDetail(index)}
                  src={item}
                  width={1000}
                  height={1000}
                  alt=''
                  className='w-full h-full rounded-lg shadow aspect-square object-cover'
                />
                <div
                  onClick={() => closeFile(index)}
                  className='absolute top-1 right-1 rounded-[50%] bg-gray-100'
                >
                  <DeleteIcon className='size-6 text-primary-500' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (File.length >= 5) {
    return (
      <div>
        <div className='relative z-40'>
          <div className='grid grid-cols-2 gap-[6px] p-2'>
            {File.map((item, index) => (
              <div key={index} className='relative flex'>
                <Image
                  src={item}
                  alt=''
                  className='w-full rounded-lg shadow aspect-square object-cover'
                  width={1000}
                  height={0}
                />
                <div
                  onClick={() => closeFile(index)}
                  className='absolute top-1 right-1 rounded-[50%] bg-gray-100'
                >
                  <DeleteIcon className='size-6 text-primary-500' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <div>PostImage</div>;
};

export default CreatePostImage;
