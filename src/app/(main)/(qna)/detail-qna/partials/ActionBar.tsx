import HeartIcon from "@/components/icons/HeartIcon";
import ShareIcon from "@/components/icons/ShareIcon";
import {
  useGetMySaveQuestionQuery,
  useSaveQuestionMutation,
} from "@/queries/question";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon } from "lucide-react";
import React from "react";

type ActionBarProps = {
  id: string;
};
const ActionBar = ({ id }: ActionBarProps) => {
  const { mutateAsync } = useSaveQuestionMutation();
  const { data } = useGetMySaveQuestionQuery();

  console.log("[data save]", data);
  const isSaved = data?.some((_item) => _item.questionId._id === id);

  const handleSaveQuestion = async () => {
    if (isSaved) return;
    await mutateAsync(id);
  };

  return (
    <div className="mt-2 flex items-center gap-2 text-gray-600">
      <HeartIcon className="w-5 h-5 fill-red-500 text-red-500" />
      <span>2.3k</span>
      <ChatBubbleOvalLeftIcon className="w-5 h-5 text-gray-500" />
      <span>200</span>
      <ShareIcon className="w-5 h-5 text-gray-500" />
      <span>Share</span>
      <button onClick={handleSaveQuestion} className="flex items-center">
        <BookmarkIcon
          className={`w-5 h-5 transition ${
            isSaved ? "fill-blue-600 text-blue-600" : " text-gray-600"
          }`}
        />
        <span>{isSaved ? "Saved" : "Save"}</span>
      </button>
    </div>
  );
};

export default ActionBar;
