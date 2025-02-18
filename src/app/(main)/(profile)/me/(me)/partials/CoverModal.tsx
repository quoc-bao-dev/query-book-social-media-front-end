"use client";

import PlusIcon from "@/components/icons/PlusIcon";
// Định nghĩa kiểu cho props
interface AvatarModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userMe: { avatarUrl?: string } | null;
}
const CoverModal = ({
  isModalOpen,
  setIsModalOpen,
  userMe,
}: AvatarModalProps) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card p-4 rounded-lg shadow-2xl w-[700px] h-auto">
        {/* Tiêu đề */}
        <p className="text-center text-xl pb-4 font-semibold">Thay ảnh bìa</p>
        {/* Khu vực hiển thị ảnh */}
        <div className="flex flex-col items-center mb-5">
          <div className="relative">
            {userMe?.avatarUrl ? (
              <img
                src={userMe.avatarUrl}
                alt="Avatar"
                className="w-auto object-cover rounded-full shadow-lg"
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center rounded-full shadow-lg text-neutral-900 font-bold text-4xl">
                <img
                  src="/images/git.png"
                  alt="Avatar"
                  className="w-48 h-48 object-cover rounded-full shadow-lg"
                  style={{ imageRendering: "auto" }}
                />
              </div>
            )}
          </div>

          {/* Nút tải ảnh lên */}
          <div className="mt-3 w-auto flex space-x-4">
            <label
              htmlFor="avatarUpload"
              className="flex items-center bottom-0 right-0 bg-blue-500 text-white p-1 px-3 rounded-full shadow cursor-pointer hover:bg-blue-600 transition"
            >
              <PlusIcon className="w-4 h-4" />
              <span className="ml-1 text-sm flex">Tải ảnh lên</span>
            </label>
          </div>
        </div>

        {/* Input chọn file ảnh (ẩn) */}
        <input
          id="avatarUpload"
          type="file"
          accept="image/*"
          className="hidden"
        />

        {/* Nút hành động */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setIsModalOpen(false)}
            className="h-10 px-5 bg-gray-500 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Hủy
          </button>
          <button className="h-10 px-5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition">
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoverModal;
