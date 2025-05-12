import { useState, useEffect } from 'react';
import Xmark from '@/components/icons/X-mark';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';
import swal from 'sweetalert2';
import {
  useGetAccountReportQuery,
  useCreateAccountReportMutation,
} from '@/queries/report';

const ReportReasonList = ({ onClose }: { onClose: () => void }) => {
  const { data: reportReasons, isLoading, error } = useGetAccountReportQuery();

  const [selectedReasonId, setSelectedReasonId] = useState<string | null>(null);
  const [selectedReasonContent, setSelectedReasonContent] = useState<
    string | null
  >(null);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [pageId, setPageId] = useState<string | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    const id = path.split('/')[1];
    setPageId(id);
  }, []);

  const {
    mutate: createReport,
    isPending: isSubmitting,
    error: submitError,
    isSuccess,
  } = useCreateAccountReportMutation(pageId || '');

  const handleSelectReason = (id: string, content: string) => {
    setSelectedReasonId(id);
    setSelectedReasonContent(content);
  };

  const handleSubmit = () => {
    if (selectedReasonId && additionalInfo) {
      const reportData = {
        reason: selectedReasonId,
        content: additionalInfo,
      };

      createReport(reportData);
    } else {
      swal.fire({
        icon: 'warning',
        title: 'Thiếu thông tin',
        text: 'Vui lòng chọn lý do và nhập chi tiết nếu cần.',
      });
      return;
    }
  };

  useEffect(() => {
    if (isSuccess) {
      swal.fire({
        icon: 'success',
        title: 'Báo cáo thành công!',
        text: 'Cảm ơn bạn đã báo cáo. Chúng tôi sẽ xem xét vấn đề này.',
      });
      onClose();
    }

    if (submitError) {
      swal.fire({
        icon: 'error',
        title: 'Có lỗi xảy ra',
        text: 'Không thể gửi báo cáo, vui lòng thử lại.',
      });
    }
  }, [isSuccess, submitError, onClose]);

  if (isLoading) return <p className='p-2 text-gray-500'>Đang tải lý do...</p>;
  if (error) return <p className='p-2 text-red-500'>Lỗi khi tải dữ liệu</p>;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-30'>
      <div className='bg-white border border-gray-300 rounded-lg shadow-lg w-[648px] p-4 relative'>
        {/* Nút đóng */}
        <button
          className='absolute top-3 right-3 text-gray-900 hover:text-gray-900'
          onClick={onClose}
        >
          <Xmark />
        </button>

        {/* Header */}
        <h2 className='text-lg font-semibold text-neutral-950 text-center border-b pb-2'>
          {selectedReasonId ? 'Xác nhận báo cáo' : 'Báo Cáo Trang Cá Nhân'}
        </h2>

        {selectedReasonId === null ? (
          <>
            <p className='mt-4 text-xl text-neutral-950 font-semibold'>
              Tại sao bạn muốn báo cáo trang cá nhân này?
            </p>
            <ul className='divide-y divide-gray-200 mt-3'>
              {reportReasons?.map(
                ({ id, content }: { id: string; content: string }) => (
                  <li
                    key={id}
                    className='flex items-center gap-2 p-3 text-neutral-950 text-base hover:bg-gray-100 rounded-md cursor-pointer transition-all font-semibold'
                    onClick={() => handleSelectReason(id, content)}
                  >
                    <ChevronRightIcon className='w-5 h-5 text-gray-950' />
                    {content}
                  </li>
                ),
              )}
            </ul>
          </>
        ) : (
          <div className='mt-3'>
            <p className='text-lg text-neutral-950'>
              Bạn muốn báo cáo trang cá nhân này vì:{' '}
              <strong>{selectedReasonContent}</strong>
            </p>
            <div className='w-full text-gray-900 pt-4'>
              Hãy ghi rõ chi tiết nội dung bạn sắp báo cáo
            </div>
            <textarea
              placeholder='Nhập nội dung bạn muốn báo cáo!'
              rows={3}
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className='mt-2 border-[0.3px] w-full p-2 h-36 focus:border-primary-500 outline-none rounded-md resize-none'
            />
            <div className='pt-2'>
              Chúng tôi chỉ gỡ nội dung{' '}
              <span className='text-error-500 font-semibold'>
                vi phạm tiêu chuẩn cộng đồng
              </span>{' '}
              của mình.
            </div>
            <div className='flex py-5 justify-center items-center'>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className='ripple-container inline-flex items-center justify-center font-semibold rounded-md transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 truncate bg-primary text-primary-foreground text-base px-4 py-2'
              >
                {isSubmitting ? 'Đang gửi...' : 'Báo cáo'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportReasonList;
