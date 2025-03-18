'use client';

import User from '@/components/icons/User';
import { useJobTitleQuery } from '@/queries/jobTitle';
import { useGetWork } from '@/queries/workexperience';
import { WorkExperience } from '@/types/workexperience';
import { sCurUserProfileSignal } from '../../../signal/curUserProfileSignal';

const Page = () => {
  const { user } = sCurUserProfileSignal.use();

  // Gọi API chỉ lấy công việc của user hiện tại
  const { data: listWork, isLoading: isLoadingWork } = useGetWork(
    user?.id ?? '',
  );

  console.log('Data', listWork);

  const { data: jobTitlesResponse } = useJobTitleQuery();

  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return 'Hiện tại';
    return new Date(dateString).toLocaleDateString('vi-VN'); // Định dạng: ngày/tháng/năm
  };

  const jobTitles = Array.isArray(jobTitlesResponse?.data?.data)
    ? jobTitlesResponse.data.data
    : [];

  return (
    <div>
      {/* About */}
      <div className='md:w-[698px] h-fit mt-4 border border-b rounded-2xl bg-card'>
        <div className='py-4 px-4 space-y-5'>
          {/* Công việc chính */}
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center space-x-3'>
              <User className='fill-primary-500' />
              <span className='text-base font-semibold text-neutral-800'>
                Kinh nghiệm làm việc:{' '}
              </span>
            </div>
          </div>

          {/* Danh sách công việc */}
          <div>
            {isLoadingWork ? (
              <p className='text-gray-500'>Đang tải dữ liệu...</p>
            ) : listWork && listWork.length > 0 ? (
              <ul className='mt-2'>
                {listWork.map((work: WorkExperience) => {
                  const jobTitle =
                    jobTitles.find((job) => job.id === work.jobTitleId)
                      ?.title || 'Không xác định';

                  return (
                    <li
                      key={work._id}
                      className='border p-4 rounded-lg mt-2 shadow-md bg-gray-100'
                    >
                      <p className='text-lg font-semibold'>
                        Vị Trí: {jobTitle}
                      </p>
                      <p>
                        <strong>Công ty:</strong> {work.company}
                      </p>
                      <p>
                        <strong>Nội dung:</strong> {work.content}
                      </p>
                      <p>
                        <strong>Mô tả:</strong> {work.description}
                      </p>

                      <p>
                        <strong>Bắt đầu:</strong> {formatDate(work.startDate)}
                      </p>
                      <p>
                        <strong>Kết thúc:</strong> {formatDate(work.endDate)}
                      </p>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className='text-gray-500'>Chưa có công việc nào.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
