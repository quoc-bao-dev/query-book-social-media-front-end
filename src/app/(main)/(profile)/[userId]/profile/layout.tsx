import FloatInput from "@/components/common/FloatInput";
import Academic from "@/components/icons/Academic";
import Briefcase from "@/components/icons/Briefcase";
import Building from "@/components/icons/Building-office";
import Check from "@/components/icons/Check";
import Document from "@/components/icons/Document";
import Fire from "@/components/icons/Fire";
import Home from "@/components/icons/Home";
import IdentifyIcon from "@/components/icons/IdentifyIcon";
import Link from "@/components/icons/Link";
import Maill from "@/components/icons/Maill";
import MapPin from "@/components/icons/Map-pin";
import Phone from "@/components/icons/Phone";
import UserCircle from "@/components/icons/User-circle";
import Xmark from "@/components/icons/X-mark";
import { config } from "@/config";
import httpClient from "@/httpClient/httpClient";
import { HttpResponse } from "@/types/common";
import { UserProfileResponse } from "@/types/user";
import SetCurUserProfileSignal from "../../partials/SetCurUserProfileSignal";
import Pen from "@/components/icons/Pencil";

type PageProps = {
  params: { userId: string };
};

const Layout = async ({ params }: PageProps) => {
  const { userId } = await params;

  console.log(userId);

  const user = (
    await httpClient.get<HttpResponse<UserProfileResponse>>(
      `${config.BASE_URL}/users/profile/${userId}`
    )
  ).data;

  return (
    <div className="flex justify-between gap-4">
      {/* About */}
      <div className="w-80 flex-col">
        <SetCurUserProfileSignal user={user} />
        <div className="rounded-[16px] overflow-hidden relative border-b border mt-4 bg-card">
          <div className="pl-4 mt-6 block ">
            <span className="text-xl text-neutral-900 font-semibold">
              Hồ sơ
            </span>
          </div>
          <div className="mt-4 mb-4 ">
            <div className="h-10 w-72 flex items-center  pl-2 space-x-2.5 mx-auto my-auto hover:bg-primary-100/50 rounded-md text-primary-500 bg-primary-100/50">
              <IdentifyIcon />
              <span className="hidden lg:block font-semibold text-sm ">
                Tổng quan
              </span>
            </div>
            <div className="h-10 w-72 flex items-center mt-2 pl-2 space-x-2.5 mx-auto my-auto hover:bg-primary-100/50 hover:text-primary-500 rounded-md text-neutral-800 ">
              <UserCircle />
              <span className="hidden lg:block font-semibold text-sm ">
                Thông tin cá nhân
              </span>
            </div>
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
      {/* About */}
      <div className="h-auto w-[680px] mt-4 border border-b rounded-2xl bg-card">
        <div className="pt-2 pl-4 pr-4 pb-4 space-y-5">
          <div className="flex flex-col w-full">
            {/* Header */}
            <div className="flex items-center justify-between w-full">
              {/* Thông tin công ty */}
              <div className="flex items-center space-x-3">
                <Briefcase className="fill-primary-500" />
                <span className="text-base font-semibold text-neutral-800">
                  Vị trí công việc{" "}
                  <span className="font-bold text-neutral-950">
                    {user.jobTitle.title}
                  </span>{" "}
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
            {/* Header */}
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
            {/* Form chỉnh sửa */}
          </div>

          <div className="flex flex-col w-full">
            {/* Header */}
            <div className="flex items-center justify-between w-full">
              {/* Thông tin công ty */}
              <div className="flex items-center space-x-3">
                <Home className="fill-primary-500" />
                <span className="text-base font-semibold text-neutral-800">
                  Sống tại{" "}
                  <span className="font-bold text-neutral-950">
                    {user.jobTitle.title}
                  </span>{" "}
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
            {/* Header */}
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
            {/* Form chỉnh sửa */}
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
    </div>
  );
};

export default Layout;
