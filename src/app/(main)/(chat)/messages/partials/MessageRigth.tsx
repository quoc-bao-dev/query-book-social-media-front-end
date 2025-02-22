import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getFirstCharacter } from '@/utils/nameUtilts';

type MessageLeftProps = {
  avatar: string;
  content: string;
  name: string;
  images?: string[];
};
const MessageRight = ({ avatar, content, name, images }: MessageLeftProps) => {
  return (
    <div className='flex w-full'>
      <div className='ml-auto flex gap-2 max-w-[450px]'>
        <div className='flex-1 flex flex-col gap-1'>
          {content && content !== '' && (
            <p className='text-neutral-800 py-2 px-3 bg-neutral-200/40 rounded-lg '>
              {content}
            </p>
          )}
          {images && images.length > 0 && (
            <div className='grid grid-cols-3 gap-2 justify-items-end grid-flow-col ml-auto'>
              {images.map((img) => (
                <div
                  key={img}
                  className='w-full  aspect-square rounded-lg bg-card'
                >
                  <img className=' aspect-square rounded-lg' src={img} />
                </div>
              ))}
            </div>
          )}
        </div>
        <Avatar className='size-[40px]'>
          <AvatarImage src={avatar} />
          <AvatarFallback>{getFirstCharacter(name)}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default MessageRight;
