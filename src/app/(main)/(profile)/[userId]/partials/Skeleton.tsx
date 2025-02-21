const Skeleton = () => (
  <div className="animate-pulse">
    {/* Cover Image Skeleton */}
    <div className="h-[250px] bg-gray-300 rounded-b-2xl"></div>

    {/* Avatar Skeleton */}
    <div className="px-4">
      <div className="relative">
        <div className="absolute translate-y-[-80%] size-[170px] rounded-full bg-gray-300"></div>
      </div>
    </div>

    {/* User Info Skeleton */}
    <div className="px-4 mt-20">
      <div className="h-8 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
      <div className="flex gap-1 mt-2">
        <div className="size-8 rounded-full bg-gray-300"></div>
        <div className="size-8 rounded-full bg-gray-300"></div>
        <div className="size-8 rounded-full bg-gray-300"></div>
      </div>
    </div>

    {/* Action Buttons Skeleton */}
    <div className="bg-card flex justify-end items-center p-4">
      <div className="flex gap-2">
        <div className="h-10 w-24 bg-gray-300 rounded"></div>
        <div className="h-10 w-24 bg-gray-300 rounded"></div>
        <div className="h-10 w-24 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
);
