import Rss from "@/components/icons/Rss";

const FollowedButton = () => {
  return (
    <button className="relative flex flex-col items-center p-2 px-4 bg-gray-50 rounded-lg w-fit h-">
      <div className="flex items-center space-x-2 b rounded-md">
        <Rss className="fill-primary-500" />
        <span className="text-base font-bold text-neutral-800">
          Đã theo dõi
        </span>
      </div>
    </button>
  );
};

export default FollowedButton;
