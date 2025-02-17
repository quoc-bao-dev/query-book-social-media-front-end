"use client"; // Đặt dòng này ở đầu file

import Building from "@/components/icons/Building-office";
import Fire from "@/components/icons/Fire";
import Home from "@/components/icons/Home";
import Link from "@/components/icons/Link";
import MapPin from "@/components/icons/Map-pin";
import Pen from "@/components/icons/Pencil";
import Phone from "@/components/icons/Phone";
import User from "@/components/icons/User";
import { useAuth } from "@/store/authSignal";
import { useState } from "react";
import SetCurUserProfileSignal from "../../../partials/SetCurUserProfileSignal";
import At from "@/components/icons/At-symbol";
import FloatInput from "@/components/common/FloatInput";
import Check from "@/components/icons/Check";
import Xmark from "@/components/icons/X-mark";
import Briefcase from "@/components/icons/Briefcase";

const page = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa của từng form

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="">
      <SetCurUserProfileSignal user={user} />
      <div className="h-auto w-[680px] mt-4 border border-b rounded-2xl bg-card">
        <div className="pt-4 pl-4 pb-4 space-y-5">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <User className="fill-primary-500" />
              <span className="text-base font-semibold text-neutral-800">
                Họ tên{" "}
                <span className="font-bold text-neutral-950">
                  {" "}
                  {user?.fullName}
                </span>
              </span>
            </div>
            <div className="flex items-center space-x-3 mr-4">
              <div className="w-9 h-9 bg-gray-200 flex items-center justify-center rounded-full">
                <Pen className="text-neutral-800" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            {/* Thông tin liên hệ */}
            <div className="flex items-center space-x-3">
              <Home className="fill-primary-500" />
              <span className="text-base font-bold text-neutral-800">
                Thông tin liên hệ{" "}
                <span className="font-bold text-neutral-950">
                  {user?.email}
                </span>
              </span>
            </div>

            {/* Nút chỉnh sửa */}
            <div className="flex items-center space-x-3 mr-4">
              <div className="w-9 h-9 bg-gray-200 flex items-center justify-center rounded-full cursor-pointer">
                <Pen className="text-neutral-800" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            {/* Thông tin liên hệ */}
            <div className="flex items-center space-x-3">
              <At className="fill-primary-500" />
              <span className="text-base font-bold text-neutral-800">
                Tên người dùng{" "}
                <span className="font-bold text-neutral-950">
                  {user?.handle}
                </span>{" "}
              </span>
            </div>

            {/* Nút chỉnh sửa */}
            <div className="flex items-center space-x-3 mr-4">
              <div className="w-9 h-9 bg-gray-200 flex items-center justify-center rounded-full cursor-pointer">
                <Pen className="text-neutral-800" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
