import { useState, useEffect } from 'react';
import Xmark from '@/components/icons/X-mark';
import { useGetAccountReportQuery } from '@/queries/report';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';
import { useCreateAccountReportMutation } from '@/queries/report';
import swal from 'sweetalert2';

const ReportReasonList = ({ onClose }: { onClose: () => void }) => {
  const { data: reportReasons, isLoading, error } = useGetAccountReportQuery();
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [pageId, setPageId] = useState<string | null>(null); // state để lưu id từ URL

  // Lấy id từ URL
  useEffect(() => {
    const path = window.location.pathname; // Lấy đường dẫn URL
    const id = path.split('/')[1]; // Giả sử id là phần sau dấu "/"
    setPageId(id); // Gán ID vào state
  }, []); // Chạy chỉ 1 lần khi component mount

  // Sử dụng mutation hook với userId
  const {
    mutate: createReport,
    isPending: isSubmitting,
    error: submitError,
    isSuccess,
  } = useCreateAccountReportMutation(pageId || '');

  const handleSelectReason = (reason: string) => {
    setSelectedReason(reason);
  };

  const handleSubmit = () => {
    if (selectedReason && pageId) {
      const reportData = {
        content: selectedReason, // Thêm thuộc tính content
        reason: selectedReason,
        additional_info: additionalInfo,
      };
      createReport(reportData); // Gửi dữ liệu báo cáo

      // console.log('Lý do báo cáo:', selectedReason);
      // console.log('Thông tin bổ sung:', additionalInfo);
      // console.log('ID trang cá nhân:', pageId); // ID lấy từ URL
      onClose(); // Đóng modal sau khi gửi báo cáo
    }
  };

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
          {selectedReason ? 'Xác nhận báo cáo' : 'Báo Cáo Trang Cá Nhân'}
        </h2>

        {selectedReason === null ? (
          <>
            {/* Câu hỏi hướng dẫn */}
            <p className='mt-4 text-xl text-neutral-950 font-semibold'>
              Tại sao bạn muốn báo cáo trang cá nhân này?
            </p>

            {/* Danh sách lý do */}
            <ul className='divide-y divide-gray-200 mt-3'>
              {reportReasons?.map(
                ({ id, content }: { id: string; content: string }) => (
                  <li
                    key={id}
                    className='flex items-center gap-2 p-3 text-neutral-950 text-base hover:bg-gray-100 rounded-md cursor-pointer transition-all font-semibold'
                    onClick={() => handleSelectReason(content)}
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
              Bạn muốn báo cáo trang cá nhân này vì nó mang:{' '}
              <strong>{selectedReason}</strong>
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
            ></textarea>
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
