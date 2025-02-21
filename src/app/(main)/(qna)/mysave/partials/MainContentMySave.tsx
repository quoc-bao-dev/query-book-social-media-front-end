/* eslint-disable @next/next/no-img-element */

"use client";
import { useGetMySaveQuestionQuery } from "@/queries/question";
import { useEffect, useState } from "react";
import PostsMySave from "./PostsMySave";
import SearchBarMySave from "./SearchBarMySave";

const MainContentMySave = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useGetMySaveQuestionQuery();

  console.log("[my save]", data);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mx-auto p-4 bg-background max-h-full pt-[65px]">
      {/* Thanh tìm kiếm */}
      <SearchBarMySave searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Render bài viết */}
      {Array.isArray(data) && data.length > 0 ? (
        data
          .slice()
          .reverse()
          .filter(
            (item: any) =>
              item.userId?.firstName
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              item.questionId?.hashtags?.some((tag: string) =>
                tag.toLowerCase().includes(searchTerm.toLowerCase())
              )
          )
          .map((item: any) => <PostsMySave key={item._id} post={item} />)
      ) : (
        <p className="text-center text-gray-500">No saved questions found.</p>
      )}
    </div>
  );
};

export default MainContentMySave;
