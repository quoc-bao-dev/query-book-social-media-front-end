'use client';

import { ImageIcon } from 'lucide-react';
import { useListImageDetail } from '../../(home)/(feeds)/signal/listImageDetail';

const ImageRender = ({ images }: { images: string[] }) => {
  const { showModal, setImages, setCurIndex } = useListImageDetail();
  if (!images || images.length === 0) return null;

  const ShowimageDetail = () => {
    setImages(images);
    setCurIndex(0);
    showModal();
  };

  return (
    <div
      className='group relative mt-1 flex w-24 items-center gap-2 p-2 border rounded-md bg-info-100 shadow-sm cursor-pointer hover:bg-info-700'
      onClick={ShowimageDetail}
    >
      <span className='absolute top-[-3px] right-[-6px] w-3 h-3 bg-red-600 rounded-full'></span>

      <ImageIcon className='w-5 h-5 text-neutral-900 group-hover:text-neutral-100' />

      <span className='text-s m font-semibold text-neutral-900 group-hover:text-neutral-100'>
        {images.length} {images.length > 1 ? 'files' : 'file'}
      </span>
    </div>
  );
};

export default ImageRender;
