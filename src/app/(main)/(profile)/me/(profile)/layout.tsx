"use client";

import Academic from "@/components/icons/Academic";
import Document from "@/components/icons/Document";
import IdentifyIcon from "@/components/icons/IdentifyIcon";
import Maill from "@/components/icons/Maill";
import UserCircle from "@/components/icons/User-circle";
import Link from "next/link";
import { PropsWithChildren } from "react";
import SetCurUserProfileSignal from "../../partials/SetCurUserProfileSignal";
import { sCurUserProfileSignal } from "../../signal/curUserProfileSignal";

const layout = ({ children }: PropsWithChildren) => {
  const { user } = sCurUserProfileSignal.use(); // Lấy dữ liệu user
  const profile = `/me/profile`; // Đường dẫn đến trang profile
  const personal = `/me/personal`; // Đường dẫn đến trang personal

  return (
    <div className="flex justify-between gap-4">
      {/* About - Phần chứa các liên kết điều hướng */}
      <div className="w-80 flex-col">
        <SetCurUserProfileSignal user={user} /> {/* Cập nhật thông tin user */}
        <div className="rounded-[16px] overflow-hidden relative border-b border mt-4 bg-card">
          <div className="pl-4 mt-6 block ">
            <span className="text-xl text-neutral-900 font-semibold">
              Hồ sơ
            </span>
          </div>
          <div className="mt-4 mb-4 ">
            {/* Các liên kết điều hướng */}
            <Link href={profile} className="block">
              <div className="h-10 w-72 flex items-center mt-2 pl-2 space-x-2.5 mx-auto my-auto rounded-md text-neutral-800 hover:bg-primary-100/50 hover:text-primary-500 active:bg-primary-200 active:text-primary-700 focus:outline-none">
                <IdentifyIcon />
                <span className="hidden lg:block font-semibold text-sm ">
                  Tổng quan
                </span>
              </div>
            </Link>

            <Link href={personal} className="block">
              <div className="h-10 w-72 flex items-center mt-2 pl-2 space-x-2.5 mx-auto my-auto hover:bg-primary-100/50 hover:text-primary-500 rounded-md text-neutral-800 ">
                <UserCircle />
                <span className="hidden lg:block font-semibold text-sm ">
                  Thông tin cá nhân
                </span>
              </div>
            </Link>

            {/* Các mục khác */}
            <div className="h-10 w-72 flex items-center mt-2 pl-2 space-x-2.5 mx-auto my-auto hover:bg-primary-100/50 hover:text-primary-500 rounded-md text-neutral-800 ">
              <Academic />
              <span className="hidden lg:block font-semibold text-sm ">
                Công việc học vấn
              </span>
            </div>
            <div className="h-10 w-72 flex items-center mt-2 pl-2 space-x-2.5 mx-auto my-auto hover:bg-primary-100/50 hover:text-primary-500 rounded-md text-sm text-neutral-800">
              <Maill />
              <span className="hidden lg:block font-semibold ">
                Thông tin liên hệ
              </span>
            </div>
            <div className="h-10 w-72 flex items-center mt-2 pl-2 space-x-2.5 mx-auto my-auto hover:bg-primary-100/50 hover:text-primary-500 rounded-md text-neutral-800">
              <Document />
              <span className="hidden lg:block font-semibold text-sm ">
                Chi tiết về bạn
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Content - Phần giao diện con được render tại đây */}
      {children}
    </div>
  );
};
export default layout;
