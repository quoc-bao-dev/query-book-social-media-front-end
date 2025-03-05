'use client';

import Image from 'next/image';
import { useListImageDetail } from '../signal/listImageDetail';
type Props = {
  lsImage: string[];
};
const PostImage = ({ lsImage }: Props) => {
  const { showModal, setImages, setCurIndex } = useListImageDetail();

  const showDetail = (index: number) => () => {
    setImages(lsImage);
    setCurIndex(index);
    showModal();
  };

  if (lsImage.length === 0) {
    return null;
  }

  if (lsImage.length === 1) {
    return (
      <div>
        <div className='absolute bg-gray-200 inset-0 overflow-hidden rounded-md'>
          {lsImage.map((mediaUrl, index) => (
            <Image
              onClick={showDetail(index)}
              key={index}
              src={`${mediaUrl}`}
              className='rounded-md text-center w-full h-auto opacity-50 blur-sm object-contain'
              alt=''
              width={1000}
              height={1000}
            />
          ))}
        </div>
        <div className='relative z-40'>
          {lsImage.map((mediaUrl, index) => (
            <Image
              onClick={showDetail(index)}
              key={index}
              src={`${mediaUrl}`}
              className='rounded-md text-center max-h-[600px] object-contain'
              alt=''
              width={1000}
              height={1000}
            />
          ))}
        </div>
      </div>
    );
  }

  if (lsImage.length === 2) {
    return (
      <div>
        <div className='absolute inset-0 overflow-hidden rounded-md'></div>
        <div className='relative z-40'>
          <div className='grid grid-cols-2 gap-2 p-2 items-center'>
            <Image
              onClick={showDetail(0)}
              src={lsImage[0]}
              width={1000}
              height={1000}
              alt='Hình ảnh phòng'
              className='w-full rounded-lg shadow aspect-square object-cover'
            />
            <Image
              onClick={showDetail(1)}
              src={lsImage[1]}
              alt='Khu bếp'
              className='w-full rounded-lg shadow aspect-square object-cover'
              width={1000}
              height={0}
            />
          </div>
        </div>
      </div>
    );
  }

  if (lsImage.length === 3) {
    return (
      <div>
        <div className='absolute inset-0 overflow-hidden rounded-md'></div>
        <div className='relative z-40'>
          <div className='grid grid-cols-3 gap-2 p-2 items-end'>
            <Image
              onClick={showDetail(0)}
              src={lsImage[0]}
              width={1000}
              height={1000}
              alt='Hình ảnh phòng'
              className='w-full rounded-lg shadow mb-4 aspect-square object-cover'
            />
            <Image
              onClick={showDetail(1)}
              src={lsImage[1]}
              alt='Khu bếp'
              className='w-full rounded-lg shadow aspect-square object-cover'
              width={1000}
              height={0}
            />
            <Image
              onClick={showDetail(2)}
              src={lsImage[2]}
              alt='Nhà vệ sinh'
              className='w-full rounded-lg shadow mb-4 aspect-square object-cover'
              width={1000}
              height={0}
            />
          </div>
        </div>
      </div>
    );
  }

  if (lsImage.length === 4) {
    return (
      <div>
        <div className='absolute inset-0 overflow-hidden rounded-md'></div>
        <div className='relative z-40'>
          <div className='grid grid-cols-2 gap-[6px] p-2'>
            <Image
              onClick={showDetail(0)}
              src={lsImage[0]}
              width={1000}
              height={1000}
              alt='Hình ảnh phòng'
              className='w-full rounded-lg shadow aspect-square object-cover'
            />
            <Image
              onClick={showDetail(1)}
              src={lsImage[1]}
              alt='Khu bếp'
              className='w-full rounded-lg shadow aspect-square object-cover'
              width={1000}
              height={0}
            />
            <Image
              onClick={showDetail(2)}
              src={lsImage[2]}
              alt='Nhà vệ sinh'
              className='w-full rounded-lg shadow aspect-square object-cover'
              width={1000}
              height={0}
            />
            <Image
              onClick={showDetail(3)}
              src={lsImage[3]}
              alt='Bồn cầu'
              className='w-full rounded-lg shadow aspect-square object-cover'
              width={1000}
              height={0}
            />
          </div>
        </div>
      </div>
    );
  }

  if (lsImage.length >= 5) {
    return (
      <div>
        <div className='absolute inset-0 overflow-hidden rounded-md'></div>
        <div className='relative z-40'>
          <div className='grid grid-cols-2 gap-[6px] p-2'>
            <Image
              onClick={showDetail(0)}
              src={lsImage[0]}
              width={1000}
              height={1000}
              alt='Hình ảnh phòng'
              className='w-full rounded-lg shadow aspect-square object-cover'
            />
            <Image
              onClick={showDetail(1)}
              src={lsImage[1]}
              alt='Khu bếp'
              className='w-full rounded-lg shadow aspect-square object-cover'
              width={1000}
              height={0}
            />
            <Image
              onClick={showDetail(2)}
              src={lsImage[2]}
              alt='Nhà vệ sinh'
              className='w-full rounded-lg shadow aspect-square object-cover'
              width={1000}
              height={0}
            />
            <div className='relative ' onClick={showDetail(3)}>
              <Image
                src={lsImage[3]}
                alt='Bồn cầu'
                className='w-full rounded-lg shadow aspect-square object-cover'
                width={1000}
                height={0}
              />
              <div className='absolute top-0 left-0 w-full h-full bg-black rounded-lg opacity-50 flex justify-center items-center'>
                <p className='text-white text-7xl'>+{lsImage.length - 4}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>PostImage</div>;
};

export default PostImage;
