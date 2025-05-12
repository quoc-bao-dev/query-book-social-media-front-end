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
  userMe: { avatarUrl?: string } | null;
}

const AvatarModal = ({
  isModalOpen,
  setIsModalOpen,
  userMe,
}: AvatarModalProps) => {
  const [curImage, setCurImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false); // Track the upload state

  const { mutateAsync } = useUpdateUserProfileMutation();

  const avtImage = curImage ? URL.createObjectURL(curImage) : userMe?.avatarUrl;

  const handleUpload = async () => {
    if (!curImage) return; // Make sure there's a file selected

    setIsUploading(true); // Set uploading to true when the upload starts

    try {
      const image = await uploadImage(curImage!);
      const payload = {
        avatar: {
          type: 'image',
          sourceType: 'file',
          fileName: image,
        },
      };

      await mutateAsync(payload);
      setIsModalOpen(false); // Close the modal after successful upload
    } catch (error) {
      // Optionally handle any errors that occur during the upload process
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false); // Set uploading to false when done (success or failure)
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-card p-4 rounded-lg w-[500px] h-auto'>
        {/* Title */}
        <p className='text-center text-xl pb-4 font-semibold'>
          Thay ảnh đại diện
        </p>

        {/* Avatar preview */}
        <div className='flex flex-col items-center mb-5'>
          <div className='relative'>
            {
              <div className='w-48 h-48 flex items-center justify-center rounded-full text-neutral-900 font-bold text-4xl'>
                <img
                  src={avtImage}
                  alt='Avatar'
                  className='w-48 h-48 object-cover rounded-full'
                  style={{ imageRendering: 'auto' }}
                />
              </div>
            }
          </div>

          {/* Upload button */}
          <div className='mt-3 w-auto flex space-x-4'>
            <label
              htmlFor='avatarUpload'
              className='flex items-center bottom-0 right-0 bg-blue-500 text-white p-1 px-3 rounded-full shadow cursor-pointer hover:bg-blue-600 transition'
            >
              <PlusIcon className='w-4 h-4' />
              <span className='ml-1 text-sm flex'>Tải ảnh lên</span>
            </label>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          id='avatarUpload'
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
            onClick={handleUpload}
            disabled={isUploading} // Disable the button if uploading
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

export default AvatarModal;
