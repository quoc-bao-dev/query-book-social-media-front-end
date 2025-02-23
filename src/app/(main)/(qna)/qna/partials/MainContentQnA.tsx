"use client";

import { useAppLoading } from "@/components/Layout/AppLoading";
import { useQuestionQuery } from "@/queries/question";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MainContentDetailQnA from "../../detail-qna/partials/MainContentDetailQnA";
import CardQuestion from "./CardQuestion";
import Pagination from "./Pagination";
import SearchBarQnA from "./SearchBarQnA";

const MainContentQnA = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [curPage, setCurPage] = useState(1);

  const { setLoading } = useAppLoading();

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

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (mode === "detail") {
    return <MainContentDetailQnA />;
  }

  return (
    <div className="bg-background max-h-full p-6 ">
      <h2 className="text-xl font-bold mb-4 text-center">Recent Questions</h2>
      <SearchBarQnA onSearch={setSearchTerm} />

      {lsQuestions && lsQuestions.length > 0 ? (
        lsQuestions.map((q) => (
          <CardQuestion
            id={q._id}
            name={`${q.userId.firstName} ${q.userId.lastName}`}
            avatar={q.userId.avatarUrl!}
            key={q._id}
            title={q.title}
            hashtags={q.hashtags}
            question={q.question}
            createdAt={q.createdAt!}
          />
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

export default MainContentQnA;
