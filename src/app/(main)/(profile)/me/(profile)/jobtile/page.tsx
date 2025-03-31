'use client';

import FloatInput from '@/components/common/FloatInput';
import Tiptap from '@/components/common/TipTap';
import Pen from '@/components/icons/Pencil';
import PlusIcon from '@/components/icons/PlusIcon';
import User from '@/components/icons/User';
import { useJobTitleQuery } from '@/queries/jobTitle';
import {
  useCreateWorkMutation,
  useDeleteWorkMutation,
  useGetWork,
  useUpdateWorkMutation,
} from '@/queries/workexperience';
import { useAuth } from '@/store/authSignal';
import { WorkExperience } from '@/types/workexperience';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import SetCurUserProfileSignal from '../../../partials/SetCurUserProfileSignal';
import DOMPurify from 'dompurify';

const Page = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const { mutate, isPending } = useCreateWorkMutation();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { mutate: deleteWork } = useDeleteWorkMutation();
  const { mutate: updateWork } = useUpdateWorkMutation();
  const { data: jobTitlesResponse, isLoading: isLoadingJobs } =
    useJobTitleQuery();
  const { data: listWork, isLoading: isLoadingWork } = useGetWork(userId!);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<WorkExperience>({
    _id: '',
    jobTitleId: '',
    company: '',
    description: '',
    startDate: '',
    endDate: '',
    content: '',
  });

  const jobTitles = Array.isArray(jobTitlesResponse?.data?.data)
    ? jobTitlesResponse.data.data
    : [];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const currentDate = new Date().toISOString().split('T')[0];

    if (!formData.jobTitleId) {
      newErrors.jobTitleId = 'Vui lòng chọn vị trí công việc';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Vui lòng nhập tên công ty';
    } else if (formData.company.length > 100) {
      newErrors.company = 'Tên công ty không quá 100 ký tự';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Vui lòng nhập mô tả công việc';
    } else if (formData.description.length > 500) {
      newErrors.description = 'Mô tả không quá 500 ký tự';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Vui lòng nhập nội dung công việc';
    } else if (formData.content.length > 1000) {
      newErrors.content = 'Nội dung không quá 1000 ký tự';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Vui lòng chọn ngày bắt đầu';
    } else if (formData.startDate > currentDate) {
      newErrors.startDate = 'Ngày bắt đầu không thể trong tương lai';
    }

    if (formData.endDate) {
      if (formData.endDate < formData.startDate) {
        newErrors.endDate = 'Ngày kết thúc phải sau ngày bắt đầu';
      }
      if (formData.endDate > currentDate) {
        newErrors.endDate = 'Ngày kết thúc không thể trong tương lai';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      _id: '',
      jobTitleId: '',
      company: '',
      description: '',
      startDate: '',
      endDate: '',
      content: '',
    });
    setErrors({});
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validateForm()) return;

    const payload = {
      ...formData,
      endDate: formData.endDate || null,
    };

    if (isEditing && formData._id) {
      updateWork(payload, {
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
      mutate(payload, {
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
    setFormData({
      ...work,
      endDate: work.endDate || '',
    });
    setIsEditing(true);
    setIsFormVisible(true);
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

  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return 'Hiện tại';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null;

    return (
      <p className='text-red-500 text-sm mt-1 flex items-center gap-1'>
        <ExclamationCircleIcon className='w-4 h-4' />
        {message}
      </p>
    );
  };

  const handleContentChange = (value?: string) => {
    const cleanContent = DOMPurify.sanitize(value || '', {
      ALLOWED_TAGS: [], // Không cho phép bất kỳ thẻ HTML nào
      ALLOWED_ATTR: [], // Không cho phép thuộc tính như style, class, id, v.v.
    });

    setFormData((prev) => ({ ...prev, content: cleanContent }));
  };

  return (
    <>
      <div>
        <div className='h-fit md:w-[698px] mt-4 border border-b rounded-2xl bg-card p-4'>
          <div className='flex justify-between items-center mb-4'>
            <div className='flex items-center space-x-3'>
              <User className='text-primary-500' />
              <span className='font-bold text-neutral-950'>
                Kinh nghiệm làm việc:
              </span>
            </div>
            <button
              type='button'
              onClick={() => setIsFormVisible(!isFormVisible)}
              className='p-1 hover:bg-gray-100 rounded-full'
            >
              <Pen className='w-6 h-6' />
            </button>
          </div>

          {isFormVisible && (
            <form onSubmit={handleSubmit} className='mt-4'>
              {/* Job Title Selection */}
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Vị trí công việc *
                </label>
                <select
                  name='jobTitleId'
                  value={formData.jobTitleId}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md bg-card ${
                    errors.jobTitleId ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={isLoadingJobs}
                >
                  <option value='' className='bg-gray-200 text-gray-700'>
                    Chọn vị trí...
                  </option>
                  {jobTitles.map((job) => (
                    <option
                      key={job.id}
                      value={job.id}
                      className='bg-gray-100 text-gray-800'
                    >
                      {job.title}
                    </option>
                  ))}
                </select>
                <ErrorMessage message={errors.jobTitleId} />
              </div>

              {/* Company Input */}
              <div className='mb-4'>
                <FloatInput
                  type='text'
                  name='company'
                  label='Công ty *'
                  value={formData.company}
                  onChange={handleChange}
                  error={!!errors.company}
                />
                <ErrorMessage message={errors.company} />
              </div>

              {/* Description Input */}
              <div className='mb-4'>
                <FloatInput
                  type='text'
                  name='description'
                  label='Mô tả công việc *'
                  value={formData.description}
                  onChange={handleChange}
                  error={!!errors.description}
                />
                <ErrorMessage message={errors.description} />
              </div>

              {/* Content Textarea */}
              <div className='mt-4'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Nội dung công việc *
                </label>
                <Tiptap
                  value={formData.content}
                  onChange={handleContentChange}
                />
              </div>

              {/* Date Inputs */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                <div>
                  <FloatInput
                    type='date'
                    name='startDate'
                    label='Ngày bắt đầu *'
                    value={formData.startDate}
                    onChange={handleChange}
                    error={!!errors.startDate}
                  />
                  <ErrorMessage message={errors.startDate} />
                </div>
                <div>
                  <FloatInput
                    type='date'
                    name='endDate'
                    label='Ngày kết thúc'
                    value={formData.endDate}
                    onChange={handleChange}
                    error={!!errors.endDate}
                  />
                  <ErrorMessage message={errors.endDate} />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                disabled={isPending}
                className={`w-full py-2 rounded-md font-semibold transition-colors ${
                  isPending
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary-500 hover:bg-primary-600 text-white'
                }`}
              >
                {isPending
                  ? 'Đang xử lý...'
                  : isEditing
                  ? 'Cập nhật kinh nghiệm'
                  : 'Thêm kinh nghiệm'}
              </button>

              {errorMessage && (
                <div className='mt-3 p-2 bg-red-100 text-red-700 rounded-md flex items-center gap-2'>
                  <ExclamationCircleIcon className='w-5 h-5' />
                  {errorMessage}
                </div>
              )}
            </form>
          )}

          <div>
            {isLoadingWork ? (
              <p className='text-gray-500'>Đang tải dữ liệu...</p>
            ) : listWork && listWork.length > 0 ? (
              <ul className='mt-2 space-y-4'>
                {listWork.map((work) => {
                  const jobTitle =
                    jobTitles.find((job) => job.id === work.jobTitleId)
                      ?.title || 'Không xác định';
                  return (
                    <li
                      key={work._id}
                      className='border p-4 rounded-lg bg-card shadow-sm'
                    >
                      <div className='flex justify-between items-start'>
                        <div>
                          <h3 className='text-lg font-semibold'>{jobTitle}</h3>
                          <p className='text-gray-600'>{work.company}</p>
                          <div className='mt-2 text-sm text-gray-500'>
                            <p>
                              {work.startDate} - {work.endDate}
                            </p>
                          </div>
                        </div>
                        <div className='flex gap-2'>
                          <button
                            onClick={() => handleEdit(work)}
                            className='text-primary-600 hover:text-primary-700'
                            title='Chỉnh sửa'
                          >
                            <Pen className='w-5 h-5' />
                          </button>
                          <button
                            onClick={() => handleDelete(work._id)}
                            className='text-error-900 hover:text-error-950'
                            title='Xóa'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-5 w-5'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path
                                fillRule='evenodd'
                                d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              !isFormVisible && (
                <div
                  className='flex items-center gap-2 cursor-pointer group'
                  onClick={() => setIsFormVisible(true)}
                >
                  <PlusIcon className='text-neutral-800 group-hover:text-neutral-600 transition-colors duration-300' />
                  <p className='text-neutral-500 group-hover:underline'>
                    Thêm công việc
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
