'use client';
import { Button } from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';
import { el } from 'date-fns/locale';
import { useCallback, useEffect, useRef, useState } from 'react';
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
  const [step, setStep] = useState(1);
  const [content, setContent] = useState('');

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { isShow } = sModalReportPost.use();
  const { closeReport } = useModalReportPost();

  const handleReport = () => {
    setStep(2);
  };

  // Click ra ngoài màn hình sẽ nhận sk để xử lý hiển thị
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        // Đóng menu nếu click bên ngoài
        if (step === 2) {
          setStep(1);
        }
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [step]);

  const FormStep1 = useCallback(() => {
    return (
      <>
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
          <div className=''>
            <h1 className='w-full h-[50px] px-2 text-xl flex items-center font-semibold'>
              Tại sao bạn muốn báo cáo bài viết này?
            </h1>
          </div>
          <div
            onClick={handleReport}
            className='w-full font-medium h-[50px] px-2 hover:bg-gray-200 rounded-md flex items-center'
          >
            <ChevronRightIcon className='size-5 fill-gray-800' />
            Nội dung người lớn
          </div>
          <div
            onClick={handleReport}
            className='w-full font-medium h-[50px] px-2 hover:bg-gray-200 rounded-md flex items-center '
          >
            <ChevronRightIcon className='size-5 fill-gray-800' />
            Nội dung mang tính chất bạo lực
          </div>
          <div
            onClick={handleReport}
            className='w-full font-medium h-[50px] px-2 hover:bg-gray-200 rounded-md flex items-center '
          >
            <ChevronRightIcon className='size-5 fill-gray-800' />
            Từ ngữ lăng mạ/xúc phạm
          </div>
          <div
            onClick={handleReport}
            className='w-full font-medium h-[50px] px-2 hover:bg-gray-200 rounded-md flex items-center '
          >
            <ChevronRightIcon className='size-5 fill-gray-800' />
            Thông tin sai sự thật
          </div>
          <div
            onClick={handleReport}
            className='w-full font-medium h-[50px] px-2 hover:bg-gray-200 rounded-md flex items-center '
          >
            <ChevronRightIcon className='size-5 fill-gray-800' />
            Thông tin sai sự thật
          </div>
          <div
            onClick={handleReport}
            className='w-full font-medium h-[50px] px-2 hover:bg-gray-200 rounded-md flex items-center '
          >
            <ChevronRightIcon className='size-5 fill-gray-800' />
            Tôi không muốn xem nội dung này
          </div>
        </div>
      </>
    );
  }, [handleReport, closeReport]);

  const FormStep2 = useCallback(() => {
    return (
      <div ref={menuRef}>
        <div
          onClick={() => {
            closeReport();
            setStep(1);
          }}
          className='absolute top-3 right-3 cursor-pointer flex justify-center items-center'
        >
          <DeleteIcon className='size-6' />
        </div>
        <h1 className='w-full h-[50px] text-2xl font-semibold text-neutral-950 flex justify-center items-center'>
          Báo Cáo
        </h1>
        <hr />
        <div className='w-full p-2 '>Nội dung bạn muốn báo cáo</div>
        <div className='w-full p-2'>...........</div>
        <div className='p-2 max-h-[500px] overflow-y-auto'>
          <textarea
            placeholder='Nhập nội dung bạn muốn báo cáo!'
            className='border-[0.3px] w-full p-2 h-[50px]'
            ref={contentRef}
          ></textarea>
        </div>
        <div className='flex py-2 justify-center items-center'>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    );
  }, []);

  const handleSubmit = () => {
    console.log('contentRef', contentRef.current?.value);
  };

  return (
    <Modal isOpen={isShow} onClose={closeReport}>
      <div className='relative w-[600px] h-auto bg-card rounded-xl  '>
        {step === 1 && <FormStep1 />}
        {step === 2 && <FormStep2 />}
      </div>
    </Modal>
  );
};

export default ModalReport;
