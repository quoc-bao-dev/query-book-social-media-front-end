import Academic from '@/components/icons/Academic';
import Document from '@/components/icons/Document';
import UserCircle from '@/components/icons/User-circle';
import { config } from '@/config';
import httpClient from '@/httpClient/httpClient';
import { HttpResponse } from '@/types/common';
import { UserProfileResponse } from '@/types/user';

import Link from 'next/link';
import SetCurUserProfileSignal from '../../partials/SetCurUserProfileSignal';

type PageProps = {
  params: { userId: string };
  children: React.ReactNode; // Thêm children để nhận các component con
};

const Layout = async ({ params, children }: PageProps) => {
  const { userId } = await params;

  const user = (
    await httpClient.get<HttpResponse<UserProfileResponse>>(
      `${config.BASE_URL}/users/profile/${userId}`,
    )
  ).data;

  const job = `/${user?.id || ''}/jobtitle`;
  const profile = `/${user?.id || ''}/profile`;

  return (
    <div className='block md:flex md:justify-between md:gap-4 px-4 md:px-0'>
      {/* About */}
      <div className='w-full space-y-4 md:w-[310px] md:flex-col'>
        <SetCurUserProfileSignal user={user} /> {/* Cập nhật thông tin user */}
        <div className='rounded-2xl overflow-relative border-b border p-4 pt-4 h-auto bg-card '>
          <div className='px-2 block '>
            <span className='text-xl text-neutral-900 font-semibold'>
              Hồ sơ
            </span>
          </div>
          <div className='mt-4 mb-4 '>
            <Link href={profile} className='block'>
              <div className='h-10 md:w-72 flex items-center mt-2 pl-2 space-x-2.5 mx-auto my-auto hover:bg-primary-100/50 hover:text-primary-500 rounded-md text-neutral-800 '>
                <UserCircle />
                <span className='lg:block font-semibold text-sm '>
                  Thông tin cá nhâns
                </span>
              </div>
            </Link>

            {/* Các mục khác */}
            <Link href={job} className='block'>
              <div className='h-10 md:w-72 flex items-center mt-2 pl-2 space-x-2.5 mx-auto my-auto hover:bg-primary-100/50 hover:text-primary-500 rounded-md text-neutral-800 '>
                <Academic />
                <span className='lg:block font-semibold text-sm '>
                  Công việc
                </span>
              </div>
            </Link>

            <div className='h-10 md:w-72 flex items-center mt-2 pl-2 space-x-2.5 mx-auto my-auto hover:bg-primary-100/50 hover:text-primary-500 rounded-md text-neutral-800'>
              <Document />
              <span className='lg:block font-semibold text-sm '>
                Các link liên kết và mạng xã hội
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Content - Phần giao diện con được render tại đây */}
      <div className='w-full'>{children}</div>
    </div>
  );
};

export default Layout;
