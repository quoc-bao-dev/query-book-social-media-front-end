'use client';

import { ImageIcon } from 'lucide-react';
import { useCallback } from 'react';
import { useListImageDetail } from '../../(home)/(feeds)/signal/listImageDetail';

interface ImageRenderProps {
  images?: string[]; // `?` để tránh lỗi nếu `images` là `undefined`
}

const ImageRender: React.FC<ImageRenderProps> = ({ images = [] }) => {
  const { showModal, setImages, setCurIndex } = useListImageDetail();

  const showImageDetail = useCallback(() => {
    if (images.length === 0) return; // Đảm bảo không gọi nếu không có ảnh
    setImages(images);
    setCurIndex(0);
    showModal();
  }, [images, setImages, setCurIndex, showModal]);

  if (images.length === 0) return null; // Kiểm tra ở đây để tránh lỗi

  return (
    <div
      className='group relative mt-2 flex w-20 items-center gap-2 p-1 border border-info-500 rounded-md bg-info-100 cursor-pointer hover:bg-info-200'
      onClick={showImageDetail}
    >
      <span className='absolute -top-[3px] -right-[6px] w-3 h-3 bg-red-600 rounded-full'></span>

      <ImageIcon className='size-5 text-info-500 group-hover:text-info-600' />

      <span className='text-sm font-semibold text-info-500 group-hover:text-info-600'>
        {images.length} {images.length > 1 ? 'files' : 'file'}
      </span>
    </div>
  );
};

export default ImageRender;
