/* eslint-disable @next/next/no-img-element */

"use client";
import {
  ArrowDownIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisVerticalIcon,
  FlagIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
// import AskQuestionModal from "../../partials/AskQuestionModal";
import SetCurUserProfileSignal from "@/app/(main)/(profile)/partials/SetCurUserProfileSignal";
import SendIcon from "@/components/icons/SendIcon";
import { useGetMyQuestion } from "@/queries/question";
import { useAuth } from "@/store/authSignal";
import MonacoEditor from "@monaco-editor/react";
import { useSearchParams } from "next/navigation";
import MainContentAskQuestion from "../../ask-question/partials/MainContentAskQuestion";
import AskQuestionButton from "../../partials/AskQuestionButton";
import { formatDistanceToNow } from "date-fns";
// const posts = [
//   {
//     author: "jcole.lamar",
//     timeAgo: "10h ago",
//     title: "How to learn TypeScript?",
//     content:
//       "I’m a web developer who has been working with JavaScript for quite a while...",
//     imageUrl:
//       "https://www.didongmy.com/vnt_upload/news/05_2024/anh-27-meme-dang-yeu-didongmy.jpg",
//     authorImage:
//       "https://hips.hearstapps.com/hmg-prod/images/j_cole_photo_by_isaac_brekken_wireimage_getty_503069628.jpg",
//     comments: 200,
//     likes: 2300,
//   },
//   {
//     author: "jcole.lamar",
//     timeAgo: "10h ago",
//     title: "How to use if...else in JavaScript?",
//     content:
//       "I’m currently learning JavaScript, and I’ve been working with conditional statements...",
//     imageUrl:
//       "https://vietnampfa.com/wp-content/uploads/2024/10/meme-meo-cuoi-6r0oJnQ.webp",
//     authorImage:
//       "https://hips.hearstapps.com/hmg-prod/images/j_cole_photo_by_isaac_brekken_wireimage_getty_503069628.jpg",
//     comments: 150,
//     likes: 1800,
//   },
//   {
//     author: "jcole.lamar",
//     timeAgo: "10h ago",
//     title: "How to learn TypeScript?",
//     content:
//       "Cyber Security is a rapidly growing field, and it can seem daunting for beginners...",
//     imageUrl:
//       "https://gcs.tripi.vn/public-tripi/tripi-feed/img/477714EJG/anh-mo-ta.png",
//     authorImage:
//       "https://hips.hearstapps.com/hmg-prod/images/j_cole_photo_by_isaac_brekken_wireimage_getty_503069628.jpg",
//     comments: 300,
//     likes: 2100,
//   },
//   {
//     author: "jcole.lamar",
//     timeAgo: "10h ago",
//     title: "How to learn TypeScript?",
//     content:
//       "Cyber Security is a rapidly growing field, and it can seem daunting for beginners...",
//     imageUrl:
//       "https://topdev.vn/blog/wp-content/uploads/2019/06/vs-code-theme-Night-Owl.png",
//     authorImage:
//       "https://hips.hearstapps.com/hmg-prod/images/j_cole_photo_by_isaac_brekken_wireimage_getty_503069628.jpg",
//     comments: 300,
//     likes: 2100,
//   },

//   {
//     author: "jcole.lamar",
//     timeAgo: "10h ago",
//     title: "How to learn TypeScript?",
//     content:
//       "Cyber Security is a rapidly growing field, and it can seem daunting for beginners...",
//     imageUrl:
//       "https://gcs.tripi.vn/public-tripi/tripi-feed/img/477714EJG/anh-mo-ta.png",
//     authorImage:
//       "https://hips.hearstapps.com/hmg-prod/images/j_cole_photo_by_isaac_brekken_wireimage_getty_503069628.jpg",
//     comments: 300,
//     likes: 2100,
//   },
//   {
//     author: "jcole.lamar",
//     timeAgo: "10h ago",
//     title: "How to learn TypeScript?",
//     content:
//       "Cyber Security is a rapidly growing field, and it can seem daunting for beginners...",
//     imageUrl:
//       "https://carre.edu.vn/wp-content/uploads/2024/12/anh-meme-hai-huoc-che-e1735373827733.webp",
//     authorImage:
//       "https://hips.hearstapps.com/hmg-prod/images/j_cole_photo_by_isaac_brekken_wireimage_getty_503069628.jpg",
//     comments: 300,
//     likes: 2100,
//   },
//   {
//     author: "jcole.lamar",
//     timeAgo: "10h ago",
//     title: "How to learn TypeScript?",
//     content:
//       "Cyber Security is a rapidly growing field, and it can seem daunting for beginners...",
//     imageUrl:
//       "https://cdn.caohockinhte.edu.vn/wp-content/uploads/2024/08/hinh-tau-hai-bua-1.jpg",
//     authorImage:
//       "https://hips.hearstapps.com/hmg-prod/images/j_cole_photo_by_isaac_brekken_wireimage_getty_503069628.jpg",
//     comments: 300,
//     likes: 2100,
//   },
//   // Add more posts as needed...
// ];

const MainContentMyQuestion = () => {
  const [showMore, setShowMore] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useAuth();
  const param = useSearchParams();
  const mode = param.get("mode");
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useGetMyQuestion();
  const filteredPosts =
    data?.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (mode === "ask") {
    return <MainContentAskQuestion />;
  }
  console.log("HHHHHHHHHHHHHHHHHHHHH", filteredPosts);

  return (
    <div className="mx-auto p-4 bg-background max-h-full pt-[65px]">
      <SetCurUserProfileSignal user={user} />
      {/* Thanh tìm kiếm */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-[#00A76F]" />
        </div>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 px-4 py-2 placeholder-neutral-500 placeholder:opacity-70 border border-none rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="flex justify-end items-center mb-4">
        <AskQuestionButton />
      </div>

      {/* Render bài viết */}
      {/* {data?.map((iteam) => (
        <p key={iteam._id}>{iteam.title}</p>
      ))} */}
      {filteredPosts.length > 0 ? (
        filteredPosts
          .reverse()
          .slice(0, showMore ? filteredPosts.length : 4)
          .map((post) => (
            <div
              key={post._id}
              className="rounded-lg shadow-lg p-4 mb-6 border border-border bg-card"
            >
              <div className="flex items-center justify-between mt-3 ">
                <div className="flex items-center space-x-2">
                  <img
                    src={user?.avatarUrl}
                    alt="user"
                    className="w-10 h-10 rounded-full"
                  />

                  <h4 className="font-semibold text-neutral-900">
                    {user?.handle}
                  </h4>
                  <p className="text-sm text-neutral-500">
                    {post?.createdAt &&
                      formatDistanceToNow(post?.createdAt, { addSuffix: true })}
                  </p>
                </div>

                {/*dấu 3 chấm */}
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
              <p className="mt-2 text-lg text-neutral-600">{post.question}</p>

              {/* code  */}
              {/* Chỉ hiển thị MonacoEditor nếu có code */}
              {post.code.code && (
                <MonacoEditor
                  className="h-[300px]"
                  value={post.code.code}
                  theme="vs-dark"
                  language={post.code.fileType}
                  options={{ readOnly: true, domReadOnly: true }}
                />
              )}

              {/* Image */}
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="Post Image"
                  className="w-full h-[500px] object-cover mx-auto mt-4 rounded-lg"
                />
              )}

              {post?.hashtags.map((item) => (
                <span
                  key={post._id}
                  className="text-xs bg-[#4B5563] text-[#F8FAFC] px-2 py-1 mr-1 rounded-md"
                >
                  #{item.name}
                </span>
              ))}

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
                  src="http://localhost:3008/1739160152820-214983997-ech.jpg"
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
          ))
      ) : (
        <p className="text-center text-gray-500">
          Không tìm thấy bài viết nào.
        </p>
      )}

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

export default MainContentMyQuestion;
