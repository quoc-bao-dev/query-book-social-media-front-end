/* eslint-disable @next/next/no-img-element */

"use client";
import { useEffect, useState } from "react";
// import AskQuestionModal from "../../partials/AskQuestionModal";
import SetCurUserProfileSignal from "@/app/(main)/(profile)/partials/SetCurUserProfileSignal";
import { useGetMyQuestion, useQuestionQuery } from "@/queries/question";
import { useAuth } from "@/store/authSignal";
import { useSearchParams } from "next/navigation";
import MainContentAskQuestion from "../../ask-question/partials/MainContentAskQuestion";
import AskQuestionButton from "../../partials/AskQuestionButton";
import PostsMyQuestion from "./PostsMyQuestion";
import SearchBarMyQuestion from "./SearchBarMyQuestion";
import Pagination from "../../qna/partials/Pagination";

const MainContentMyQuestion = () => {
  const { user } = useAuth();
  const [curPage, setCurPage] = useState(1);

  const param = useSearchParams();
  const mode = param.get("mode");
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useGetMyQuestion();
  const { data: questionResponse } = useQuestionQuery({
    limit: 10,
    page: curPage,
    search: searchTerm,
  });

  // const { data, paginnation } = questionResponse;

  const lsQuestions = questionResponse?.data;
  const pagination = questionResponse?.pagination;

  const filteredPosts =
    data?.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (mode === "ask") {
    return <MainContentAskQuestion />;
  }

  return (
    <div className="mx-auto p-4 bg-background max-h-full pt-[65px]">
      <SetCurUserProfileSignal user={user} />
      {/* Thanh tìm kiếm */}
      <SearchBarMyQuestion
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="flex justify-end items-center mb-4">
        <AskQuestionButton />
      </div>

      {filteredPosts.length > 0 ? (
        filteredPosts
          .reverse()
          .slice()
          .map((post) => (
            <PostsMyQuestion key={post._id} post={post} user={user} />
          ))
      ) : (
        <p className="text-center text-neutral-500 mt-4">No results found</p>
      )}
      {lsQuestions && lsQuestions.length > 0 && pagination && (
        <Pagination
          currentPage={pagination.page}
          totalPage={pagination.totalPage}
          hasPreviousPage={pagination.hasPreviousPage}
          hasNextPage={pagination.hasNextPage}
          onPageChange={setCurPage}
        />
      )}
    </div>
  );
};

export default MainContentMyQuestion;
