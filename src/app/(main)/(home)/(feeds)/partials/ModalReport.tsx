'use client';
import Modal from '@/components/common/Modal';
import DeleteIcon from '@/components/icons/DeleteIcon';
import { signify } from 'react-signify';

type ReportPostProps = {
  isShow: boolean;
};

const sModalReportPost = signify<ReportPostProps>({
  isShow: false,
});

export const useModalReportPost = () => {
  return {
    openReport: () => sModalReportPost.set((n) => (n.value.isShow = true)),
    closeReport: () => sModalReportPost.set((n) => (n.value.isShow = false)),
  };
};

const ModalReport = () => {
  const { isShow } = sModalReportPost.use();
  const { closeReport } = useModalReportPost();
  return (
    <Modal isOpen={isShow} onClose={closeReport}>
      <div className='relative w-[600px] h-auto bg-card rounded-xl  '>
        <div
          onClick={closeReport}
          className='absolute top-3 right-3 cursor-pointer flex justify-center items-center'
        >
          <DeleteIcon className='size-6' />
        </div>
        <h1 className='w-full h-[50px] text-2xl font-semibold text-neutral-950 flex justify-center items-center'>
          Báo Cáo
        </h1>
        <hr />
        <div className='p-2 max-h-[500px] overflow-y-auto'>
          <div className='w-full font-medium h-[50px] px-2 hover:bg-gray-200 rounded-md flex items-center '>
            Nội dung người lớn
          </div>
          <div className='w-full font-medium h-[50px] px-2 hover:bg-gray-200 rounded-md flex items-center '>
            Nội dung mang tính chất bạo lực
          </div>
          <div className='w-full font-medium h-[50px] px-2 hover:bg-gray-200 rounded-md flex items-center '>
            Từ ngữ lăng mạ/xúc phạm
          </div>
          <div className='w-full font-medium h-[50px] px-2 hover:bg-gray-200 rounded-md flex items-center '>
            Thông tin sai sự thật
          </div>
          <div className='w-full font-medium h-[50px] px-2 hover:bg-gray-200 rounded-md flex items-center '>
            Thông tin sai sự thật
          </div>
          <div className='w-full font-medium h-[50px] px-2 hover:bg-gray-200 rounded-md flex items-center '>
            Tôi không muốn xem nội dung này
          </div>
        </div>
        <div className=''></div>
      </div>
    </Modal>
  );
};

export default ModalReport;
