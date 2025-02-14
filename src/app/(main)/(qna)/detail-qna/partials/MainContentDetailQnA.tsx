/* eslint-disable @next/next/no-img-element */

"use client";
import React, { useEffect } from "react";
import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  // ChatBubbleBottomCenterTextIcon,
  ShareIcon,
  BookmarkIcon,
  ArrowLeftIcon,
  // PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import SendIcon from "@/components/icons/SendIcon";
const MainContentDetailQnA = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mx-35 p-4 bg-card max-h-full pt-20 px-14">
      <Link
        href="/qna"
        className="flex items-center justify-center w-10 h-10 mb-3  rounded-full bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-700"
      >
        <ArrowLeftIcon className="w-6 h-6" />
      </Link>

      {/* Câu hỏi */}
      <div className="flex items-center gap-3  ">
        <div className="flex items-center space-x-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2z-KXBX_nvo8AIGsXqeQKPC-W3R8aJuysbQ&s"
            alt="user"
            className="w-10 h-10 rounded-full"
          />
          <h4 className="font-semibold text-neutral-900">jcole.lamar</h4>
          <p className="text-sm text-neutral-600">10h ago</p>
        </div>
      </div>
      <h2 className="mt-2 text-3xl font-semibold text-neutral-900">
        How can a complete beginner start learning Cyber Security?
      </h2>
      <p className="mt-2 text-lg text-neutral-600">
        Cyber Security is a rapidly growing field, and it can seem daunting for
        beginners. However, with the right resources and mindset, anyone can
        start learning the basics of cyber security. In this article, we will
        explore the first steps to take when diving into this exciting career
        path.
      </p>
      <img
        src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/03/anh-meme-hai-6.jpg"
        alt="Cyber Security"
        className="w-[80%] mx-auto mt-4 rounded-lg"
      />
      <div className="mt-2 flex items-center gap-2 text-accent-foreground">
        <HeartIcon className="w-5 h-5 fill-red-500 text-red-500" />
        <span>2.3k</span>
        <ChatBubbleOvalLeftIcon className="w-5 h-5 text-accent-foreground" />
        <span>200</span>
        <ShareIcon className="w-5 h-5 text-accent-foreground" />
        <span>Share</span>
        <BookmarkIcon className="w-5 h-5 fill-accent-foreground text-accent-foreground" />
        <span>Save</span>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2z-KXBX_nvo8AIGsXqeQKPC-W3R8aJuysbQ&s"
          alt="user"
          className="w-10 h-10 rounded-full"
        />
        <input
          type="text"
          placeholder="Write a reply..."
          className="w-[50%] p-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button className="  rounded-lg">
          <SendIcon />
        </button>
      </div>

      {/* Danh sách câu trả lời */}
      <div className="mt-4 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2z-KXBX_nvo8AIGsXqeQKPC-W3R8aJuysbQ&s"
              alt="user"
              className="w-10 h-10 rounded-full"
            />
            <h4 className="font-semibold">jcole.lamar</h4>
            <p className="text-sm text-gray-500">10h ago</p>
          </div>
        </div>
        <p className="mt-2 text-neutral-600">
          To start learning Cyber Security, you need to study many programming
          books and refer to online resources.
        </p>
        <div className="mt-2 flex items-center gap-2 text-accent-foreground">
          <HeartIcon className="w-5 h-5 fill-red-500 text-red-500" />
          <span>2.3k</span>
          <ChatBubbleOvalLeftIcon className="w-5 h-5 text-accent-foreground" />
          <span>200</span>
          <ShareIcon className="w-5 h-5 text-accent-foreground" />
          <span>Share</span>
          <BookmarkIcon className="w-5 h-5 fill-accent-foreground text-accent-foreground" />
          <span>Save</span>
        </div>

        {/* Phản hồi */}
        <div className="mt-2 pl-6 border-l-2 border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex items-center space-x-2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2z-KXBX_nvo8AIGsXqeQKPC-W3R8aJuysbQ&s"
                alt="user"
                className="w-10 h-10 rounded-full"
              />
              <h4 className="font-semibold">jcole.lamar</h4>
              <p className="text-sm text-gray-500">10h ago</p>
            </div>
          </div>

          <p className="mt-1 text-sm text-neutral-600">
            Oh, this post is so well.
          </p>
          <div className="mt-2 flex items-center gap-2 text-accent-foreground">
            <HeartIcon className="w-5 h-5 fill-red-500 text-red-500" />
            <span>2.3k</span>
            <ChatBubbleOvalLeftIcon className="w-5 h-5 text-accent-foreground" />
            <span>200</span>
            <ShareIcon className="w-5 h-5 text-accent-foreground" />
            <span>Share</span>
            <BookmarkIcon className="w-5 h-5 fill-accent-foreground text-accent-foreground" />
            <span>Save</span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2z-KXBX_nvo8AIGsXqeQKPC-W3R8aJuysbQ&s"
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

        {/* Câu trả lời 2 */}
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2z-KXBX_nvo8AIGsXqeQKPC-W3R8aJuysbQ&s"
              alt="user"
              className="w-10 h-10 rounded-full"
            />
            <h4 className="font-semibold">jcole.lamar</h4>
            <p className="text-sm text-gray-500">10h ago</p>
          </div>
        </div>
        <p className="mt-2">
          I think you should start by studying various resources on the
          W3Schools website.
        </p>
        <a
          href="https://www.w3schools.com"
          target="_blank"
          className="text-blue-500"
        >
          https://www.w3schools.com
        </a>
        <div className="mt-2 flex items-center gap-2 text-gray-600">
          <HeartIcon className="w-5 h-5 fill-red-500 text-red-500" />
          <span>2.3k</span>
          <ChatBubbleOvalLeftIcon className="w-5 h-5 text-gray-500" />
          <span>200</span>
          <ShareIcon className="w-5 h-5 text-gray-500" />
          <span>Share</span>
          <BookmarkIcon className="w-5 h-5 fill-[#0F172A] text-[#0F172A]" />
          <span>Save</span>
        </div>

        {/* Phản hồi */}
        <div className="mt-2 pl-6 border-l-2 border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex items-center space-x-2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2z-KXBX_nvo8AIGsXqeQKPC-W3R8aJuysbQ&s"
                alt="user"
                className="w-10 h-10 rounded-full"
              />
              <h4 className="font-semibold">jcole.lamar</h4>
              <p className="text-sm text-gray-500">10h ago</p>
            </div>
          </div>
          <p className="mt-1 text-sm">I agree with this opinion.</p>
          <div className="mt-2 flex items-center gap-2 text-gray-600">
            <HeartIcon className="w-5 h-5 fill-red-500 text-red-500" />
            <span>2.3k</span>
            <ChatBubbleOvalLeftIcon className="w-5 h-5 text-gray-500" />
            <span>200</span>
            <ShareIcon className="w-5 h-5 text-gray-500" />
            <span>Share</span>
            <BookmarkIcon className="w-5 h-5 fill-[#0F172A] text-[#0F172A]" />
            <span>Save</span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2z-KXBX_nvo8AIGsXqeQKPC-W3R8aJuysbQ&s"
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
        {/* Câu trả lời 2 */}
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2z-KXBX_nvo8AIGsXqeQKPC-W3R8aJuysbQ&s"
              alt="user"
              className="w-10 h-10 rounded-full"
            />
            <h4 className="font-semibold">jcole.lamar</h4>
            <p className="text-sm text-gray-500">10h ago</p>
          </div>
        </div>
        <p className="mt-2">
          I think you should start by studying various resources on the
          W3Schools website.
        </p>
        <a
          href="https://www.w3schools.com"
          target="_blank"
          className="text-blue-500"
        >
          https://www.w3schools.com
        </a>
        <div className="mt-2 flex items-center gap-2 text-gray-600">
          <HeartIcon className="w-5 h-5 text-gray-500" />
          <span>2.3k</span>
          <ChatBubbleOvalLeftIcon className="w-5 h-5 text-gray-500" />
          <span>200</span>
          <ShareIcon className="w-5 h-5 text-gray-500" />
          <span>Share</span>
          <BookmarkIcon className="w-5 h-5 text-gray-500" />
          <span>Save</span>
        </div>

        {/* Phản hồi */}
        <div className="mt-2 pl-6 border-l-2 border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex items-center space-x-2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2z-KXBX_nvo8AIGsXqeQKPC-W3R8aJuysbQ&s"
                alt="user"
                className="w-10 h-10 rounded-full"
              />
              <h4 className="font-semibold">jcole.lamar</h4>
              <p className="text-sm text-gray-500">10h ago</p>
            </div>
          </div>
          <p className="mt-1 text-sm">I agree with this opinion.</p>
          <div className="mt-2 flex items-center gap-2 text-gray-600">
            <HeartIcon className="w-5 h-5 text-gray-500" />
            <span>2.3k</span>
            <ChatBubbleOvalLeftIcon className="w-5 h-5 text-gray-500" />
            <span>200</span>
            <ShareIcon className="w-5 h-5 text-gray-500" />
            <span>Share</span>
            <BookmarkIcon className="w-5 h-5 text-gray-500" />
            <span>Save</span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2z-KXBX_nvo8AIGsXqeQKPC-W3R8aJuysbQ&s"
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

      {/* Nút xem thêm */}
      <button className="mt-4 w-full bg-primary-500 text-accent-foreground py-2 rounded-lg">
        View more comments
      </button>
    </div>
  );
};

export default MainContentDetailQnA;
