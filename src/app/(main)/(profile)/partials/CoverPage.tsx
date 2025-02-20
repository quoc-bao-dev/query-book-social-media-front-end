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
import FollowedButton from "../[userId]/partials/FollowedButton";
import AvatarModalUser from "./AvatarModalUser";

const CoverPage = () => {
  const { user: userMe } = useAuth();
  const { user } = sCurUserProfileSignal.use();

  const maxFriendsToShow = 3;
  const friends = user?.friends || [];
  const displayedFriends = friends.slice(0, maxFriendsToShow);
  const remainingFriends = friends.length - maxFriendsToShow;

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

  const handleSendRequest = () => {
    if (!user) return;
    mutateAsync(user?.id)
      .then(() => alert("Đã gửi yêu cầu kết bạn!"))
      .catch((error) => alert(" " + error.message));
  };

  const isMe = user?.id === userMe?.id;
  const targetLink = isMe ? "/me" : `/${user?.id || ""}`;
  const profileLink = isMe ? "/me/profile" : `/${user?.id || ""}/profile`;

  const isFriend = userMe?.friends?.some((friend) => friend.id === user?.id);
  return (
    <div className="relative rounded-b-2xl overflow-hidden ">
      {/* cover photo */}
      <div
        className="relative bg-gray-500 group h-[250px] overflow-hidden"
        style={{
          backgroundImage: `url(${user?.coverPageUrl})`,
          backgroundPosition: "center", // Căn giữa hình ảnh
          backgroundSize: "cover", // Phủ kín phần tử
          backgroundRepeat: "no-repeat", // Không lặp lại hình ảnh
        }}
      >
        {/* Phần thông tin người dùng */}
        <div className="absolute :relative bottom-0  w-[calc(100%-16px+180px)]">
          <div className="flex justify-between ">
            {/* Phần bên trái */}
            <div className="py-4 w-fit ml-52">
              <div>
                <h1 className="text-4xl font-semibold text-white">
                  {user?.fullName}
                </h1>
                <h3 className="text-white/80 font-semibold">
                  {user?.jobTitle?.title || "Chưa có"}
                </h3>
              </div>

              <div className="flex gap-1 mt-2">
                {/* <div className="size-8 rounded-full bg-gray-500">
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
                </div> */}
                <div className="flex items-center">
                  {displayedFriends.map((friend, index) => (
                    <div
                      key={friend.id}
                      className={`friend-item w-10 h-10 rounded-full overflow-hidden border-2 border-white ${
                        index !== 0 ? "-ml-2" : ""
                      }`}
                    >
                      <img
                        src={friend?.avatarUrl || "images/git.png"}
                        alt={`Avatar của ${friend.fullName}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}

                  {remainingFriends > 0 && (
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-sm font-semibold border-2 border-white -ml-2">
                      +{remainingFriends}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Phần bên phải */}
            <div className="absolute right-0  w-fit h-fit mr-44 bottom-2">
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

                {user?.id !== userMe?.id &&
                  user?.id &&
                  (user?.followers.some((_user) => _user.id === userMe?.id) ? (
                    <FollowedButton />
                  ) : (
                    <FollowButton userId={user.id} />
                  ))}
              </div>
            </div>
          </div>
        </div>
        {/* Nút thay đổi ảnh bìa (chỉ hiển thị khi là chủ sở hữu) */}
        {user?.id === userMe?.id && (
          <div className="absolute inset-0">
            <div className="bg-black/40 absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-xl">
              <button
                onClick={handleOpenModalCoveFage}
                className="text-white px-4 py-2 flex items-center gap-2 transition z-10"
              >
                <Camera className="w-5 h-5" />
                <span className="text-sm">Thay ảnh bìa</span>
              </button>
            </div>
          </div>
        )}
      </div>
      {/* cover photo */}

      {/* Avatar */}
      <div className="px-4">
        <div className="relative">
          <div className="absolute translate-y-[-80%] size-[170px] rounded-full bg-muted overflow-hidden p-1">
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
                <span className="text-white text-xs">Xem ảnh</span>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Avatar */}
      {/* hồ sơ - bài viết - theo dõi - bạn bè*/}
      <div className="bg-card flex justify-end items-center border-t border-gray-200 pr-4">
        <div className="flex justify-center space-x-2 relative">
          <Link href={profileLink} className="block">
            <ProfileButton />
          </Link>
          <Link href={targetLink} className="block">
            <PostButton />
          </Link>
        </div>
      </div>
      {/* hồ sơ - bài viết - theo dõi - bạn bè*/}
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
    </div>
  );
};

export default CoverPage;
