"use client";

import Camera from "@/components/icons/Camera";
import CreditCard from "@/components/icons/CreditCard";
import DocumentText from "@/components/icons/Document-text";
import Rss from "@/components/icons/Rss";
import UserPlus from "@/components/icons/User-plus";
import { useAuth } from "@/store/authSignal";
import Link from "next/link";
import { sCurUserProfileSignal } from "../signal/curUserProfileSignal";

const CoverPage = () => {
  const { user: userMe } = useAuth();
  const { user } = sCurUserProfileSignal.use();
  const targetLink = user?.id === userMe?.id ? "/me" : `/me/${user?.id}`;

  return (
    <div className="relative rounded-b-2xl overflow-hidden">
      <div className="bg-[url('/images/bia2.jpg')] object-cover bg-center h-[250px] relative bg-gray-500">
        <div className="absolute bottom-0 pl-[calc(16px+180px)] w-[calc(100%-16px+180px)]">
          <div className="pl-3 py-4">
            <h1 className="text-4xl font-semibold text-white ">
              {user?.fullName}
            </h1>
            <h3 className="text-gray-500">{user?.jobTitle?.title}</h3>
            <p className="font-semibold text-base text-neutral-900"></p>
            <div className="flex gap-1 mt-2 ">
              <div className="size-8 rounded-full bg-gray-500">
                <img
                  src="/images/kaka.png"
                  alt="Friend 1"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="size-8 rounded-full bg-gray-500">
                <img
                  src="/images/ronaldo.png"
                  alt="Friend 1"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="size-8 rounded-full bg-gray-500">
                <img
                  src="/images/that.png"
                  alt="Friend 1"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4">
        <div className="relative">
          {/* Avatar */}
          <div className="absolute translate-y-[-80%] size-[170px] rounded-full bg-slate-400 overflow-hidden">
            <img
              src={"/images/avt.jpg"}
              alt="Avatar"
              className="w-full h-full object-cover rounded-full shadow-lg"
            />
            {user?.id === userMe?.id ? (
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 h-1/5 rounded-b-full cursor-pointer">
                <Camera className="w-6 h-6 text-white mb-1" />
              </div>
            ) : (
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 h-1/5 rounded-b-full cursor-pointer">
                <span className="text-white text-xs">Xem ảnh</span>{" "}
                {/* Hoặc cái gì đó khác */}
              </div>
            )}
          </div>
          {/* Avatar */}
        </div>
      </div>

      <div className="bg-card  flex justify-end items-center ">
        <div className="flex justify-center space-x-2 relative">
          <Link href="/me/profile" className="block">
            <div className="relative flex flex-col items-center py-3 px-3 group cursor-pointer">
              <div className="flex items-center space-x-2">
                <CreditCard className="fill-primary-500" />
                <span className="text-base font-bold text-neutral-800 ">
                  Hồ sơ
                </span>
              </div>
              {/* Thêm border-bottom khi hover mà không thay đổi kích thước */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-x-100 rounded-md"></div>
            </div>
          </Link>

          <Link href={targetLink} className="block">
            <div className="relative flex flex-col items-center py-3 px-3 group cursor-pointer">
              <div className="flex items-center space-x-2">
                <DocumentText className="fill-primary-500" />
                <span className="text-base font-bold text-neutral-800">
                  Bài viết
                </span>
              </div>
              {/* Thêm border-bottom khi hover mà không thay đổi kích thước */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-x-100 rounded-md"></div>
            </div>
          </Link>

          {user?.id != userMe?.id && (
            <div className="relative flex flex-col items-center cursor-pointer py-3 px-3">
              <div className="flex items-center space-x-2">
                <UserPlus className="fill-primary-500" />
                <span className="text-base font-bold text-neutral-800">
                  Thêm bạn bè
                </span>
              </div>
            </div>
          )}

          <div className="relative flex flex-col items-center py-3 px-3 group cursor-pointer">
            <div className="flex items-center space-x-2">
              <Rss className="fill-primary-500" />
              <span className="text-base font-bold text-neutral-800">
                Theo dõi
              </span>
            </div>
            {/* Thêm border-bottom khi hover mà không thay đổi kích thước */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-x-100 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverPage;
