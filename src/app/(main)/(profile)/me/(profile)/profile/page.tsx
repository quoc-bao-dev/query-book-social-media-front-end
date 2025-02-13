import FloatInput from "@/components/common/FloatInput";
import Briefcase from "@/components/icons/Briefcase";
import Building from "@/components/icons/Building-office";
import Check from "@/components/icons/Check";
import Fire from "@/components/icons/Fire";
import Home from "@/components/icons/Home";
import Link from "@/components/icons/Link";
import MapPin from "@/components/icons/Map-pin";
import Pen from "@/components/icons/Pencil";
import Phone from "@/components/icons/Phone";
import Xmark from "@/components/icons/X-mark";
import React from "react";

const page = () => {
  return (
    <div className="">
      <div className="h-auto w-[680px] mt-4 border border-b rounded-2xl bg-card">
        <div className="pt-2 pl-4 pr-4 pb-4 space-y-5">
          <div className="flex flex-col w-full">
            {/* Header */}
            <div className="flex items-center justify-between w-full">
              {/* Thông tin công ty */}
              <div className="flex items-center space-x-3">
                <Briefcase className="fill-primary-500" />
                <span className="text-base font-semibold text-neutral-800">
                  Làm việc tại{" "}
                  <span className="font-bold text-neutral-950">FPT</span>
                </span>
              </div>

              {/* Nút chỉnh sửa */}
              <button
                className="w-9 h-9 bg-gray-200 flex items-center justify-center rounded-full hover:bg-gray-300 transition cursor-pointer"
                aria-label="Chỉnh sửa"
              >
                <Pen className="text-neutral-800" />
              </button>
            </div>

            {/* Form chỉnh sửa */}
            <div className="my-3">
              <div className="relative">
                <FloatInput label="Công ty" />
              </div>

              {/* Nút xác nhận và hủy */}
              <div className="mt-3 flex justify-end space-x-2">
                <button
                  className="w-7 h-7 bg-gray-200 flex items-center justify-center rounded-full hover:bg-gray-300 transition cursor-pointer"
                  aria-label="Hủy"
                >
                  <Xmark className="text-red-500" />
                </button>
                <button
                  className="w-7 h-7 bg-gray-200 flex items-center justify-center rounded-full hover:bg-gray-300 transition cursor-pointer"
                  aria-label="Xác nhận"
                >
                  <Check className="text-primary-500" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <Home className="fill-primary-500" />
              <span className="text-base font-bold text-neutral-800">
                Sống tại{" "}
                <span className="font-bold text-neutral-950">
                  Thành phố Hồ Chí Minh
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
            <div className="flex items-center space-x-3">
              <MapPin className="fill-primary-500" />
              <span className="text-base font-bold text-neutral-800">
                Đến từ{" "}
                <span className="font-bold text-neutral-950">Bình Thuận</span>
              </span>
            </div>
            <div className="flex items-center space-x-3 mr-4">
              <div className="w-9 h-9 bg-gray-200 flex items-center justify-center rounded-full">
                <Pen className="text-neutral-800" />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Building className="fill-primary-500" />
            <span className="text-base font-bold text-neutral-800">
              Từng học{" "}
              <span className="font-bold text-neutral-950">
                Trường THPT Lương Thế Vinh
              </span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="fill-primary-500" />
            <span className="text-base font-bold text-neutral-800">
              Số điện thoại{" "}
              <span className="font-bold text-neutral-950">0949021232</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Fire className="fill-primary-500" />
            <span className="text-base font-bold text-neutral-800">
              Bắt đầu công việc mới tại{" "}
              <span className="font-bold text-neutral-950">FPT</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Link className="fill-primary-500" />
            <span className="text-base font-bold text-neutral-800">
              <span className="font-bold text-neutral-950">jaydon.dev</span>
            </span>
          </div>
        </div>
      </div>
      <div className="h-auto w-[680px] mt-4 border border-b rounded-2xl bg-card">
        <div className="pt-4 pl-4 pb-4 space-y-5">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <Briefcase className="fill-primary-500" />
              <span className="text-base font-semibold text-neutral-800">
                Làm việc tại{" "}
                <span className="font-bold text-neutral-950">FPT</span>
              </span>
            </div>
            <div className="flex items-center space-x-3 mr-4">
              <div className="w-9 h-9 bg-gray-200 flex items-center justify-center rounded-full">
                <Pen className="text-neutral-800" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <Home className="fill-primary-500" />
              <span className="text-base font-bold text-neutral-800">
                Sống tại{" "}
                <span className="font-bold text-neutral-950">
                  Thành phố Hồ Chí Minh
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
            <div className="flex items-center space-x-3">
              <MapPin className="fill-primary-500" />
              <span className="text-base font-bold text-neutral-800">
                Đến từ{" "}
                <span className="font-bold text-neutral-950">Bình Thuận</span>
              </span>
            </div>
            <div className="flex items-center space-x-3 mr-4">
              <div className="w-9 h-9 bg-gray-200 flex items-center justify-center rounded-full">
                <Pen className="text-neutral-800" />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Building className="fill-primary-500" />
            <span className="text-base font-bold text-neutral-800">
              Từng học{" "}
              <span className="font-bold text-neutral-950">
                Trường THPT Lương Thế Vinh
              </span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="fill-primary-500" />
            <span className="text-base font-bold text-neutral-800">
              Số điện thoại{" "}
              <span className="font-bold text-neutral-950">0949021232</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Fire className="fill-primary-500" />
            <span className="text-base font-bold text-neutral-800">
              Bắt đầu công việc mới tại{" "}
              <span className="font-bold text-neutral-950">FPT</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Link className="fill-primary-500" />
            <span className="text-base font-bold text-neutral-800">
              <span className="font-bold text-neutral-950">jaydon.dev</span>
            </span>
          </div>
        </div>
      </div>
      {/* posts */}
    </div>
  );
};

export default page;
