/* eslint-disable @next/next/no-img-element */
"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ArrowDown, ArrowUp } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MainContentDetailQnA from "../../detail-qna/partials/MainContentDetailQnA";
const questions = [
  {
    id: 1,
    votes: 3,
    title: "How can a complete beginner start learning Cyber Security",
    author: "kacrdkk.kxx",
    time: "1 giờ trước",
    tags: ["#cyber", "#beginner"],
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2z-KXBX_nvo8AIGsXqeQKPC-W3R8aJuysbQ&s",
  },
  {
    id: 2,
    votes: 3,
    title: "How to learn TypeScript?",
    author: "quocbao.49",
    time: "2 giờ trước",
    tags: ["#cyber", "#cyber"],
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2z-KXBX_nvo8AIGsXqeQKPC-W3R8aJuysbQ&s",
  },
  {
    id: 3,
    votes: 4,
    title: "How to use if...else in JavaScript?",
    author: "jack.lamer",
    time: "3 giờ trước",
    tags: ["#cyber", "#cyber"],
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2z-KXBX_nvo8AIGsXqeQKPC-W3R8aJuysbQ&s",
  },
  {
    id: 4,
    votes: 5,
    title:
      "How to make money in the IT industry? Please provide me with some resources.",
    author: "strongxxp",
    time: "2 giờ trước",
    tags: ["#cyber", "#cyber"],
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2z-KXBX_nvo8AIGsXqeQKPC-W3R8aJuysbQ&s",
  },
  {
    id: 5,
    votes: 4,
    title:
      "How to use the Angular framework to create an e-commerce website branded as Apolo?",
    author: "ethan985",
    time: "3 giờ trước",
    tags: ["#cyber", "#cyber"],
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2z-KXBX_nvo8AIGsXqeQKPC-W3R8aJuysbQ&s",
  },
  {
    id: 6,
    votes: 0,
    title: "Common commands in JavaScript.",
    author: "quocbao.49",
    time: "3 giờ trước",
    tags: ["#cyber", "#cyber"],
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2z-KXBX_nvo8AIGsXqeQKPC-W3R8aJuysbQ&s",
  },
  {
    id: 7,
    votes: -1,
    title: "Please give me advice on starting as a developer.",
    author: "quocbao.49",
    time: "3 giờ trước",
    tags: ["#cyber", "#cyber"],
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2z-KXBX_nvo8AIGsXqeQKPC-W3R8aJuysbQ&s",
  },
  {
    id: 8,
    votes: -2,
    title:
      "Does anyone have a Next.js file? Could you please share it with me?",
    author: "quocbao.49",
    time: "3 giờ trước",
    tags: ["#hehe", "#ok"],
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2z-KXBX_nvo8AIGsXqeQKPC-W3R8aJuysbQ&s",
  },
];

const MainContentQnA = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const param = useSearchParams();
  const mode = param.get("mode");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const filteredQuestions = questions.filter(
    (q) =>
      q.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.title && q.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      q.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Focus to the top of the page whenever the page is rendered or updated

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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 px-4 py-2 placeholder-neutral-500 placeholder:opacity-70 border border-none rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Hiển thị kết quả hoặc thông báo "No results found" */}
      {filteredQuestions.length > 0 ? (
        filteredQuestions.map((q) => (
          <div
            key={q.id}
            className="border-b py-4 bg-card flex items-center rounded-lg shadow-md mb-4"
          >
            <div className="w-10 flex flex-col items-center">
              {q.votes >= 0 ? (
                <ArrowUp size={20} className="text-success-500" />
              ) : (
                <ArrowDown size={20} className="text-error-500" />
              )}
              <span className="text-gray-600">{q.votes}</span>
            </div>
            <div className="flex-1 flex flex-col">
              <Link
                href="/qna?mode=detail"
                className="text-xl font-semibold text-neutral-900 cursor-pointer hover:text-green-600 overflow-hidden"
                style={{ maxWidth: "calc(100% - 60px)" }} // Giới hạn độ dài của title
              >
                {/* Cắt title nếu dài hơn 50 ký tự */}
                {q.title.length > 60 ? `${q.title.slice(0, 50)}...` : q.title}
              </Link>
              <div className="flex items-center space-x-2 mt-1">
                <img
                  src={q.avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <p className="text-sm text-neutral-500 ">
                  by {q.author} · {q.time}
                </p>
              </div>
              {/* Hiển thị các tag */}
              <div className="flex space-x-2 mt-2 cursor-pointer">
                {q.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-[#4B5563] text-[#F8FAFC] px-2 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 py-6">No results found.</div>
      )}
    </div>
  );
};

export default MainContentQnA;
