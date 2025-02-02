'use client';

import { useFriendsQuery } from '@/queries/friend';
import FriendCard from './FriendCard';

const Friends = () => {
    const { data: friends } = useFriendsQuery();

    const lsFriends = friends?.data.data;
    return (
        <>
            <h2 className="text-xl font-semibold py-2">Friends</h2>
            <div className="grid grid-cols-3 gap-4">
                {lsFriends?.map((friend) => (
                    <FriendCard
                        key={friend.id}
                        id={friend.id}
                        fullName={friend.fullName}
                        avatar={friend.avatarUrl!}
                        title={friend.handle}
                        followers={friend.followerCount}
                        following={friend.followingCount}
                        cover={'friend'}
                    />
                ))}
            </div>
        </>
    );
};

export default Friends;
