import GlobeAlt from '@/components/icons/Globe-alt';
import UserCircle from '@/components/icons/User-circle';
import { config } from '@/config';
import httpClient from '@/httpClient/httpClient';
import { HttpResponse } from '@/types/common';
import { UserProfileResponse } from '@/types/user';
import Link from 'next/link';
import SetCurUserProfileSignal from '../../partials/SetCurUserProfileSignal';

type PageProps = {
  params: { userId: string };
  children: React.ReactNode;
};

const Layout = async ({ params, children }: PageProps) => {
  const { userId } = params;
  const response = await httpClient.get<HttpResponse<UserProfileResponse>>(
    `${config.BASE_URL}/users/profile/${userId}`,
  );
  const user = response.data;

  const friended = `/${user?.id || ''}/friended`;
  const followers = `/${user?.id || ''}/followers`;
  const followings = `/${user?.id || ''}/followings`;

  return (
    <div className='block md:flex md:justify-between md:gap-4 px-4 md:px-0'>
      <div className='w-full space-y-4 md:w-[1024px] md:flex-col'>
        <SetCurUserProfileSignal user={user} />
        <div className='rounded-2xl overflow-relative border-b border p-4 pt-4 h-auto bg-card '>
          <span className='text-xl text-neutral-900 font-semibold'>Bạn bè</span>
          <div className='mt-4 mb-4 flex flex-row space-x-4'>
            <Link href={friended} className='block'>
              <div className='h-10 md:w-48 flex items-center mt-2 pl-2 space-x-2.5 rounded-md hover:bg-primary-100/50 hover:text-primary-500'>
                <UserCircle />
                <span className='lg:block font-semibold text-sm'>
                  Tất cả bạn bè
                </span>
              </div>
            </Link>
            <Link href={followers} className='block'>
              <div className='h-10 md:w-48 flex items-center mt-2 pl-2 space-x-2.5 rounded-md hover:bg-primary-100/50 hover:text-primary-500'>
                <GlobeAlt />
                <span className='lg:block font-semibold text-sm'>
                  Người theo dõi
                </span>
              </div>
            </Link>
            <Link href={followings} className='block'>
              <div className='h-10 md:w-48 flex items-center mt-2 pl-2 space-x-2.5 rounded-md hover:bg-primary-100/50 hover:text-primary-500'>
                <GlobeAlt />
                <span className='lg:block font-semibold text-sm'>
                  Đang theo dõi
                </span>
              </div>
            </Link>
          </div>
          <div className='border-t border-gray-500'></div>
          <div className='w-full pt-4 flex'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
