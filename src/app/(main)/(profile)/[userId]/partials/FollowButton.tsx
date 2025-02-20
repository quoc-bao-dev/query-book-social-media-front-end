import Signal from "@/components/icons/Signal"; // Đảm bảo import icon Signal từ đúng đường dẫn
import { useFollowMutation } from "@/queries/follow";

const FollowButton = ({ userId }: { userId: string }) => {
  const { mutateAsync } = useFollowMutation({ mode: "userPage", userId });

  const handleFollow = async () => {
    await mutateAsync(userId);
  };
  return (
    <button
      onClick={handleFollow}
      className="relative flex flex-col items-center py-3 px-3 group cursor-pointer"
    >
      <div className="flex items-center space-x-2">
        <Signal className="fill-primary-500" />
        <span className="text-base font-bold text-neutral-800">Theo dõi</span>
      </div>
    </button>
  );
};

export default FollowButton;
