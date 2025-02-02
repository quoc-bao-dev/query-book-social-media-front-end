'use client';

import { useFollowMutation } from '@/queries/follow';
import { useUserSuggestionQuery } from '@/queries/user';
import UserFollowSuggestRow from './UserFollowSuggestRow';
import FriendSuggestRow from './FriendSuggestRow';

const SidebarRight = () => {
    const { data: followsSuggest } = useUserSuggestionQuery({
        suggestMode: 'follow_suggest',
    });

    const { data: friendsSuggest } = useUserSuggestionQuery({
        suggestMode: 'friend_suggest',
    });
    const { mutateAsync } = useFollowMutation();

    const lsFollowSuggest = followsSuggest?.data.data;

    const lsFriendSuggest = friendsSuggest?.data.data;

    return (
        <>
            {/* Follow */}
            <div className="">
                <div className="pb-1 font-semibold">
                    <p>Follow</p>
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
            </div>
            {/* Follow */}

            {/* Jobs */}
            <div className="pt-6">
                <div className="pb-1 font-semibold">
                    <p>Friends Suggest</p>
                </div>
                {lsFriendSuggest?.map((_user) => (
                    <FriendSuggestRow
                        {..._user}
                        key={_user.id}
                        isFriend={false}
                    />
                ))}
            </div>
            {/* Jobs */}
            {/* Jobs */}
            <div className="pt-6">
                <div className="pb-1 font-semibold">
                    <p>Jobs</p>
                </div>
            </div>
            {/* Jobs */}
        </>
    );
};

export default SidebarRight;
