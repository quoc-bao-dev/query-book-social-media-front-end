"use client";

import Camera from "@/components/icons/Camera";
import { useSendRequestMutation } from "@/queries/friend";
import { useAuth } from "@/store/authSignal";
import Link from "next/link";
import { useState } from "react";
import FollowButton from "../[userId]/partials/FollowButton";
import FriendButton from "../[userId]/partials/FriendButton";
import FriendStatusButton from "../[userId]/partials/FriendStatusButton";
import PostButton from "../[userId]/partials/PostButton";
import ProfileButton from "../[userId]/partials/ProfileButton";
import AvatarModal from "../me/(me)/partials/AvatarModal";
import CoverModal from "../me/(me)/partials/CoverModal";
import { sCurUserProfileSignal } from "../signal/curUserProfileSignal";

const CoverPage = () => {
  const { user: userMe } = useAuth();
  const { user } = sCurUserProfileSignal.use();

  const { mutateAsync } = useSendRequestMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCoveModalOpen, setIsCoveModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleOpenModals = () => {
    setIsCoveModalOpen(true);
  };

  const handleSendRequest = () => {
    if (!user) return;
    mutateAsync(user?.id)
      .then(() => alert("Đã gửi yêu cầu kết bạn!"))
      .catch((error) => alert("Lỗi: " + error.message));
  };

  const isMe = user?.id === userMe?.id;
  const targetLink = isMe ? "/me" : `/${user?.id || ""}`;
  const profileLink = isMe ? "/me/profile" : `/${user?.id || ""}/profile`;

  const isFriend = userMe?.friends?.some((friend) => friend.id === user?.id);
  return (
    <div className="relative rounded-b-2xl overflow-hidden ">
      {/* cover photo */}
      <div className="bg-[url('/images/bia2.jpg')] object-cover bg-center h-[250px] relative bg-gray-500 group">
        {/* Nút thay đổi ảnh bìa (chỉ hiển thị khi là chủ sở hữu) */}
        {user?.id === userMe?.id && (
          <div className="absolute inset-0">
            <div className="bg-black/40 absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-xl">
              <button
                onClick={handleOpenModals}
                className="text-white px-4 py-2 flex items-center gap-2 transition z-10"
              >
                <Camera className="w-5 h-5" />
                <span className="text-sm">Thay ảnh bìa</span>
              </button>
            </div>
          </div>
        )}

        {/* Phần thông tin người dùng */}
        <div className="absolute bottom-0 pl-[calc(16px+180px)] w-[calc(100%-16px+180px)]">
          <div className="pl-3 py-4">
            <h1 className="text-4xl font-semibold text-white">
              {user?.fullName}
            </h1>
            <h3 className="text-gray-500">{user?.jobTitle?.title}</h3>
            <p className="font-semibold text-base text-neutral-900"></p>
            <div className="flex gap-1 mt-2">
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

      {/* cover photo */}

      {/* Avatar */}
      <div className="px-4">
        <div className="relative">
          <div className="absolute translate-y-[-80%] size-[170px] rounded-full bg-muted overflow-hidden">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt="Avatar"
                className="w-full h-full object-cover rounded-full shadow-lg"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center rounded-full shadow-lg text-neutral-900 font-bold text-4xl">
                {user?.firstName?.charAt(0).toUpperCase()}
              </div>
            )}
            {user?.id === userMe?.id ? (
              <div
                className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 h-1/5 rounded-b-full cursor-pointer"
                onClick={handleOpenModal}
              >
                <Camera />
              </div>
            ) : (
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 h-1/5 rounded-b-full cursor-pointer">
                <span className="text-white text-xs">Xem ảnh</span>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Avatar */}

      <div className="bg-card  flex justify-end items-center ">
        <div className="flex justify-center space-x-2 relative">
          <Link href={profileLink} className="block">
            <ProfileButton />
          </Link>

          <Link href={targetLink} className="block">
            <PostButton />
          </Link>

          {user?.id !== userMe?.id && (
            <>
              {!isFriend ? (
                <FriendButton onClick={handleSendRequest} />
              ) : (
                <FriendStatusButton />
              )}
            </>
          )}

          {user?.id != userMe?.id && <FollowButton />}
        </div>
      </div>
      {/* Modal của AvatarModal */}
      <AvatarModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userMe={userMe}
      />
      {/* Modal của AvatarModal */}
      <CoverModal
        isModalOpen={isCoveModalOpen}
        setIsModalOpen={setIsCoveModalOpen}
        userMe={userMe}
      />
    </div>
  );
};

export default CoverPage;
