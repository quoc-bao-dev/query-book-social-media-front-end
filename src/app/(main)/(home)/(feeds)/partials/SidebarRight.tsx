'use client';

import { useFollowMutation } from '@/queries/follow';
import { useUserSuggestionQuery } from '@/queries/user';
import UserFollowSuggestRow from './UserFollowSuggestRow';
import FriendSuggestRow from './FriendSuggestRow';
import { useTranslations } from 'next-intl';
import FriendCardSkeleton from './FriendCardSkeleton';

const SidebarRight = () => {
  const t = useTranslations('Sidebar');

  const { data: followsSuggest, isLoading: followLoading } =
    useUserSuggestionQuery({
      suggestMode: 'follow_suggest',
    });

  const { data: friendsSuggest, isLoading: friendLoading } =
    useUserSuggestionQuery({
      suggestMode: 'friend_suggest',
    });
  const { mutateAsync } = useFollowMutation();

  const lsFollowSuggest = followsSuggest;

  const lsFriendSuggest = friendsSuggest;

  return (
    <>
      {/* Follow */}
      <div className=''>
        <div className='pb-1 font-semibold'>
          <p>{t('follow')}</p>
        </div>
        {lsFollowSuggest?.map((_user) => (
          <UserFollowSuggestRow
            key={_user.id}
            {..._user}
            onFollow={(id: string) => {
              mutateAsync(id);
            }}
          />
        ))}
        {followLoading && (
          <div className='flex flex-col gap-3'>
            <FriendCardSkeleton />
            <FriendCardSkeleton />
            <FriendCardSkeleton />
          </div>
        )}
      </div>
      {/* Follow */}

      {/* Friends */}
      <div className='pt-6'>
        <div className='pb-1 font-semibold'>
          <p>{t('friendSuggest')}</p>
        </div>
        {lsFriendSuggest?.map((_user) => (
          <FriendSuggestRow {..._user} key={_user.id} isFriend={false} />
        ))}
        {friendLoading && (
          <div className='flex flex-col gap-3'>
            <FriendCardSkeleton />
            <FriendCardSkeleton />
            <FriendCardSkeleton />
          </div>
        )}
      </div>
      {/* Friends */}

      {/* Jobs */}
      <div className='pt-6'>
        <div className='pb-1 font-semibold'>
          <p>{t('jobs')}</p>
        </div>
      </div>
      {/* Jobs */}
    </>
  );
};

export default SidebarRight;
