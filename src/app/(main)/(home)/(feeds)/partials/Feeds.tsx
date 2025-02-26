import Avatar from '@/components/common/Avatar';
import PlusIcon from '@/components/icons/PlusIcon';
import { useStoryQuery } from '@/queries/story';
import { useAuth } from '@/store/authSignal';
import { useModalCreateFeed } from './ModalCreateFeed';
import { useListImageDetail } from '../signal/listImageDetail';

const Feeds = () => {
  const { user } = useAuth();
  const { open } = useModalCreateFeed();
  // const { showModal, setImages, setCurIndex } = useListImageDetail();
  const { showModal, setImages, setCurIndex } = useListImageDetail();

  // Query dữ liệu từ sever
  const { data } = useStoryQuery();

  const stories = data?.data.data;

  const showCreateFeed = () => {
    open();
  };

  const showDetail = (image: string) => () => {
    setImages([image]);
    setCurIndex(0);
    showModal();
  };

  // useEffect(() => {
  //   setImages(stories?.map((item) => `/images/${item.image}`));
  // }, [feed, setImages]);

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
          <p className='font-semibold text-gray-50 absolute bottom-1 left-[50%] translate-x-[-50%]'>
            Tạo tin
          </p>
        </div>
      </div>

      {stories?.map((item, index) => (
        <div
          key={index}
          onClick={showDetail(item.mediaUrl)}
          className='w-[115px] h-[204px] rounded-xl bg-slate-200 relative flex justify-center '
        >
          <Avatar
            src={item.mediaUrl}
            className='h-full w-full rounded-xl object-cover'
            fallBack={user?.fullName}
          />

          <div className=' absolute top-2 left-2 border-[5px] border-primary-500 rounded-[50%]'>
            <Avatar
              src={item.author.avatarUrl}
              className='w-[40px] h-[40px] rounded-[50%] object-cover'
              fallBack={user?.fullName}
            />
          </div>
          <div className='absolute bottom-2 left-2'>
            <p className='font-semibold text-gray-50'>{item.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feeds;
