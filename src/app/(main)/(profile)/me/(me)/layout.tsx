"use client";
import GlobeAlt from "@/components/icons/Globe-alt";
import Inbox from "@/components/icons/Inbox";
import MapPin from "@/components/icons/Map-pin";
import Phone from "@/components/icons/Phone";
import { PropsWithChildren } from "react";
import { useAuth } from "@/store/authSignal";
import SetCurUserProfileSignal from "../../partials/SetCurUserProfileSignal";

const layout = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();
  return (
    <div className="block md:flex md:justify-between md:gap-4">
      {/* About */}
      <div className="flex-col md:w-[440] space-y-4 ">
        <SetCurUserProfileSignal user={user} />

        {/* FollowFollow */}
        <div className=" h-24 rounded-2xl overflow-hidden relative border-b border flex justify-around items-center p-4 bg-card gap-2">
          <div className="text-center">
            <span className="block text-3xl font-bold text-neutral-900 justify-center">
              {user?.followerCount}
            </span>
            <span className="text-sm text-neutral-900">Người theo dõi</span>
          </div>
          <div className="border-l border-gray-500 h-16"></div>
          {/* Đường kẻ phân cách */}
          <div className="text-center">
            <span className="block text-3xl font-bold text-neutral-900">
              {user?.followingCount}
            </span>
            <span className="text-sm text-neutral-900">Đang theo dõi</span>
          </div>
        </div>
        {/* Follow */}

        {/**/}
        <div className="rounded-2xl overflow-hidden relative border-b border p-4 pt-4 h-auto bg-card ">
          <div className="px-4 block ">
            <span className="text-xl text-neutral-900 font-semibold">
              Giới thiệu
            </span>
          </div>
          <div className="px-4 block mt-2">
            <span className="text-sm text-neutral-900 ">
              Tôi là một lập trình viên front-end tại FPT Software, tôi có 3 năm
              kinh nghiệm trong việc phát triển ứng dụng.
            </span>
          </div>
          <div className="flex items-center mt-4 px-4 space-x-3 group relative">
            <MapPin />
            <span className="text-sm text-neutral-800 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-neutral-500 after:transition-all after:duration-300 group-hover:after:w-full">
              Binh Tan, Ho Chi Minh City
            </span>
          </div>

          <div className="flex items-center mt-4 px-4 space-x-3 group relative">
            <Inbox />
            <span className="text-sm text-neutral-800 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-neutral-500 after:transition-all after:duration-300 group-hover:after:w-full">
              jaydondev@gmail.com
            </span>
          </div>
          <div className="flex items-center mt-4 px-4 space-x-3 group relative">
            <Phone />
            <span className="text-sm text-neutral-800 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-neutral-500 after:transition-all after:duration-300 group-hover:after:w-full">
              0919 616 224
            </span>
          </div>
          <div className="flex items-center mt-4 px-4 space-x-3 group relative">
            <GlobeAlt />
            <span className="text-sm text-neutral-800 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-neutral-500 after:transition-all after:duration-300 group-hover:after:w-full">
              jaydon.dev
            </span>
          </div>
        </div>
        {/**/}
      </div>
      {/* About */}

      {children}
    </div>
  );
};

export default layout;
