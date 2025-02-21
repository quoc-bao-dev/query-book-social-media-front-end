/* eslint-disable @next/next/no-img-element */
"use client";

import SendIcon from "@/components/icons/SendIcon";
import { formatDistanceToNow } from "date-fns";
import QuestionSection from "./partials/QuestionSection";
import { QuestionResponse } from "@/types/question";
import { useAnswerMutation, useAnswerQuery } from "@/queries/answer";
import { useRef } from "react";
import { ImageIcon } from "lucide-react";
import CodeIcon from "@/components/icons/CodeIcon";
import Avatar from "@/components/common/Avatar";

type QuestionDetailsProps = {
  question: QuestionResponse;
};
const QuestionDetails = ({ question }: QuestionDetailsProps) => {
  // FIXME: use react hook form

  const inputRef = useRef<HTMLInputElement>(null);
  const { data } = useAnswerQuery(question._id);

  const { mutateAsync } = useAnswerMutation(question._id);

  const handleSubmit = () => {
    const answer = inputRef.current?.value;
    if (!answer) return;
    mutateAsync({
      content: answer,
    }).then(() => {
      if (inputRef.current?.value) inputRef.current.value = "";
    });
  };

  console.log("[answers]", data);

  return (
    <div className="mx-35 p-4 bg-card max-h-full pt-20 px-14">
      {/* Câu hỏi */}

      <QuestionSection question={question} />
      {/* Phản hồi */}
      {data?.map((item) => (
        <div key={item._id} className="mt-2 pl-6 border-l-2 border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex items-center space-x-2">
              <Avatar
                src={item.userId.avatarUrl!}
                className="w-10 h-10 rounded-full"
                fallBack={`${question.userId.firstName} ${question.userId.lastName} `}
              />
              <p className="font-semibold">
                {item.userId.firstName} {item.userId.lastName}
              </p>
              <p className="text-2xl text-neutral-500 ">•</p>
              <p className="text-sm text-gray-500">
                {item.createdAt &&
                  formatDistanceToNow(item.createdAt, { addSuffix: true })}
              </p>
            </div>
          </div>

          <p className="mt-1 text-lg text-neutral-600">{item.content}</p>
          <div className="mt-2 flex items-center gap-2 text-accent-foreground"></div>
        </div>
      ))}

      <div className="mt-4 flex items-center justify-start gap-2">
        <Avatar
          src={data?.[0]?.userId.avatarUrl}
          className="w-10 h-10 rounded-full"
          fallBack={`${question.userId.firstName} ${question.userId.lastName} `}
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="Write a reply..."
          className="w-[80%] p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-lg hover:text-primary-600">
            <ImageIcon className="w-6 h-6" />
          </button>
          <button className="p-2 rounded-lg hover:text-primary-600">
            <CodeIcon className="w-6 h-6" />
          </button>

          <button
            onClick={handleSubmit}
            className=" p-2  rounded-lg hover:text-primary-600"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetails;
