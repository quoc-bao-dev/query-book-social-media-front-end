"use client";

import PlusIcon from "@/components/icons/PlusIcon";
// Định nghĩa kiểu cho props
interface AvatarModalProps {
  isModalOpenAvtUserId: boolean;
  setIsModalOpenAvtUserId: React.Dispatch<React.SetStateAction<boolean>>;
  user: { avatarUrl?: string } | null;
}
const AvatarModalUser = ({
  isModalOpenAvtUserId,
  setIsModalOpenAvtUserId,
  user,
}: AvatarModalProps) => {
  if (!isModalOpenAvtUserId) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card p-4 rounded-lg w-[500px] h-auto">
        {/* Tiêu đề */}
        <p className="text-center text-xl pb-4 font-semibold"></p>
        {/* Khu vực hiển thị ảnh */}
        <div className="flex flex-col items-center mb-5 ">
          <div className="relative p-2 bg-muted rounded-full">
            {
              <div className="flex items-center justify-center rounded-full  text-neutral-900 font-bold text-4xl">
                <img
                  src={user?.avatarUrl}
                  alt="Avatar"
                  className="w-96 h-96 object-cover rounded-full"
                  style={{ imageRendering: "auto" }}
                />
              </div>
            }
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setIsModalOpenAvtUserId(false)}
            className="h-10 px-5 bg-gray-500 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Hủy
          </button>
          {/* <button className="h-10 px-5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition">
            Lưu
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default AvatarModalUser;
