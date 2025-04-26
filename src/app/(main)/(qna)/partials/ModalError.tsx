import Modal from '@/components/common/Modal';
import ErrorIcon from '@/components/icons/ErrorIcon';
import { useTranslations } from 'next-intl';

type ModalErrorProps = {
  isOpen: boolean;
  onClose: () => void;
  message: string;
};

const ModalError = ({ isOpen, onClose, message }: ModalErrorProps) => {
  const t = useTranslations('AskQuestion');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='bg-white p-6 rounded-xl shadow-xl w-96 text-center'>
        {/* Icon cảnh báo */}
        <div className='flex justify-center'>
          <ErrorIcon />
        </div>

        {/* Tiêu đề lỗi */}
        <h2 className='text-xl font-semibold text-red-600 mt-4'>
          {t('error')}
        </h2>

        {/* Nội dung thông báo */}
        <p className='mt-2 text-gray-600'>{message}</p>

        {/* Nút đóng modal */}
        <button
          type='button'
          className='mt-6 px-5 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all'
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </Modal>
  );
};

export default ModalError;
