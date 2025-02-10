const PostSkeleton: React.FC = () => {
    return (
        <div className="bg-white shadow-md rounded-xl p-4 animate-pulse">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div>
                        <div className="w-24 h-4 bg-gray-300 rounded"></div>
                        <div className="w-16 h-3 bg-gray-300 rounded mt-1"></div>
                    </div>
                </div>
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
            </div>

            {/* Content */}
            <div className="mt-3 space-y-2">
                <div className="w-full h-4 bg-gray-300 rounded"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            </div>

            {/* Hashtags */}
            <div className="w-1/2 h-3 bg-gray-300 rounded mt-2"></div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="w-full h-[200px] bg-gray-300 rounded"></div>
                <div className="w-full h-[200px] bg-gray-300 rounded"></div>
                <div className="w-full h-[200px] bg-gray-300 rounded"></div>
                <div className="w-full h-[200px] bg-gray-300 rounded"></div>
            </div>
        </div>
    );
};

export default PostSkeleton;
