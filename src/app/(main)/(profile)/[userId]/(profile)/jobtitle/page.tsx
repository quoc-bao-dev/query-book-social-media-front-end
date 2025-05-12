'use client';

import User from '@/components/icons/User';
import { useJobTitleQuery } from '@/queries/jobTitle';
import { useGetWork } from '@/queries/workexperience';
import { WorkExperience } from '@/types/workexperience';
import { sCurUserProfileSignal } from '../../../signal/curUserProfileSignal';
import Pen from '@/components/icons/Pencil';

const Page = () => {
  const { user } = sCurUserProfileSignal.use();

  // Gọi API chỉ lấy công việc của user hiện tại
  const { data: listWork, isLoading: isLoadingWork } = useGetWork(
    user?.id ?? '',
  );

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
              <ul className='mt-1 space-y-4'>
                {listWork.map((work: WorkExperience) => {
                  const jobTitle =
                    jobTitles.find((job) => job.id === work.jobTitleId)
                      ?.title || 'Không xác định';

                  return (
                    <li
                      key={work._id}
                      className='border rounded-lg bg-card shadow-sm'
                    >
                      <div className='max-w-2xl mx-auto space-y-8'>
                        {/* Work Experience Item */}
                        <div className='space-y-3 p-3 relative'>
                          {/* Action buttons ở góc phải */}

                          <div className='space-y-1'>
                            <div className='text-gray-600'>
                              {new Date(work.startDate).getFullYear()} -{' '}
                              {new Date(work.endDate).getFullYear()}
                            </div>
                            <h3 className='text-lg font-semibold'>
                              {jobTitle}
                            </h3>
                            <p className='text-gray-500 text-sm'>
                              {work.description}
                            </p>
                          </div>
                        </div>
                      </div>
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
