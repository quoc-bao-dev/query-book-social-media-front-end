import React from 'react';

const FriendCardSkeleton: React.FC = () => {
    return (
        <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 animate-pulse w-[286px]">
            {/* Avatar */}
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>

            {/* Text */}
            <div className="flex-1 ml-3 space-y-2">
                <div className="w-32 h-4 bg-gray-300 rounded"></div>
                <div className="w-24 h-3 bg-gray-300 rounded"></div>
            </div>

            {/* Button */}
            <div className="w-16 h-8 bg-gray-300 rounded-lg"></div>
        </div>
    );
};

export default FriendCardSkeleton;
