"use client";

import PlusIcon from "@/components/icons/PlusIcon";
import { useUpdateUserProfileMutation } from "@/queries/user";
import { uploadImage } from "@/utils/uploadUtils";
import { useState } from "react";
// Định nghĩa kiểu cho props
interface AvatarModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userMe: { coverPageUrl?: string } | null;
}
const CoverModal = ({
  isModalOpen,
  setIsModalOpen,
  userMe,
}: AvatarModalProps) => {
  const [curImage, setCurImage] = useState<File | null>(null);

  const avtImageCovePage = curImage
    ? URL.createObjectURL(curImage)
    : userMe?.coverPageUrl;

  const { mutateAsync } = useUpdateUserProfileMutation();

  const handleUploadCovePage = async () => {
    const image = await uploadImage(curImage!);
    const payload = {
      coverPage: {
        type: "image",
        sourceType: "file",
        fileName: image,
      },
    };

    await mutateAsync(payload);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card p-4 rounded-lg shadow-2xl w-[700px] h-auto">
        {/* Tiêu đề */}
        <p className="text-center text-xl pb-4 font-semibold">
          Thay ảnh bìa (1028x250)
        </p>

        {/* Khu vực hiển thị ảnh */}
        <div className="flex flex-col items-center mb-5">
          <div className="relative ">
            <img
              src={avtImageCovePage}
              alt="Avatar"
              className="object-cover rounded-md w-[500px] h-[300px]"
            />
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
          onChange={(e) => setCurImage(e.target.files![0])}
        />

        {/* Nút hành động */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setIsModalOpen(false)}
            className="h-10 px-5 bg-gray-500 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Hủy
          </button>
          <button
            onClick={handleUploadCovePage}
            className="h-10 px-5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoverModal;
