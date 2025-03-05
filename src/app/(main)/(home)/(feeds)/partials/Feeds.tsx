import Avatar from '@/components/common/Avatar';
import PlusIcon from '@/components/icons/PlusIcon';
import { useStoryQuery } from '@/queries/story';
import { useAuth } from '@/store/authSignal';
import { useEffect, useState } from 'react';
import { useListImageDetailFeed } from '../signal/listImageDeltaiFeed';
import { useModalCreateFeed } from './ModalCreateFeed';

const Feeds = () => {
  //Tạo State groupStories
  const [groupedStories, setGroupedStories] = useState<
    {
      userId: string;
      userName: string;
      avatarUrl: string;
      images: string[];
    }[]
  >([]);

  const { user } = useAuth();
  const { open } = useModalCreateFeed();
  // const { showModal, setImages, setCurIndex } = useListImageDetail();
  const { showModal, setImages, setCurIndex } = useListImageDetailFeed();

  // Query dữ liệu từ sever
  const { data } = useStoryQuery();
  // Lấy dữ liệu gán vào biến stories
  const stories = data?.data.data;

  // console.log('stories', groupedStories);

  // Tạo groupStories
  useEffect(() => {
    if (stories) {
      let index = 0;

      const result: {
        userId: string;
        userName: string;
        avatarUrl: string;
        images: string[];
      }[] = [];

      const strGroups: { [key: string]: number | undefined } = {};

      stories.forEach((story) => {
        const userId = story.author.id;
        const findUserIndex = strGroups[userId];
        // Nếu strGroup chưa tồn tại thì tạo mảng rỗng
        if (Number.isNaN((findUserIndex as number) + 1) && !strGroups[userId]) {
          strGroups[userId] = index;
          result[index] = {
            userId: story.author.id,
            userName: story.author.name,
            avatarUrl: story.author.avatarUrl,
            images: [],
          };
          index += 1;
        }

        const userIndex = strGroups[userId] as number;

        const image = story.mediaUrl;
        // Result tại vị trí index userIndex thì push với image
        result[userIndex!].images.push(image);
      });
      setGroupedStories(result);
    }
  }, [stories]);

  console.log('groupedStories', groupedStories);

  const showCreateFeed = () => {
    open();
  };

  const showDetail = (images: string[]) => () => {
    setImages(images);
    setCurIndex(0);
    showModal();
  };

  return (
    <div className='w-full flex gap-2 items-center'>
      <div
        onClick={showCreateFeed}
        className='w-[115px] h-[204px] rounded-xl relative flex justify-center '
      >
        <Avatar
          src={user?.avatarUrl}
          className='h-full w-full rounded-xl'
          fallBack={user?.fullName}
        />

        <div className='absolute top-2 left-2 border-[4px] border-primary-500 rounded-[50%]'>
          <Avatar
            src={user?.avatarUrl}
            className='w-[40px] h-[40px] rounded-[50%] object-cover'
            fallBack={user?.fullName}
          />
        </div>

        <div className='w-full bg-primary-600 absolute bottom-0 rounded-b-xl h-[50px] '>
          <div className='w-[40px] h-[40px] rounded-[50%] bg-primary-500 flex justify-center items-center absolute bottom-7 left-[50%] translate-x-[-50%]'>
            <div className='w-[30px] h-[30px] rounded-[50%] bg-primary-600 flex justify-center items-center'>
              <PlusIcon className='size-6 fill-card' />
            </div>
          </div>
          <p className='font-semibold text-gray-200 text-[12px] absolute bottom-1 left-[50%] translate-x-[-50%]'>
            Tạo tin
          </p>
        </div>
      </div>
      {groupedStories
        .sort((_, b) => (b.userId === user?.id ? 1 : -1))
        .map((item, index) => (
          <div
            key={index}
            onClick={showDetail(item.images)}
            className='w-[115px] h-[204px] rounded-xl bg-slate-200 relative flex justify-center '
          >
            <Avatar
              src={item.images[0]}
              className='h-full w-full rounded-xl object-cover'
              fallBack={item.userName}
            />

            <div className=' absolute top-2 left-2 border-[4px] border-primary-500 rounded-[50%]'>
              <Avatar
                src={item.avatarUrl}
                className='w-[40px] h-[40px] rounded-[50%] object-cover'
                fallBack={item.userName}
              />
            </div>
            <div className='absolute bottom-2 left-2'>
              <p className='font-semibold text-gray-200 text-[12px]'>
                {item.userName}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Feeds;
