'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import {
  useFriendsQuery,
  useSendRequestMutation,
  useSendRequestsQuery,
} from '@/queries/friend';
import { useAuth } from '@/store/authSignal';

import Avatar from '@/components/common/Avatar';
import Camera from '@/components/icons/Camera';

import CancelInvitationButton from '../[userId]/partials/CancelinvitationButton';
import FollowButton from '../[userId]/partials/FollowButton';
import FollowedButton from '../[userId]/partials/FollowedButton';
import FriendButton from '../[userId]/partials/FriendButton';
import Friended from '../[userId]/partials/Friended';
import FriendStatusButton from '../[userId]/partials/FriendStatusButton';
import PostButton from '../[userId]/partials/PostButton';
import ProfileButton from '../[userId]/partials/ProfileButton';

import { sCurUserProfileSignal } from '../signal/curUserProfileSignal';

import AvatarModal from '../me/(me)/partials/AvatarModal';
import CoverModal from '../me/(me)/partials/CoverModal';
import AvatarModalUser from './AvatarModalUser';

const CoverPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCoveModalOpen, setIsCoveModalOpen] = useState(false);
  const [isModalOpenAvtUserId, setIsModalOpenAvtUserId] = useState(false);

  const { user: userMe } = useAuth();
  const { user } = sCurUserProfileSignal.use();
  const { data: friendUser } = useFriendsQuery();
  const { data } = useSendRequestsQuery();

  const isMe = user && userMe && user.id === userMe.id;
  const friends = isMe ? friendUser?.data?.data || [] : user?.friends || [];

  const { mutateAsync, isPending: isSendRequestPending } =
    useSendRequestMutation();

  // Các hàm mở modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleOpenModalCoveFage = () => setIsCoveModalOpen(true);
  const handleOpenModalAvtUserId = () => setIsModalOpenAvtUserId(true);

  // Hàm gửi yêu cầu kết bạn
  const handleSendRequest = useCallback(() => {
    if (!user || isLoading) return;

    setIsLoading(true);
    mutateAsync(user.id).finally(() => {
      setIsLoading(false);
    });
  }, [user, mutateAsync, isLoading]);

  // Các đường dẫn
  const targetLink = isMe ? '/me' : `/${user?.id || ''}`;
  const profileLink = isMe ? '/me/profile' : `/${user?.id || ''}/profile`;
  const friendedLink = isMe ? '/me/friended' : `/${user?.id || ''}/friended`;

  // Kiểm tra trạng thái kết bạn
  const isSendRequest = data?.some((item) => item.id === user?.id) ?? false;
  const isFriend =
    userMe?.friends?.some((friend) => friend?.id === user?.id) ?? false;

  useEffect(() => {}, []);

  return (
    <>
      {/* covepage-bg */}
      <div className='relative rounded-b-2xl w-full'>
        {/* Cover photo */}
        <div className='relative bg-gray-500 group '>
          <img
            src={user?.coverPageUrl || '/images/hinh-bg.jpg'}
            alt='Ảnh bìa'
            className='md:w-[1024px] md:h-[250px] object-cover object-center'
          />

          {/* User info */}
          <div className='absolute bottom-0 w-full'>
            <div className='hidden md:flex flex-col items-center justify-center md:flex-row md:justify-between overflow-hidden'>
              {/* Left side */}
              <div className='py-4 w-fit md:ml-52 text-center md:text-left'>
                <div>
                  <h1
                    className='text-2xl md:text-4xl font-semibold text-white'
                    style={{ textShadow: '2px 2px 2px rgba(0, 0, 0, 0.6)' }}
                  >
                    {user?.fullName}
                  </h1>

                  <h3
                    className='text-white/80 font-semibold'
                    style={{ textShadow: '2px 2px 2px rgba(0, 0, 0, 0.6)' }}
                  >
                    {user?.jobTitle?.title || user?.professional || 'Chưa có'}
                  </h3>
                </div>

                <div className='flex gap-1 mt-2 justify-center md:justify-start'>
                  <div className='flex items-center'>
                    {friends.slice(0, 4).map((friend, index) => (
                      <div
                        key={friend.id}
                        className={`friend-item w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-white ${
                          index !== 0 ? '-ml-2' : ''
                        }`}
                      >
                        <Avatar
                          src={friend?.avatarUrl}
                          className='w-full h-full object-cover'
                          fallBack={friend?.fullName}
                        />
                      </div>
                    ))}

                    {/* Nếu có hơn 5 bạn, hiển thị dấu "+x" */}
                    {friends.length > 5 && (
                      <div className='w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-gray-300 border-2 border-white text-xs font-bold -ml-2'>
                        +{friends.length - 4}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right side */}
              <div className=' md:absolute md:bottom-2 md:right-4'>
                <div className='flex gap-2'>
                  {user?.id !== userMe?.id && (
                    <>
                      {isSendRequest ? (
                        <CancelInvitationButton userId={user?.id || ''} />
                      ) : !isFriend ? (
                        <FriendButton
                          onClick={handleSendRequest}
                          disabled={isSendRequestPending}
                        />
                      ) : (
                        <FriendStatusButton userId={user?.id || ''} />
                      )}
                    </>
                  )}

                  {user?.id !== userMe?.id && user?.id && (
                    <>
                      {user?.followers?.some(
                        (_user) => _user.id === userMe?.id,
                      ) ? (
                        <FollowedButton userId={user.id} />
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
          {/* Change cover photo */}
          {user?.id === userMe?.id && (
            <div className='absolute inset-0'>
              <div className='bg-black/40 absolute bottom-0 right-0 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-tl-xl'>
                <button
                  onClick={handleOpenModalCoveFage}
                  className='text-white px-4 py-2 flex items-center gap-2 transition z-10'
                  aria-label='Thay ảnh bìa'
                >
                  <Camera className='w-5 h-5' />
                  <span className='text-sm'>Thay ảnh bìa</span>
                </button>
              </div>
            </div>
          )}
          {/* Change cover photo */}
        </div>

        {/* Avt */}
        <div className='px-4'>
          <div className='parent-element relative flex justify-center items-center md:justify-start'>
            <div className='md:flex absolute translate-y-[-30%] size-[150px] md:size-[170px] rounded-full bg-muted overflow-hidden p-1 z-50'>
              {user?.avatarUrl ? (
                <img
                  src={user?.avatarUrl || '/images/git.png'}
                  alt='Avatar'
                  className='w-full h-full object-cover rounded-full shadow-lg'
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center rounded-full shadow-lg text-neutral-900 font-bold text-4xl'>
                  {user?.firstName?.charAt(0).toUpperCase()}
                </div>
              )}
              {user?.id === userMe?.id ? (
                <div
                  className='text-white absolute bottom-0 left-0 right-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 h-1/5 rounded-b-full cursor-pointer'
                  onClick={handleOpenModal}
                >
                  <Camera />
                </div>
              ) : (
                <div
                  onClick={handleOpenModalAvtUserId}
                  className='absolute bottom-0 left-0 right-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 h-1/5 rounded-b-full cursor-pointer'
                >
                  <span className='text-white text-xs'>Xem ảnh</span>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Avt */}

        {/* Phan cua dien thoai */}
        <div className='bg-card md:hidden'>
          <div className='flex flex-col items-center justify-center text-center pt-10'>
            {/* Tên của user */}
            <div className=''>
              <div className='text-neutral-900'>
                <h1 className='text-3xl font-semibold'>{user?.fullName}</h1>
              </div>

              <div className='pt-2'>
                <h3 className='text-neutral-800 font-semibold'>
                  {user?.jobTitle?.title || user?.professional || 'Chưa có'}
                </h3>
              </div>
            </div>
            {/* Tên của user */}

            {/* Danh sách bạn bè */}
            <div className='flex gap-1 justify-center p-2'>
              <div className='flex items-center'>
                {friends.slice(0, 4).map((friend, index) => (
                  <div
                    key={friend.id}
                    className={`friend-item w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-white ${
                      index !== 0 ? '-ml-2' : ''
                    }`}
                  >
                    <Avatar
                      src={friend?.avatarUrl}
                      className='w-full h-full object-cover'
                      fallBack={friend?.fullName}
                    />
                  </div>
                ))}

                {/* Nếu có hơn 5 bạn, hiển thị dấu "+x" */}
                {friends.length > 5 && (
                  <div className='w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-gray-300 border-2 border-white text-xs font-bold -ml-2'>
                    +{friends.length - 4}
                  </div>
                )}
              </div>
            </div>
            {/* Danh sách bạn bè */}

            {/* Các nút tương tác */}
            <div className='mb-2 flex gap-2 justify-center'>
              {user?.id !== userMe?.id && (
                <>
                  {isSendRequest ? (
                    <CancelInvitationButton userId={user?.id || ''} />
                  ) : !isFriend ? (
                    <FriendButton
                      onClick={handleSendRequest}
                      disabled={isSendRequestPending}
                    />
                  ) : (
                    <FriendStatusButton userId={user?.id || ''} />
                  )}
                </>
              )}

              {user?.id !== userMe?.id && user?.id && (
                <>
                  {user?.followers?.some((_user) => _user.id === userMe?.id) ? (
                    <FollowedButton userId={user.id} />
                  ) : (
                    <FollowButton userId={user.id} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {/* Phan cua dien thoai */}
      </div>
      {/* covepage-bg */}

      {/* Hoso - Baiviet */}
      <div className='bg-card flex justify-end items-center border-t border-gray-200 rounded-b-2xl'>
        <div className='flex justify-center space-x-2 relative pr-4'>
          <Link href={targetLink} className='block' prefetch>
            <PostButton />
          </Link>
          <Link href={profileLink} className='block' prefetch>
            <ProfileButton />
          </Link>
          <Link href={friendedLink} className='block' prefetch>
            <Friended />
          </Link>
        </div>
      </div>
      {/* Hoso - Baiviet */}

      {/* Mode */}
      <div className=''>
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
