'use client';

import { useState } from 'react';
import {
  useCreateWorkMutation,
  useGetWork,
  useDeleteWorkMutation,
  useUpdateWorkMutation,
} from '@/queries/workexperience';
import { useJobTitleQuery } from '@/queries/jobTitle';
import { WorkExperience } from '@/types/workexperience';
import SetCurUserProfileSignal from '../../../partials/SetCurUserProfileSignal';
import { useAuth } from '@/store/authSignal';
import FloatInput from '@/components/common/FloatInput';
import { JobTitleResponse } from '@/types/jobTitle';

const Page = () => {
  const { user } = useAuth();
  const { mutate, isPending } = useCreateWorkMutation();
  const { mutate: deleteWork } = useDeleteWorkMutation();
  const { mutate: updateWork } = useUpdateWorkMutation();
  const { data: jobTitlesResponse, isLoading: isLoadingJobs } =
    useJobTitleQuery();
  const { data: listWork, isLoading: isLoadingWork } = useGetWork();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<WorkExperience>({
    _id: '',
    jobTitleId: '',
    company: '',
    description: '',
    startDate: '',
    endDate: '',
  });

  const jobTitles = Array.isArray(jobTitlesResponse?.data?.data)
    ? jobTitlesResponse.data.data
    : [];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      _id: '',
      jobTitleId: '',
      company: '',
      description: '',
      startDate: '',
      endDate: '',
    });
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (isEditing && formData._id) {
      updateWork(formData, {
        onSuccess: () => {
          alert('Cập nhật thành công');
          resetForm();
        },
        onError: (error) => {
          console.error('Lỗi:', error);
          setErrorMessage('Lỗi khi cập nhật');
        },
      });
    } else {
      mutate(formData, {
        onSuccess: () => {
          alert('Thêm thành công');
          resetForm();
        },
        onError: (error) => {
          console.error('Lỗi:', error);
          setErrorMessage('Lỗi khi thêm');
        },
      });
    }
  };

  const handleEdit = (work: WorkExperience) => {
    setFormData(work);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (!id) {
      alert('Lỗi: ID không hợp lệ!');
      return;
    }

    if (confirm('Bạn có chắc chắn muốn xóa công việc này không?')) {
      deleteWork(id, {
        onSuccess: () => {
          alert(`Xóa thành công công việc có ID: ${id}`);
        },
        onError: (error) => {
          console.error('Lỗi:', error);
          alert(`Xóa thất bại! Công việc có ID: ${id} không tồn tại.`);
        },
      });
    }
  };

  return (
    <div>
      <SetCurUserProfileSignal user={user} />

      <form onSubmit={handleSubmit} className='flex flex-col gap-3 mt-4'>
        <label htmlFor='jobTitleId' className='text-sm font-medium'>
          Chọn Công Việc
        </label>
        <select
          name='jobTitleId'
          value={formData.jobTitleId}
          onChange={handleChange}
          required
          className='border p-2 rounded'
          disabled={isLoadingJobs}
        >
          <option value=''>Chọn công việc</option>
          {jobTitles.map((job: JobTitleResponse) => (
            <option key={job.id} value={job.id}>
              {job.title}
            </option>
          ))}
        </select>

        <FloatInput
          type='text'
          name='company'
          label='Công ty'
          value={formData.company}
          onChange={handleChange}
          required
          className='border p-2 rounded'
        />
        <textarea
          name='description'
          placeholder='Mô tả công việc'
          value={formData.description}
          onChange={handleChange}
          required
          className='block w-full appearance-none bg-card border-2 border-gray-300 px-3 py-2 rounded-md text-gray-900 focus:border-info-500 focus:outline-none focus:ring-1 focus:ring-info-500'
        />
        <FloatInput
          type='date'
          label=''
          value={formData.startDate}
          onChange={handleChange}
          required
          className='border p-2 rounded'
        />
        <FloatInput
          type='date'
          label=''
          value={formData.endDate}
          onChange={handleChange}
          className='border p-2 rounded'
        />
        <button
          type='submit'
          disabled={isPending}
          className='bg-primary-500 text-white py-2 rounded'
        >
          {isEditing ? 'Cập nhật' : 'Thêm kinh nghiệm'}
        </button>
        {errorMessage && <p className='text-red-500 mb-2'>{errorMessage}</p>}
      </form>

      <div>
        <h2 className='text-lg font-bold mt-4'>Kinh nghiệm làm việc</h2>

        {isLoadingWork ? (
          <p className='text-gray-500'>Đang tải dữ liệu...</p>
        ) : listWork && listWork.length > 0 ? (
          <ul className='mt-2'>
            {listWork.map((work: WorkExperience) => {
              const jobTitle =
                jobTitles.find((job) => job.id === work.jobTitleId)?.title ||
                'Không xác định';

              return (
                <li key={work._id} className='border p-3 rounded mt-2'>
                  <p>
                    <strong>Công việc:</strong> {jobTitle}
                  </p>
                  <p>
                    <strong>Công ty:</strong> {work.company}
                  </p>
                  <p>
                    <strong>Mô tả:</strong> {work.description}
                  </p>
                  <p>
                    <strong>Bắt đầu:</strong> {work.startDate}
                  </p>
                  <p>
                    <strong>Kết thúc:</strong>{' '}
                    {work.endDate ? work.endDate : 'Hiện tại'}
                  </p>
                  <button
                    onClick={() => handleEdit(work)}
                    className='bg-card text-neutral-900 px-3 py-1 rounded mt-2 mr-2'
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(work._id)}
                    className=' bg-card text-neutral-900 px-3 py-1 rounded mt-2'
                  >
                    Xóa
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className='text-gray-500'>Chưa có kinh nghiệm nào.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
