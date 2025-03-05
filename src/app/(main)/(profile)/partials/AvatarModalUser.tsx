'use client';

import Xmark from '@/components/icons/X-mark';
// Định nghĩa kiểu cho props
interface AvatarModalProps {
  isModalOpenAvtUserId: boolean;
  setIsModalOpenAvtUserId: React.Dispatch<React.SetStateAction<boolean>>;
  user: { avatarUrl?: string } | null;
}
const AvatarModalUser = ({
  isModalOpenAvtUserId,
  setIsModalOpenAvtUserId,
  user,
}: AvatarModalProps) => {
  if (!isModalOpenAvtUserId) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-card p-4 rounded-lg w-[500px] h-auto relative'>
        <button
          onClick={() => setIsModalOpenAvtUserId(false)}
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition'
          aria-label='Đóng'
        >
          <Xmark />
        </button>

        <p className='text-center text-xl pb-4 font-semibold'>Ảnh đại diện</p>

        <div className='flex flex-col items-center mb-5'>
          <div className='relative p-2 bg-muted rounded-full'>
            {
              <div className='flex items-center justify-center rounded-full text-neutral-900 font-bold text-4xl'>
                <img
                  src={user?.avatarUrl}
                  alt='Avatar'
                  className='w-96 h-96 object-cover rounded-full'
                />
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarModalUser;
