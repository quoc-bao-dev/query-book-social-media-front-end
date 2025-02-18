import Users from "@/components/icons/Users";

const FriendStatusButton = () => (
  <div className="relative flex flex-col items-center cursor-pointer py-3 px-3">
    <div className="flex items-center space-x-2">
      <Users className="fill-primary-500" />
      <span className="text-base font-bold text-neutral-800">Bạn bè</span>
    </div>
  </div>
);

export default FriendStatusButton;
