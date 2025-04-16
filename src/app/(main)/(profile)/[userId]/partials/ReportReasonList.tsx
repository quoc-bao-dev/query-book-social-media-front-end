import { useState } from 'react';
import Xmark from '@/components/icons/X-mark';
import { useReportReasonQuery } from '@/queries/report';
import { useFetchReportReasons } from '@/queries/report';

const ReportReasonList = ({ onClose }: { onClose: () => void }) => {
  const { data: reportReasons, isLoading, error } = useReportReasonQuery();
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleSelectReason = (reason: string) => {
    console.log('Lý do đã chọn:', reason); // Kiểm tra log
    setSelectedReason(reason);
  };

  const handleSubmit = () => {
    console.log('Lý do báo cáo:', selectedReason);
    console.log('Thông tin bổ sung:', additionalInfo);
    alert('Gửi báo cáo thành công!');
    onClose();
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
          <ul className='divide-y divide-gray-200 mt-3'>
            {reportReasons?.map(({ id, content }) => (
              <li
                key={id}
                className='p-3 text-neutral-950 text-base hover:bg-gray-100 rounded-md cursor-pointer transition-all'
                onClick={() => handleSelectReason(content)}
              >
                {content}
              </li>
            ))}
          </ul>
        ) : (
          <div className='mt-3'>
            <p className='text-base text-gray-700'>
              Lý do: <strong>{selectedReason}</strong>
            </p>
            <textarea
              className='w-full border rounded-md p-2 mt-2 text-sm'
              rows={3}
              placeholder='Mô tả chi tiết (tuỳ chọn)'
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
            <div className='flex justify-end gap-2 mt-4'>
              <button
                className='px-4 py-2 text-gray-700 bg-gray-200 rounded-md'
                onClick={() => setSelectedReason(null)}
              >
                Quay lại
              </button>
              <button
                className='px-4 py-2 text-primary-50 bg-primary-500 rounded-md hover:bg-primary-400'
                onClick={handleSubmit}
              >
                Gửi báo cáo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportReasonList;
