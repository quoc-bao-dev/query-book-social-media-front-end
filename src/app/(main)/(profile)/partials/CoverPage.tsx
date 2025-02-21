"use client";

import Camera from "@/components/icons/Camera";
import { useSendRequestMutation } from "@/queries/friend";
import { useAuth } from "@/store/authSignal";
import Link from "next/link";
import { useCallback, useState } from "react";
import FollowButton from "../[userId]/partials/FollowButton";
import FollowedButton from "../[userId]/partials/FollowedButton";
import FriendButton from "../[userId]/partials/FriendButton";
import FriendStatusButton from "../[userId]/partials/FriendStatusButton";
import PostButton from "../[userId]/partials/PostButton";
import ProfileButton from "../[userId]/partials/ProfileButton";
import AvatarModal from "../me/(me)/partials/AvatarModal";
import CoverModal from "../me/(me)/partials/CoverModal";
import { sCurUserProfileSignal } from "../signal/curUserProfileSignal";
import AvatarModalUser from "./AvatarModalUser";

const CoverPage = () => {
  const { user: userMe } = useAuth();
  const { user } = sCurUserProfileSignal.use();

  const [isLoading, setIsLoading] = useState(false);

  const maxFriendsToShow = 3;
  const friends = user?.friends || [];
  const displayedFriends = friends.slice(0, maxFriendsToShow);

  const { mutateAsync } = useSendRequestMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCoveModalOpen, setIsCoveModalOpen] = useState(false);
  const [isModalOpenAvtUserId, setIsModalOpenAvtUserId] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleOpenModalCoveFage = () => {
    setIsCoveModalOpen(true);
  };
  const handleOpenModalAvtUserId = () => {
    setIsModalOpenAvtUserId(true);
  };

  const handleSendRequest = useCallback(() => {
    if (!user || isLoading) return;

    setIsLoading(true); // Bật trạng thái loading
    mutateAsync(user.id)
      .then(() => {
        alert("Đã gửi yêu cầu kết bạn!");
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu kết bạn:", error);
        alert("Lỗi: " + error.message);
      })
      .finally(() => {
        setIsLoading(false); // Tắt trạng thái loading
      });
  }, [user, mutateAsync, isLoading]);

  const isMe = user && userMe && user.id === userMe.id;

  const targetLink = isMe ? "/me" : `/${user?.id || ""}`;
  const profileLink = isMe ? "/me/profile" : `/${user?.id || ""}/profile`;
  const isFriend =
    userMe?.friends?.some((friend) => friend?.id === user?.id) ?? false;

  return (
    <>
      {/* covepage-bg */}
      <div className="relative rounded-b-2xl w-auto">
        {/* Cover photo */}
        <div className="relative bg-gray-500 group h-[250px] md:h-[250px] ">
          <img
            src={user?.coverPageUrl}
            alt="Ảnh bìa"
            className="w-full h-full object-cover object-center"
          />

          {/* Avt */}
          <div className="px-4">
            <div className="parent-element relative flex justify-center items-center md:justify-start">
              <div className="md:flex absolute translate-y-[-30%] size-[150px] md:size-[170px] rounded-full bg-muted overflow-hidden p-1 z-50">
                {user?.avatarUrl ? (
                  <img
                    src={user?.avatarUrl || "/images/git.png"}
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
                    className="text-white absolute bottom-0 left-0 right-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 h-1/5 rounded-b-full cursor-pointer"
                    onClick={handleOpenModal}
                  >
                    <Camera />
                  </div>
                ) : (
                  <div
                    onClick={handleOpenModalAvtUserId}
                    className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 h-1/5 rounded-b-full cursor-pointer"
                  >
                    <span className="text-white text-xs">Xem ảnh</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Avt */}

          {/* User info */}
          <div className="absolute bottom-0 w-full">
            <div className="hidden md:flex flex-col items-center justify-center md:flex-row md:justify-between overflow-hidden">
              {/* Left side */}
              <div className="py-4 w-fit md:ml-52 text-center md:text-left">
                <div>
                  <h1 className="text-2xl md:text-4xl font-semibold text-white">
                    {user?.fullName}
                  </h1>
                  <h3 className="text-white/80 font-semibold">
                    {user?.jobTitle?.title || "Chưa có"}
                  </h3>
                </div>

                <div className="flex gap-1 mt-2 justify-center md:justify-start">
                  <div className="flex items-center">
                    {displayedFriends.map((friend) => (
                      <div
                        key={friend.id}
                        className={`friend-item w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-white ${
                          displayedFriends.indexOf(friend) !== 0 ? "-ml-2" : ""
                        }`}
                      >
                        <img
                          src={friend?.avatarUrl || "/images/git.png"}
                          alt={`Avatar của ${friend.fullName}`}
                          className="w-full h-full object-cover"
                          title={friend.fullName}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side */}
              <div className="w-fit h-fit md:absolute md:bottom-2 md:right-4">
                <div className="flex gap-2">
                  {user?.id !== userMe?.id && (
                    <>
                      {!isFriend ? (
                        <FriendButton onClick={handleSendRequest} />
                      ) : (
                        <FriendStatusButton />
                      )}
                    </>
                  )}

                  {user?.id !== userMe?.id && user?.id && (
                    <>
                      {user?.followers?.some(
                        (_user) => _user.id === userMe?.id
                      ) ? (
                        <FollowedButton />
                      ) : (
                        <FollowButton userId={user.id} />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* User info */}
        </div>

        {/* Phan cua dien thoai */}
        <div className="bg-black md:hidden flex items-center justify-center w-full">
          <div className="flex flex-col items-center justify-center text-center w-full pt-10">
            {/* Tên của user */}
            <div className="">
              <div className="text-white">
                <h1 className="text-3xl font-semibold">{user?.fullName}</h1>
              </div>

              <div className="pt-2">
                <h3 className="text-white/80 font-semibold">
                  {user?.jobTitle?.title || "Chưa có"}
                </h3>
              </div>
            </div>
            {/* Tên của user */}

            {/* Danh sách bạn bè */}
            <div className="flex gap-1 justify-center p-2">
              <div className="flex items-center">
                {displayedFriends.map((friend) => (
                  <div
                    key={friend.id}
                    className={`friend-item w-8 h-8 rounded-full overflow-hidden border-2 border-white ${
                      displayedFriends.indexOf(friend) !== 0 ? "-ml-2" : ""
                    }`}
                  >
                    <img
                      src={friend?.avatarUrl || "/images/git.png"}
                      alt={`Avatar của ${friend.fullName}`}
                      className="w-full h-full object-cover"
                      title={friend.fullName}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Danh sách bạn bè */}

            {/* Các nút tương tác */}
            <div className="w-fit h-fit mb-2 flex gap-2 justify-center">
              {user?.id !== userMe?.id && (
                <>
                  {!isFriend ? (
                    <FriendButton onClick={handleSendRequest} />
                  ) : (
                    <FriendStatusButton />
                  )}
                </>
              )}

              {user?.id !== userMe?.id && user?.id && (
                <>
                  {user?.followers?.some((_user) => _user.id === userMe?.id) ? (
                    <FollowedButton />
                  ) : (
                    <FollowButton userId={user.id} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {/* Phan cua dien thoai */}

        {/* Change cover photo */}
        {user?.id === userMe?.id && (
          <div className="absolute inset-0">
            <div className="bg-black/40 absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-xl">
              <button
                onClick={handleOpenModalCoveFage}
                className="text-white px-4 py-2 flex items-center gap-2 transition z-10"
                aria-label="Thay ảnh bìa"
              >
                <Camera className="w-5 h-5" />
                <span className="text-sm">Thay ảnh bìa</span>
              </button>
            </div>
          </div>
        )}
        {/* Change cover photo */}
      </div>
      {/* covepage-bg */}

      {/* Hoso - Baiviet */}
      <div className="bg-card flex justify-end items-center border-t border-gray-200 rounded-b-2xl">
        <div className="flex justify-center space-x-2 relative">
          <Link href={profileLink} className="block" prefetch>
            <ProfileButton />
          </Link>
          <Link href={targetLink} className="block" prefetch>
            <PostButton />
          </Link>
        </div>
      </div>
      {/* Hoso - Baiviet */}

      {/* Mode */}
      <div className="">
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
        <AvatarModalUser
          isModalOpenAvtUserId={isModalOpenAvtUserId}
          setIsModalOpenAvtUserId={setIsModalOpenAvtUserId}
          user={user}
        />
      </div>
      {/* Mode */}
    </>
  );
};

export default CoverPage;
