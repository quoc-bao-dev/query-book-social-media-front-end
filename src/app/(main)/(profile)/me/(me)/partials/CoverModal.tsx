'use client';

import { useState } from 'react';
import PlusIcon from '@/components/icons/PlusIcon';
import { uploadImage } from '@/utils/uploadUtils';
import { useUpdateUserProfileMutation } from '@/queries/user';
import LoadingIcon from '@/components/icons/LoadingIcon';

// Define the types for props
interface AvatarModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userMe: { coverPageUrl?: string } | null;
}

const CoverModal = ({
  isModalOpen,
  setIsModalOpen,
  userMe,
}: AvatarModalProps) => {
  const [curImage, setCurImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false); // Track upload state

  const avtImageCovePage = curImage
    ? URL.createObjectURL(curImage)
    : userMe?.coverPageUrl;

  const { mutateAsync } = useUpdateUserProfileMutation();

  const handleUploadCoverPage = async () => {
    if (!curImage) return; // Make sure an image is selected

    setIsUploading(true); // Set uploading state to true

    try {
      const image = await uploadImage(curImage!);
      const payload = {
        coverPage: {
          type: 'image',
          sourceType: 'file',
          fileName: image,
        },
      };

      await mutateAsync(payload);
      setIsModalOpen(false); // Close modal after successful upload
    } catch (error) {
      console.error('Lỗi khi tải ảnh hoặc cập nhật:', error);
    } finally {
      setIsUploading(false); // Reset uploading state
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-card p-4 rounded-lg shadow-2xl w-[700px] h-auto'>
        {/* Title */}
        <p className='text-center text-xl pb-4 font-semibold'>
          Thay ảnh bìa (1028x250)
        </p>

        {/* Image preview */}
        <div className='flex flex-col items-center mb-5'>
          <div className='relative'>
            <img
              src={avtImageCovePage}
              alt='Cover Image'
              className='object-cover rounded-md w-[500px] h-[300px]'
            />
          </div>

          {/* Upload button */}
          <div className='mt-3 w-auto flex space-x-4'>
            <label
              htmlFor='coverUpload'
              className='flex items-center bottom-0 right-0 bg-blue-500 text-white p-1 px-3 rounded-full shadow cursor-pointer hover:bg-blue-600 transition'
            >
              <PlusIcon className='w-4 h-4' />
              <span className='ml-1 text-sm flex'>Tải ảnh lên</span>
            </label>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          id='coverUpload'
          type='file'
          accept='image/*'
          className='hidden'
          onChange={(e) => setCurImage(e.target.files![0])}
        />

        {/* Action buttons */}
        <div className='flex justify-end space-x-3'>
          <button
            onClick={() => setIsModalOpen(false)}
            className='h-10 px-5 bg-gray-500 text-white rounded-lg hover:bg-gray-500 transition'
          >
            Hủy
          </button>
          <button
            onClick={handleUploadCoverPage}
            disabled={isUploading} // Disable while uploading
            className={`h-10 px-5 ${
              isUploading ? 'bg-primary-500' : 'bg-primary-500'
            } text-white rounded-lg hover:bg-primary-600 transition`}
          >
            {isUploading ? (
              <>
                <LoadingIcon size={20} />
              </>
            ) : (
              'Lưu'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoverModal;
