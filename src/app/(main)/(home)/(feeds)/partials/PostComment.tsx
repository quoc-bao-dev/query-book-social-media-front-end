'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCommentMutation } from "@/queries/comment";
import { useAuth } from "@/store/authSignal";
import { getFirstCharacter } from "@/utils/nameUtilts";
import { uploadImages } from "@/utils/uploadUtils";
import { useRef, useState } from "react";

const PostComment = ({ postId }: { postId: string }) => {

    const [images, setImages] = useState<File[]>([]);

    const inputRef = useRef<HTMLInputElement>(null)

    const { mutateAsync: comment } = useCommentMutation(postId)

    const handleImageChange = (event: any) => {
        const files = event.target.files;
        if (files) {
            const newImages = Array.from(files);
            setImages(pre => [...pre, ...newImages]);
        }
    };

    const handleRemoveImage = (index: number) => () => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    }

    const handleUploadImage = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.click();
        input.onchange = handleImageChange
    }

    const { user } = useAuth();

    const handleComment = async () => {
        const media = (await uploadImages(images))?.files?.[0];

        console.log('[media]', media?.filename);


        const payload = {
            content: inputRef.current?.value,
            media: {
                fileName: media?.filename,
                type: "image",
                sourceType: "file"
            }
        }

        comment(payload)

    }


    return (
        <>
            {images.map((image, index) => (
                <div key={index} className="relative">
                    <img src={URL.createObjectURL(image)} alt="" />
                    <div className="absolute top-1 right-1 cursor-pointer" onClick={handleRemoveImage(index)}>x</div>
                </div>
            ))}
            <div className="flex py-3">

                <div className="flex justify-center">
                    <Avatar>
                        <AvatarImage src={user?.avatarUrl} />
                        <AvatarFallback>
                            {getFirstCharacter(user?.fullName ?? '')}
                        </AvatarFallback>
                    </Avatar>

                </div>
                <div className="ml-3 w-[90%] ">
                    <input
                        ref={inputRef}
                        type="text"
                        className="w-full h-[40px] px-2 rounded-lg focus:border-info-500 focus:outline-none focus:ring-1 focus:ring-info-500"
                        placeholder="Write a comment" />
                    <div className="p-3 bg-red-300" onClick={handleUploadImage}> img</div>
                    <div className="p-3 bg-blue-300" onClick={handleComment}> cmt</div>
                </div>
            </div>
        </>
    )
}

export default PostComment