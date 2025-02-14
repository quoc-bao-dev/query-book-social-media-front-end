import PostCreate from "@/app/(main)/(home)/(feeds)/partials/PostCreate";
import PostContent from "./partials/PostContent";

const Page = () => {
  return (
    <div className="">
      <div className="h-auto w-[680px] mt-1">
        {/* From create Post */}
        <PostCreate />
        {/* From create Post */}
        <PostContent />
      </div>
      {/* posts */}
    </div>
  );
};

export default Page;
