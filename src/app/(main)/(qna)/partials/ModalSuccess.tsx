import Modal from '@/components/common/Modal';
import CheckIcon from '@/components/icons/CheckIcon';

type ModalSuccessProps = {
  isOpen: boolean;
  onClose: () => void;
  message: string;
};

const ModalSuccess = ({ isOpen, onClose, message }: ModalSuccessProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='bg-white p-6 rounded-xl shadow-xl w-96 text-center'>
        {/* Icon thành công */}
        <div className='flex justify-center text-green-500'>
          <CheckIcon className='w-12 h-12' />
        </div>

        {/* Tiêu đề */}
        <h2 className='text-xl font-semibold text-green-600 mt-4'>
          Thành công
        </h2>

        {/* Nội dung thông báo */}
        <p className='mt-2 text-gray-600'>{message}</p>

        {/* Nút đóng modal */}
        <button
          className='mt-6 px-5 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-all'
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </Modal>
  );
};

export default ModalSuccess;
