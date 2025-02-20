import Users from "@/components/icons/Users";

const FriendStatusButton = () => (
  <button className="relative flex flex-col items-center cursor-pointer p-2 px-4  bg-gray-50 rounded-lg w-fit h-">
    <div className="flex items-center space-x-2">
      <Users className="fill-primary-500" />
      <span className="text-base font-bold text-neutral-800">Bạn bè</span>
    </div>
  </button>
);

export default FriendStatusButton;
