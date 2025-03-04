'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useListImageDetail } from '../signal/listImageDetail';
import DeleteIcon from '@/components/icons/DeleteIcon';
type Props = {
  lsImage: string[];
};
const CreatePostImage = ({ lsImage }: Props) => {
  const { showModal, setImages, setCurIndex } = useListImageDetail();
  console.log('sssss', lsImage);

  const [File, setFiles] = useState(lsImage);

  // Xóa ảnh theo từng index
  const closeFile = (indexToRemove: number) => {
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
            <div className='flex' key={index}>
              <Image
                onClick={showDetail(index)}
                key={index}
                src={`${mediaUrl}`}
                className='rounded-md text-center max-h-[600px] object-contain'
                alt=''
                width={1000}
                height={1000}
              />

              <div className='relative w-[200px] h-auto'>
                <div
                  onClick={() => closeFile(index)}
                  className='absolute top-1 right-1 rounded-[50%] bg-gray-100'
                >
                  <DeleteIcon className='size-6 text-primary-500' />
                </div>
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
        <div className='absolute inset-0 overflow-hidden rounded-md'></div>
        <div className='relative z-40'>
          <div className='grid grid-cols-2 gap-2 p-2 items-center'>
            <div className='flex '>
              <Image
                onClick={showDetail(0)}
                src={File[0]}
                width={1000}
                height={1000}
                alt='Hình ảnh phòng'
                className='w-full rounded-lg shadow aspect-square object-cover'
              />
              <div className='relative w-[200px] h-auto'>
                <div
                  onClick={() => closeFile(0)}
                  className='absolute top-1 right-1 rounded-[50%] bg-gray-100'
                >
                  <DeleteIcon className='size-6 text-primary-500' />
                </div>
              </div>
            </div>
            <div className='flex'>
              <Image
                onClick={showDetail(1)}
                src={File[1]}
                alt='Khu bếp'
                className='w-full rounded-lg shadow aspect-square object-cover'
                width={1000}
                height={0}
              />
              <div className='relative w-[200px] h-auto'>
                <div
                  onClick={() => closeFile(0)}
                  className='absolute top-1 right-1 rounded-[50%] bg-gray-100'
                >
                  <DeleteIcon className='size-6 text-primary-500' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (File.length === 3) {
    return (
      <div>
        <div className='absolute inset-0 overflow-hidden rounded-md'></div>
        <div className='relative z-40'>
          <div className='grid grid-cols-3 gap-2 p-2 items-end'>
            <div className='flex'>
              <Image
                onClick={showDetail(0)}
                src={File[0]}
                width={1000}
                height={1000}
                alt='Hình ảnh phòng'
                className='w-full rounded-lg shadow mb-4 aspect-square object-cover'
              />
              <div className='relative w-[200px] h-auto'>
                <div
                  onClick={() => closeFile(0)}
                  className='absolute top-1 right-1 rounded-[50%] bg-gray-100'
                >
                  <DeleteIcon className='size-6 text-primary-500' />
                </div>
              </div>
            </div>
            <div className='flex'>
              <Image
                onClick={showDetail(1)}
                src={File[1]}
                alt='Khu bếp'
                className='w-full rounded-lg shadow aspect-square object-cover'
                width={1000}
                height={0}
              />
              <div className='relative w-[200px] h-auto'>
                <div
                  onClick={() => closeFile(1)}
                  className='absolute top-1 right-1 rounded-[50%] bg-gray-100'
                >
                  <DeleteIcon className='size-6 text-primary-500' />
                </div>
              </div>
            </div>
            <div className='flex'>
              <Image
                onClick={showDetail(2)}
                src={File[2]}
                alt='Nhà vệ sinh'
                className='w-full rounded-lg shadow mb-4 aspect-square object-cover'
                width={1000}
                height={0}
              />
              <div className='relative w-[200px] h-auto'>
                <div
                  onClick={() => closeFile(2)}
                  className='absolute top-1 right-1 rounded-[50%] bg-gray-100'
                >
                  <DeleteIcon className='size-6 text-primary-500' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (File.length === 4) {
    return (
      <div>
        <div className='absolute inset-0 overflow-hidden rounded-md'></div>
        <div className='relative z-40'>
          <div className='grid grid-cols-2 gap-[6px] p-2'>
            <div className='flex'>
              <Image
                onClick={showDetail(0)}
                src={File[0]}
                width={1000}
                height={1000}
                alt='Hình ảnh phòng'
                className='w-full rounded-lg shadow aspect-square object-cover'
              />
              <div className='relative w-[200px] h-auto'>
                <div
                  onClick={() => closeFile(0)}
                  className='absolute top-1 right-1 rounded-[50%] bg-gray-100'
                >
                  <DeleteIcon className='size-6 text-primary-500' />
                </div>
              </div>
            </div>
            <div className='flex'>
              <Image
                onClick={showDetail(1)}
                src={File[1]}
                alt='Khu bếp'
                className='w-full rounded-lg shadow aspect-square object-cover'
                width={1000}
                height={0}
              />
              <div className='relative w-[200px] h-auto'>
                <div
                  onClick={() => closeFile(1)}
                  className='absolute top-1 right-1 rounded-[50%] bg-gray-100'
                >
                  <DeleteIcon className='size-6 text-primary-500' />
                </div>
              </div>
            </div>
            <div className='flex'>
              <Image
                onClick={showDetail(2)}
                src={File[2]}
                alt='Nhà vệ sinh'
                className='w-full rounded-lg shadow aspect-square object-cover'
                width={1000}
                height={0}
              />
              <div className='relative w-[200px] h-auto'>
                <div
                  onClick={() => closeFile(2)}
                  className='absolute top-1 right-1 rounded-[50%] bg-gray-100'
                >
                  <DeleteIcon className='size-6 text-primary-500' />
                </div>
              </div>
            </div>

            <div className='flex'>
              <Image
                onClick={showDetail(3)}
                src={File[3]}
                alt='Bồn cầu'
                className='w-full rounded-lg shadow aspect-square object-cover'
                width={1000}
                height={0}
              />
              <div className='relative w-[200px] h-auto'>
                <div
                  onClick={() => closeFile(3)}
                  className='absolute top-1 right-1 rounded-[50%] bg-gray-100'
                >
                  <DeleteIcon className='size-6 text-primary-500' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (File.length >= 5) {
    return (
      <div>
        <div className='absolute inset-0 overflow-hidden rounded-md'></div>
        <div className='relative z-40'>
          <div className='grid grid-cols-2 gap-[6px] p-2'>
            <div className='flex'>
              <Image
                onClick={showDetail(0)}
                src={File[0]}
                width={1000}
                height={1000}
                alt='Hình ảnh phòng'
                className='w-full rounded-lg shadow aspect-square object-cover'
              />
              <div className='relative w-[200px] h-auto'>
                <div
                  onClick={() => closeFile(0)}
                  className='absolute top-1 right-1 rounded-[50%] bg-gray-100'
                >
                  <DeleteIcon className='size-6 text-primary-500' />
                </div>
              </div>
            </div>
            <div className='flex'>
              <Image
                onClick={showDetail(1)}
                src={File[1]}
                alt='Khu bếp'
                className='w-full rounded-lg shadow aspect-square object-cover'
                width={1000}
                height={0}
              />
              <div className='relative w-[200px] h-auto'>
                <div
                  onClick={() => closeFile(1)}
                  className='absolute top-1 right-1 rounded-[50%] bg-gray-100'
                >
                  <DeleteIcon className='size-6 text-primary-500' />
                </div>
              </div>
            </div>
            <div className='flex'>
              <Image
                onClick={showDetail(2)}
                src={File[2]}
                alt='Nhà vệ sinh'
                className='w-full rounded-lg shadow aspect-square object-cover'
                width={1000}
                height={0}
              />
              <div className='relative w-[200px] h-auto'>
                <div
                  onClick={() => closeFile(2)}
                  className='absolute top-1 right-1 rounded-[50%] bg-gray-100'
                >
                  <DeleteIcon className='size-6 text-primary-500' />
                </div>
              </div>
            </div>

            <div className='relative flex'>
              <Image
                src={File[3]}
                alt='Bồn cầu'
                className='w-full rounded-lg shadow aspect-square object-cover'
                width={1000}
                height={0}
              />
              <div
                onClick={showDetail(3)}
                className='absolute top-0 left-0 w-full h-full bg-black rounded-lg opacity-50 flex justify-center items-center'
              >
                <p className='text-white text-7xl'>+{File.length - 4}</p>
              </div>

              <div className='relative w-[200px] h-auto'>
                <div
                  onClick={() => closeFile(2)}
                  className='absolute top-1 right-1 rounded-[50%] bg-gray-100'
                >
                  <DeleteIcon className='size-6 text-primary-500' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>PostImage</div>;
};

export default CreatePostImage;
