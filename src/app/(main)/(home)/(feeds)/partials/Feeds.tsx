import PlusIcon from "@/components/icons/PlusIcon";
import { useStoryQuery } from "@/queries/story";
import { useAuth } from "@/store/authSignal";
import Image from "next/image";
import { useListFeedDetail } from "../signal/listFeedDetail";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getFirstCharacter } from "@/utils/nameUtilts";

const Feeds = () => {
  const { user } = useAuth();
  const { showModal, setCurIndex, setImages } = useListFeedDetail();

  const { data } = useStoryQuery();

  const stories = data?.data.data;

  const showFeedDetail = (index: number) => () => {
    setCurIndex(index);
    showModal();
  };

  // useEffect(() => {
  //   setImages(stories?.map((item) => `/images/${item.image}`));
  // }, [feed, setImages]);

  return (
    <div className="w-full flex gap-2 justify-between items-center">
      <div className="w-[115px] h-[204px] rounded-xl bg-slate-200 relative flex justify-center ">
        <Avatar>
          <AvatarImage
            src={user?.avatarUrl}
            className="h-full w-full rounded-xl"
          />
          <AvatarFallback>
            {getFirstCharacter(user?.fullName ?? "")}
          </AvatarFallback>
        </Avatar>
        <div className="absolute top-2 left-2 border-[5px] border-primary-500 rounded-[50%]">
          <Image
            src={`/images/that.png`}
            alt=""
            width={100}
            className="w-[40px] h-[40px] rounded-[50%] object-cover"
            height={0}
          />
        </div>

        <div className="w-full bg-primary-600 absolute bottom-0 rounded-b-xl h-[50px] ">
          <div className="w-[40px] h-[40px] rounded-[50%] bg-primary-500 flex justify-center items-center absolute bottom-7 left-[50%] translate-x-[-50%]">
            <div className="w-[30px] h-[30px] rounded-[50%] bg-primary-600 flex justify-center items-center">
              <PlusIcon className="size-6 fill-card" />
            </div>
          </div>
          <p className="font-semibold text-gray-50 absolute bottom-1 left-[50%] translate-x-[-50%]">
            Tạo tin
          </p>
        </div>
      </div>

      {stories?.map((item, index) => (
        <div
          onClick={showFeedDetail(index)}
          key={index}
          className="w-[153px] h-[204px] rounded-xl relative"
        >
          <Image
            src={`/images/${item.image}`}
            alt=""
            className="w-full h-full rounded-xl object-cover"
            width={500}
            height={0}
          />
          <div className=" absolute top-2 left-2 border-[5px] border-primary-500 rounded-[50%]">
            <Image
              src={`/images/${item.image}`}
              alt=""
              width={100}
              className="w-[40px] h-[40px] rounded-[50%] object-cover"
              height={0}
            />
          </div>
          <div className="absolute bottom-2 left-2">
            <p className="font-semibold text-gray-50">{item.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feeds;
