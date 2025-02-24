"use client";

import FloatInput from "@/components/common/FloatInput";
import At from "@/components/icons/At-symbol";
import Check from "@/components/icons/Check";
import Home from "@/components/icons/Home";
import Pen from "@/components/icons/Pencil";
import User from "@/components/icons/User";
import Xmark from "@/components/icons/X-mark";
import { useAuth } from "@/store/authSignal";
import { useState } from "react";
import SetCurUserProfileSignal from "../../../partials/SetCurUserProfileSignal";
import { useUpdateUserProfileMutation } from "@/queries/user";

const Page = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const { mutateAsync, isError } = useUpdateUserProfileMutation();

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    // Reset giá trị khi hủy chỉnh sửa
    if (!isEditing) {
      setFirstName(user?.firstName || "");
      setLastName(user?.lastName || "");
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        firstName,
        lastName,
      };

      await mutateAsync(payload);
      setIsEditing(false); // Tắt chế độ chỉnh sửa sau khi lưu thành công
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="">
      <SetCurUserProfileSignal user={user} />
      <div className="h-auto w-[680px] mt-4 border border-b rounded-2xl bg-card">
        <div className="pt-4 px-4 pb-4 space-y-5">
          {/* Thông tin người dùng */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <User className="fill-primary-500" />
              <span className="text-base font-semibold text-neutral-800">
                Họ tên:{" "}
                <span className="font-bold text-neutral-950">
                  {user?.fullName}
                </span>
              </span>
            </div>

            {/* Nút chỉnh sửa */}
            <button
              onClick={toggleEditing}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            >
              <Pen className="text-neutral-800" />
            </button>
          </div>
          <div className="flex">
            {/* Form chỉnh sửa */}
            {isEditing && (
              <div className="w-full flex space-x-4">
                {/* Trường Họ */}
                <div className="w-1/2">
                  <div className="relative">
                    <FloatInput
                      label="Họ"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Trường Tên */}
                <div className="w-1/2">
                  <div className="relative">
                    <FloatInput
                      label="Tên"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Nút xác nhận và hủy */}
                <div className="mt-2 flex justify-end space-x-2">
                  <button
                    className="w-7 h-7 bg-gray-200 flex items-center justify-center rounded-full hover:bg-gray-300 transition cursor-pointer"
                    aria-label="Hủy"
                    onClick={toggleEditing}
                  >
                    <Xmark className="text-red-500" />
                  </button>
                  <button
                    className="w-7 h-7 bg-gray-200 flex items-center justify-center rounded-full hover:bg-gray-300 transition cursor-pointer"
                    aria-label="Xác nhận"
                    onClick={handleSave}
                  >
                    <Check className="text-primary-500" />
                  </button>
                </div>
              </div>
            )}
          </div>
          {isError && (
            <div className="text-red-500">
              Có lỗi xảy ra khi cập nhật thông tin.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
