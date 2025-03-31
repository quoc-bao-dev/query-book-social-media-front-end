'use client';
import { Button } from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';
import { useCreateReportMutation, useGetReportQuery } from '@/queries/report';
import { useCallback, useEffect, useRef, useState } from 'react';
import { signify } from 'react-signify';

type ReportPostProps = {
  isShow: boolean;
  postId: string;
};

export const sModalReportPost = signify<ReportPostProps>({
  isShow: false,
  postId: '',
});

export const useModalReportPost = () => {
  return {
    openReport: () => sModalReportPost.set((n) => (n.value.isShow = true)),
    closeReport: () => sModalReportPost.set((n) => (n.value.isShow = false)),
  };
};

const ModalReport = () => {
  const [step, setStep] = useState(1);
  const [reason, setReason] = useState('');
  const [reportId, setReportId] = useState('');

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { isShow, postId } = sModalReportPost.use();
  const { closeReport } = useModalReportPost();
  const { data } = useGetReportQuery();
  const { mutateAsync } = useCreateReportMutation(postId);

  const handleReport = () => {
    setStep(2);
  };

  const contentReport = data?.data?.data;

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
          {contentReport.map((_content, index) => (
            <div
              key={index}
              onClick={() => {
                handleReport();
                setReason(_content.content);
                setReportId(_content.id);
              }}
              className='w-full font-medium h-[50px] px-2 hover:bg-gray-200 rounded-md flex items-center'
            >
              <ChevronRightIcon className='size-5 fill-gray-800' />
              {_content.content}
            </div>
          ))}
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
        <div className='px-4 pt-4'>
          <div className='w-full text-[18px]'>
            Bạn muốn báo cáo bài viết này vì nó mang{' '}
            <span className='font-semibold'>{reason}</span>
          </div>
          <div className='w-full text-gray-900 pt-4'>
            Hãy ghi rõ chi tiết nội dung bạn sắp báo cáo
          </div>
          <div className='max-h-[500px] mt-2 overflow-y-auto'>
            <textarea
              placeholder='Nhập nội dung bạn muốn báo cáo!'
              className='border-[0.3px] w-full p-2 h-[150px] focus:border-primary-500 outline-none rounded-md resize-none'
              ref={contentRef}
            ></textarea>
          </div>
          <div className='pt-2'>
            Chúng tôi chỉ gỡ nội dung{' '}
            <span className='text-error-500 font-semibold'>
              vi phạm tiêu chuẩn cộng đồng
            </span>{' '}
            của mình.
          </div>
        </div>
        <div className='flex py-5 justify-center items-center'>
          <Button onClick={handleSubmit}>Báo cáo</Button>
        </div>
      </div>
    );
  }, [reason]);

  // Gửi báo cáo
  const handleSubmit = async () => {
    const content = contentRef.current?.value?.trim() || '';
    const payload = {
      reason: reportId,
      content,
    };

    await mutateAsync(payload);

    closeReport();
    setReason('');
    setReportId('');
    setStep(1);
  };

  return (
    <Modal isOpen={isShow} onClose={closeReport}>
      <div className='relative w-[650px] h-auto bg-card rounded-xl  '>
        {step === 1 && <FormStep1 />}
        {step === 2 && <FormStep2 />}
      </div>
    </Modal>
  );
};

export default ModalReport;
