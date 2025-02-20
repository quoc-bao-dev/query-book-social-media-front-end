// import { ArrowDown, ArrowUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFirstCharacter } from "@/utils/nameUtilts";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

type Props = {
  name: string;
  title: string;
  avatar: string;
  hashtags: { name: string }[];
  question: string;
  createdAt: string;
};
const CardQuestion = ({
  title,
  hashtags,
  avatar,
  question,
  name,
  createdAt,
}: Props) => {
  return (
    <div className="border-b py-4 bg-card flex items-center rounded-lg shadow-md mb-4">
      <div className="w-10 flex flex-col items-center">
        {/* {votes >= 0 ? (
          <ArrowUp size={20} className="text-success-500" />
        ) : (
          <ArrowDown size={20} className="text-error-500" />
        )}
        <span className="text-gray-600">{votes}</span> */}
      </div>
      <div className="flex-1 flex flex-col">
        <Link
          href="/qna?mode=detail"
          className="text-xl font-semibold text-neutral-900 cursor-pointer hover:text-green-600 overflow-hidden"
          style={{ maxWidth: "calc(100% - 60px)" }} // Giới hạn độ dài của title
        >
          {/* Cắt title nếu dài hơn 50 ký tự */}
          {title.length > 60 ? `${title.slice(0, 50)}...` : title}
        </Link>
        <p className="text-sm text-neutral-500">
          {question.length > 60 ? `${question.slice(0, 100)}...` : question}
        </p>
        <div className="flex items-center space-x-2 mt-1">
          {/* <img
            src={user?.avatarUrl}
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          /> */}

          <Avatar className="w-10 h-10 rounded-full">
            <AvatarImage src={avatar} />
            <AvatarFallback>{getFirstCharacter(name)}</AvatarFallback>
          </Avatar>
          <p className="text-sm text-neutral-500 ">
            by {name} ·
            {createdAt && formatDistanceToNow(createdAt, { addSuffix: true })}
          </p>
        </div>
        {/* Hiển thị các tag */}
        <div className="flex space-x-2 mt-2 cursor-pointer">
          {hashtags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-[#4B5563] text-[#F8FAFC] px-2 py-1 rounded-md"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardQuestion;
