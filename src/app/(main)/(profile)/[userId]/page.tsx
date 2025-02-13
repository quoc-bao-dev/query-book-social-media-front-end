import GlobeAlt from "@/components/icons/Globe-alt";
import Inbox from "@/components/icons/Inbox";
import Phone from "@/components/icons/Phone";
import { config } from "@/config";
import httpClient from "@/httpClient/httpClient";
import { HttpResponse } from "@/types/common";
import { UserProfileResponse } from "@/types/user";
import SetCurUserProfileSignal from "../partials/SetCurUserProfileSignal";
import MapPin from "@/components/icons/Map-pin";

type PageProps = {
  params: { userId: string };
};

const Page = async ({ params }: PageProps) => {
  const { userId } = await params;

  const user = (
    await httpClient.get<HttpResponse<UserProfileResponse>>(
      `${config.BASE_URL}/users/profile/${userId}`
    )
  ).data;

  return (
    <div className="">
      {/* main contain */}
      <SetCurUserProfileSignal user={user} />
      <div className="flex justify-center">
        <div className="w-[1028px]">
          <div className="flex justify-between">
            {/* About */}
            <div className="w-80 flex-col">
              {/* FollowFollow */}
              <div className="mt-4 h-24 rounded-[16px] overflow-hidden relative border-b border flex justify-around items-center px-6 bg-card">
                <div className="text-center">
                  <span className="block text-3xl font-bold text-neutral-900">
                    {user?.followerCount}
                  </span>
                  <span className="text-sm text-neutral-900">
                    Người theo dõi
                  </span>
                </div>
                <div className="border-l border-gray-500 h-16"></div>
                {/* Đường kẻ phân cách */}
                <div className="text-center">
                  <span className="block text-3xl font-bold text-neutral-900">
                    {user?.followingCount}
                  </span>
                  <span className="text-sm text-neutral-900">
                    Đang theo dõi
                  </span>
                </div>
              </div>
              {/* Follow */}

              {/**/}
              <div className="rounded-[16px] overflow-hidden relative border-b border mt-4 h-80 bg-card ">
                <div className="pl-4 mt-6 block ">
                  <span className="text-xl text-neutral-900 font-semibold">
                    Giới thiệu
                  </span>
                </div>
                <span className="text-sm text-neutral-800 pl-4 block mt-4">
                  Tôi là một lập trình viên front-end tại FPT Software, tôi có 3
                  năm kinh nghiệm trong việc phát triển ứng dụng.
                </span>
                <div className="flex items-center mt-4 pl-4 space-x-3 group relative">
                  <MapPin />
                  <span className="text-sm text-neutral-800 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-neutral-500 after:transition-all after:duration-300 group-hover:after:w-full">
                    Binh Tan, Ho Chi Minh City
                  </span>
                </div>

                <div className="flex items-center mt-4 pl-4 space-x-3 group relative">
                  <Inbox />
                  <span className="text-sm text-neutral-800 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-neutral-500 after:transition-all after:duration-300 group-hover:after:w-full">
                    jaydondev@gmail.com
                  </span>
                </div>
                <div className="flex items-center mt-4 pl-4 space-x-3 group relative">
                  <Phone />
                  <span className="text-sm text-neutral-800 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-neutral-500 after:transition-all after:duration-300 group-hover:after:w-full">
                    0919 616 224
                  </span>
                </div>
                <div className="flex items-center mt-4 pl-4 space-x-3 group relative">
                  <GlobeAlt />
                  <span className="text-sm text-neutral-800 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-neutral-500 after:transition-all after:duration-300 group-hover:after:w-full">
                    jaydon.dev
                  </span>
                </div>
              </div>
              {/**/}
            </div>
            {/* About */}

            {/* posts */}
            <div className="mt-4 w-[680px] h-32 flex flex-col border border-b rounded-2xl p-4 bg-card"></div>
            {/* posts */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
