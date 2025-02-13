"use client";

import { useState } from "react";
import CreditCard from "@/components/icons/CreditCard";
import Rss from "@/components/icons/Rss";
import Camera from "@/components/icons/Camera";
import UserPlus from "@/components/icons/User-plus";
import { sCurUserProfileSignal } from "../signal/curUserProfileSignal";

const CoverPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = sCurUserProfileSignal.use();

  return (
    <div className="relative rounded-2xl overflow-hidden">
      <div className="bg-[url('/images/bia2.jpg')] object-cover bg-center h-[250px] relative bg-gray-500">
        <div className="absolute bottom-0 pl-[calc(16px+180px)] w-[calc(100%-16px+180px)]">
          <div className="pl-3 py-4">
            <h1 className="text-4xl font-semibold text-white ">
              {user?.fullName}
            </h1>
            {user?.jobTitle?.title}
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
              src={"/images/facebook.png"}
              alt="Avatar"
              className="w-full h-full object-cover rounded-full shadow-lg"
            />

            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 h-1/5 rounded-b-full cursor-pointer">
              <Camera className="w-6 h-6 text-white mb-1" />
            </div>
          </div>
          {/* Avatar */}
        </div>
      </div>

      <div className="py-3 bg-card px-4 flex justify-end items-center">
        <div className="flex justify-center space-x-6 relative">
          <div
            className="relative flex flex-col items-center space-x-2 cursor-pointer pb-2"
            onClick={() => setActiveTab("profile")}
          >
            <div className="flex items-center space-x-2">
              <CreditCard className="fill-primary-500" />
              <span className="text-base font-bold text-neutral-800">
                Hồ sơ
              </span>
            </div>
            {activeTab === "profile" && (
              <div className="absolute rounded-2xl bottom-0 left-0 w-full h-[2px] bg-primary-500"></div>
            )}
          </div>

          <div
            className="relative flex flex-col items-center space-x-2 cursor-pointer pb-2"
            onClick={() => setActiveTab("add-friend")}
          >
            <div className="flex items-center space-x-2">
              <UserPlus className="fill-primary-500" />
              <span className="text-base font-bold text-neutral-800">
                Thêm bạn bè
              </span>
            </div>
            {activeTab === "add-friend" && (
              <div className="absolute rounded-2xl bottom-0 left-0 w-full h-[2px] bg-primary-500"></div>
            )}
          </div>

          <div
            className="relative flex flex-col items-center space-x-2 cursor-pointer pb-2"
            onClick={() => setActiveTab("follow")}
          >
            <div className="flex items-center space-x-2">
              <Rss className="fill-primary-500" />
              <span className="text-base font-bold text-neutral-800">
                Theo dõi
              </span>
            </div>
            {activeTab === "follow" && (
              <div className="absolute rounded-2xl bottom-0 left-0 w-full h-[2px] bg-primary-500"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverPage;
