import UserPlus from "@/components/icons/User-plus";

const FriendButton = ({ onClick }: { onClick: () => void }) => (
  <div className="relative flex flex-col items-center cursor-pointer py-3 px-3">
    <div className="flex items-center space-x-2" onClick={onClick}>
      <UserPlus className="fill-primary-500" />
      <span className="text-base font-bold text-neutral-800">Thêm bạn bè</span>
    </div>
  </div>
);

export default FriendButton;
