/* eslint-disable @next/next/no-img-element */

"use client";
import React, { useEffect, useState } from "react";
import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
  MagnifyingGlassIcon,
  ArrowDownIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
  FlagIcon,
} from "@heroicons/react/24/outline";
import SendIcon from "@/components/icons/SendIcon";
const posts = [
  {
    author: "snoopdog",
    timeAgo: "10h ago",
    title: "How to Learn Programming Effectively?",
    content:
      "Programming is one of the most promising and rewarding fields in today’s digital world. However, mastering it requires dedication, problem-solving skills, and continuous learning. Many beginners struggle with where to start, what to focus on, and how to stay motivated. Below are some important questions to consider when learning programming effectively.",
    imageUrl: "",
    authorImage:
      "https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/snoop_dogg.png",
    comments: 200,
    likes: 2300,
  },
  {
    author: "ice.cube",
    timeAgo: "10h ago",
    title: "What is the difference between compiled and interpreted languages?",
    content:
      "Compiled languages (e.g., C, C++) require the source code to be converted into machine code before execution, resulting in faster performance. Interpreted languages (e.g., Python, JavaScript) execute code line-by-line, making debugging easier but potentially slower.",
    imageUrl:
      "https://s3-sgn09.fptcloud.com/codelearnstorage/Media/Default/Users/Trg_5FPhu/blog1/blog1.jpg",
    authorImage:
      "https://upload.wikimedia.org/wikipedia/commons/2/2c/Ice-Cube_2014-01-09-Chicago-photoby-Adam-Bielawski.jpg",
    comments: 150,
    likes: 1800,
  },
  {
    author: "travis.scott",
    timeAgo: "12d ago",
    title: "What is the difference between an array and a linked list?",
    content:
      "An array is a contiguous block of memory where elements are stored sequentially, allowing fast access by index. A linked list consists of nodes connected via pointers, enabling dynamic memory allocation but with slower access time compared to arrays.",
    imageUrl:
      "https://toidicodedao.com/wp-content/uploads/2020/07/screenshot-2020-07-23-at-4.53.48-pm.jpg",
    authorImage:
      "https://imageio.forbes.com/specials-images/imageserve/5ed670179e384f0007b7db8f/0x0.jpg?format=jpg&crop=2610,2609,x1032,y186,safe&height=416&width=416&fit=bounds",
    comments: 300,
    likes: 2100,
  },
  {
    author: "jcole.lamar",
    timeAgo: "10h ago",
    title: "How to learn TypeScript?",
    content:
      "Cyber Security is a rapidly growing field, and it can seem daunting for beginners...",
    imageUrl:
      "https://topdev.vn/blog/wp-content/uploads/2019/06/vs-code-theme-Night-Owl.png",
    authorImage:
      "https://hips.hearstapps.com/hmg-prod/images/j_cole_photo_by_isaac_brekken_wireimage_getty_503069628.jpg",
    comments: 300,
    likes: 2100,
  },

  {
    author: "jcole.lamar",
    timeAgo: "10h ago",
    title: "How to learn TypeScript?",
    content:
      "Cyber Security is a rapidly growing field, and it can seem daunting for beginners...",
    imageUrl:
      "https://gcs.tripi.vn/public-tripi/tripi-feed/img/477714EJG/anh-mo-ta.png",
    authorImage:
      "https://hips.hearstapps.com/hmg-prod/images/j_cole_photo_by_isaac_brekken_wireimage_getty_503069628.jpg",
    comments: 300,
    likes: 2100,
  },
  {
    author: "jcole.lamar",
    timeAgo: "10h ago",
    title: "How to learn TypeScript?",
    content:
      "Cyber Security is a rapidly growing field, and it can seem daunting for beginners...",
    imageUrl:
      "https://carre.edu.vn/wp-content/uploads/2024/12/anh-meme-hai-huoc-che-e1735373827733.webp",
    authorImage:
      "https://hips.hearstapps.com/hmg-prod/images/j_cole_photo_by_isaac_brekken_wireimage_getty_503069628.jpg",
    comments: 300,
    likes: 2100,
  },
  {
    author: "jcole.lamar",
    timeAgo: "10h ago",
    title: "How to learn TypeScript?",
    content:
      "Cyber Security is a rapidly growing field, and it can seem daunting for beginners...",
    imageUrl:
      "https://cdn.caohockinhte.edu.vn/wp-content/uploads/2024/08/hinh-tau-hai-bua-1.jpg",
    authorImage:
      "https://hips.hearstapps.com/hmg-prod/images/j_cole_photo_by_isaac_brekken_wireimage_getty_503069628.jpg",
    comments: 300,
    likes: 2100,
  },
  // Add more posts as needed...
];

const MainContentMySave = () => {
  const [searchTerm] = useState("");

  const [showMore, setShowMore] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const toggleMenu = () => {
    setShowMenu(!showMenu); // Thay đổi trạng thái menu
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mx-auto p-4 bg-background max-h-full pt-[65px]">
      {/* Thanh tìm kiếm */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-[#00A76F]" />
        </div>
        <input
          type="text"
          placeholder="Search by author or tag..."
          value={searchTerm}
          className="w-full pl-10 px-4 py-2 placeholder-neutral-500 placeholder:opacity-70 border border-none rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        {/* Button Back */}
        <div></div>
      </div>

      {/* Render bài viết */}
      {posts.slice(0, showMore ? posts.length : 4).map((post, index) => (
        <div
          key={index}
          className="rounded-lg shadow-lg p-4 mb-6 border border-border bg-card"
        >
          {/* Header */}
          <div className="flex items-center justify-between mt-3 ">
            <div className="flex items-center space-x-2">
              <img
                src={post.authorImage}
                alt="user"
                className="w-10 h-10 rounded-full"
              />
              <h4 className="font-semibold">{post.author}</h4>
              <p className="text-sm text-accent-foreground">{post.timeAgo}</p>
            </div>

            {/* Biểu tượng dấu 3 chấm */}
            <button onClick={toggleMenu} className="relative">
              <EllipsisVerticalIcon className="h-6 w-6 text-gray-500" />
              {/* Menu khi click */}
              {showMenu && (
                <div className="absolute right-0 top-0 mt-7 w-52 p-2 bg-background shadow-lg rounded-md border">
                  <ul className="space-y-2">
                    <li className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 cursor-pointer">
                      <PencilSquareIcon className="w-5 h-5 text-gray-700 mr-2" />
                      Edit
                    </li>
                    <li className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 cursor-pointer">
                      <TrashIcon className="w-5 h-5 text-gray-700 mr-2" />
                      Delete
                    </li>
                    <li className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 cursor-pointer">
                      <FlagIcon className="w-5 h-5 text-gray-700 mr-2" />
                      Report
                    </li>
                  </ul>
                </div>
              )}
            </button>
          </div>

          {/* Title */}
          <h2 className="mt-2 text-3xl font-semibold text-neutral-900">
            {post.title}
          </h2>

          {/* Content */}
          <p className="mt-2 text-lg text-neutral-600">{post.content}</p>

          {/* Image - Chỉ hiển thị nếu có hình ảnh */}
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="Post Image"
              className="w-full h-[500px] object-cover mx-auto mt-4 rounded-lg"
            />
          )}

          {/* Actions */}
          <div className="mt-2 flex items-center gap-2 text-accent-foreground">
            <HeartIcon className="w-5 h-5 fill-red-500 text-red-500" />
            <span>{post.likes}</span>
            <ChatBubbleOvalLeftIcon className="w-5 h-5 text-accent-foreground" />
            <span>{post.comments}</span>
            <ShareIcon className="w-5 h-5 text-accent-foreground" />
            <span>Share</span>
            <BookmarkIcon className="w-5 h-5 fill-accent-foreground text-accent-foreground" />
            <span>Save</span>
          </div>

          {/* Reply Section */}
          <div className="mt-4 flex items-center gap-3">
            <img
              src={post.authorImage}
              alt="user"
              className="w-10 h-10 rounded-full"
            />
            <input
              type="text"
              placeholder="Write a reply..."
              className="w-[50%] p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="  rounded-lg">
              <SendIcon />
            </button>
          </div>
        </div>
      ))}

      {/* Button View More */}
      <div className="flex justify-center mt-6">
        <button
          onClick={toggleShowMore}
          className="wobble flex items-center justify-center gap-2 px-6 py-2 border border-[#00A76F] rounded-lg hover:bg-[#00A76F] hover:text-white transition duration-300 ease-in-out"
        >
          <span>{showMore ? "View Less" : "View More"}</span>
          <ArrowDownIcon
            className={`w-5 h-5 ${showMore ? "rotate-180" : ""} transition-all`}
          />
        </button>
      </div>
    </div>
  );
};

export default MainContentMySave;
