import CreditCard from "@/components/icons/CreditCard"; // Đảm bảo import icon CreditCard từ đúng đường dẫn

const ProfileButton = () => {
  return (
    <div className="relative flex flex-col items-center py-3 px-3 group cursor-pointer">
      <div className="flex items-center space-x-2">
        <CreditCard className="fill-primary-500" />
        <span className="text-base font-bold text-neutral-800">Hồ sơ</span>
      </div>
      {/* Thêm border-bottom khi hover mà không thay đổi kích thước */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-x-100 rounded-md"></div>
    </div>
  );
};

export default ProfileButton;
