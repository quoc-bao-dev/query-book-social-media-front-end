import { useCallback, useMemo, useState } from 'react';
import { useUpdateUserProfileMutation } from '@/queries/user';
import Xmark from '@/components/icons/X-mark';
import { sCurUserProfileSignal } from '../../../signal/curUserProfileSignal';
import Pen from '@/components/icons/Pencil';

const LinkListUserId = () => {
  const { user } = sCurUserProfileSignal.use();
  const { mutateAsync } = useUpdateUserProfileMutation();

  // Trạng thái chỉnh sửa
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedLink, setEditedLink] = useState<{ title: string; url: string }>({
    title: '',
    url: '',
  });

  // Xóa liên kết
  const handleDeleteLink = useCallback(
    async (index: number) => {
      if (!user?.links) return;
      try {
        await mutateAsync({
          links: user.links.filter((_, i) => i !== index),
        });
      } catch (err) {
        console.error('Failed to delete link:', err);
      }
    },
    [user, mutateAsync],
  );

  // Bắt đầu chỉnh sửa
  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setEditedLink(user?.links[index] || { title: '', url: '' });
  };

  // Cập nhật liên kết
  const handleSaveEdit = async () => {
    if (!user?.links || editingIndex === null) return;

    const updatedLinks = [...user.links];
    updatedLinks[editingIndex] = editedLink; // Cập nhật liên kết đã chỉnh sửa

    try {
      await mutateAsync({ links: updatedLinks });
      setEditingIndex(null);
    } catch (err) {
      console.error('Failed to update link:', err);
    }
  };

  return useMemo(
    () => (
      <div className='space-y-3'>
        {user?.links?.length ? (
          user.links.map((link, index) => (
            <div
              key={index}
              className='border flex items-center justify-between p-3 bg-gray-100 rounded-lg '
            >
              {editingIndex === index ? (
                <div className='flex flex-col space-y-2 w-full'>
                  {/* Input chỉnh sửa tiêu đề */}
                  <input
                    type='text'
                    value={editedLink.title}
                    onChange={(e) =>
                      setEditedLink({ ...editedLink, title: e.target.value })
                    }
                    className='border px-2 py-1 rounded'
                    placeholder='Nhập tiêu đề mới'
                  />
                  {/* Input chỉnh sửa URL */}
                  <input
                    type='text'
                    value={editedLink.url}
                    onChange={(e) =>
                      setEditedLink({ ...editedLink, url: e.target.value })
                    }
                    className='border px-2 py-1 rounded'
                    placeholder='Nhập URL mới'
                  />
                  {/* Nút lưu & hủy */}
                  <div className='flex space-x-2'>
                    <button
                      onClick={handleSaveEdit}
                      className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600'
                    >
                      Lưu
                    </button>
                    <button
                      onClick={() => setEditingIndex(null)}
                      className='bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500'
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Hiển thị liên kết */}
                  <a
                    href={link.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 hover:text-blue-800 break-all'
                  >
                    {link.title}
                  </a>
                </>
              )}
            </div>
          ))
        ) : (
          <p className='text-gray-500 italic'>Chưa có liên kết nào</p>
        )}
      </div>
    ),
    [user, handleDeleteLink, handleSaveEdit, editingIndex, editedLink],
  );
};

export default LinkListUserId;
