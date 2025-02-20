"use client";

import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MainContentDetailQnA from "../../detail-qna/partials/MainContentDetailQnA";
import { useQuestionQuery } from "@/queries/question";
import CardQuestion from "./CardQuestion";
import { Button } from "@/components/common/Button";
import { useAppLoading } from "@/components/Layout/AppLoading";

const MainContentQnA = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [curPage, setCurPage] = useState(1);

  const { setLoading } = useAppLoading();

  const searchRef = useRef<HTMLInputElement>(null);

  const param = useSearchParams();
  const mode = param.get("mode");

  const { data: questionResponse, isLoading } = useQuestionQuery({
    limit: 10,
    page: curPage,
    search: searchTerm,
  });

  // const { data, paginnation } = questionResponse;

  const lsQuestions = questionResponse?.data;
  const pagination = questionResponse?.pagination;
  console.log("[lsQuestions]", lsQuestions);

  const handleClick = () => {
    const value = searchRef.current?.value;
    if (value) {
      setSearchTerm(value);
    }
  };

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (mode === "detail") {
    return <MainContentDetailQnA />;
  }

  return (
    <div className="bg-background max-h-full p-6 ">
      <h2 className="text-xl font-bold mb-4 text-center">Recent Questions</h2>
      {/* Thanh tìm kiếm */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-primary-600" />
        </div>
        <input
          type="text"
          placeholder="Search by author or tag..."
          ref={searchRef}
          className="w-full pl-10 px-4 py-2 placeholder-neutral-500 placeholder:opacity-70 border border-none rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <Button onClick={handleClick}>search</Button>

      {/* {lsQuestions?.map((h) => (
        <p key={h._id}>{h.title}</p>
      ))} */}

      {/* Hiển thị kết quả hoặc thông báo "No results found" */}

      {lsQuestions?.map((q) => (
        <CardQuestion
          name={`${q.userId.firstName} ${q.userId.lastName}`}
          avatar={q.userId.avatarUrl!}
          key={q._id}
          title={q.title}
          hashtags={q.hashtags}
          question={q.question}
          createdAt={q.createdAt!}
        />
      ))}

      <div className="py-5 flex gap-4">
        {pagination?.hasPreviousPage && (
          <Button
            onClick={() => setCurPage((pre) => pre - 1)}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-2" />
            Prev
          </Button>
        )}
        <div className="flex items-center px-4 py-2 text-sm text-gray-700">
          Page {pagination?.page} of {pagination?.totalPage}
        </div>
        {/* Hiển thị nút Next nếu còn trang */}
        {pagination?.hasNextPage && (
          <Button
            onClick={() => setCurPage((pre) => pre + 1)}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-gray-900 ml-2"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default MainContentQnA;
