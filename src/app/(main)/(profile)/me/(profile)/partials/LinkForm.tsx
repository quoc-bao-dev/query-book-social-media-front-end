import { useState, useCallback } from 'react';
import FloatInput from '@/components/common/FloatInput';
import { useUpdateUserProfileMutation } from '@/queries/user';
import { sCurUserProfileSignal } from '../../../signal/curUserProfileSignal';

const URL_REGEX =
  /^(https?:\/\/)([a-zA-Z0-9.-]+)\.([a-z.]{2,6})(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;

interface LinkFormProps {
  onClose: () => void;
}

const LinkForm = ({ onClose }: LinkFormProps) => {
  const { user } = sCurUserProfileSignal.use();
  const { mutateAsync, isPending } = useUpdateUserProfileMutation();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [titleError, setTitleError] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);

  const validateForm = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError('Vui lòng nhập tiêu đề');
      isValid = false;
    }

    if (!url.trim()) {
      setUrlError('Vui lòng nhập URL');
      isValid = false;
    } else if (!URL_REGEX.test(url)) {
      setUrlError('URL không hợp lệ');
      isValid = false;
    }

    return isValid;
  };

  const handleAddLink = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setTitleError(null);
      setUrlError(null);

      if (!validateForm()) return;

      const payload = {
        links: [...(user?.links || []), { title, url }],
      };

      try {
        await mutateAsync(payload);
        setTitle('');
        setUrl('');
        onClose();
      } catch (err) {
        setUrlError('Cập nhật thất bại. Vui lòng thử lại.');
        console.error('Failed to update profile:', err);
      }
    },
    [title, url, user, mutateAsync, onClose],
  );

  return (
    <form onSubmit={handleAddLink} className='space-y-4 mb-8'>
      <div className='grid gap-4 md:grid-cols-2'>
        <FloatInput
          label='Tiêu đề liên kết'
          value={title}
          error={!!titleError}
          onChange={(e) => {
            setTitle(e.target.value);
            setTitleError(null);
          }}
        />
        <FloatInput
          label='URL'
          type='url'
          value={url}
          error={!!urlError}
          onChange={(e) => {
            setUrl(e.target.value);
            setUrlError(null);
          }}
        />
      </div>

      <div className='flex space-x-3'>
        <button
          type='submit'
          disabled={isPending}
          className='px-3 py-1 bg-primary-500 text-white text-base rounded-lg disabled:opacity-50'
        >
          {isPending ? 'Đang lưu...' : 'Thêm liên kết'}
        </button>
        <button
          type='button'
          onClick={onClose}
          className='px-4 py-2 text-base border border-gray-300 rounded-lg hover:bg-gray-50'
        >
          Hủy bỏ
        </button>
      </div>
    </form>
  );
};

export default LinkForm;
