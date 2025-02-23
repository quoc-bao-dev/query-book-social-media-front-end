import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getFirstCharacter } from '@/utils/nameUtilts';

type Props = {
  avatar: string;
  content: string;
  name: string;
  images?: string[];
};
const MessageLeft = ({ avatar, content, name, images }: Props) => {
  return (
    <div className='flex gap-2 max-w-[450px]'>
      <Avatar className='size-[40px]'>
        <AvatarImage src={avatar} />
        <AvatarFallback>{getFirstCharacter(name)}</AvatarFallback>
      </Avatar>
      <div className='flex-1 flex flex-col gap-1'>
        {content && content !== '' && (
          <p className='text-primary-foreground py-2 px-3 bg-primary-500 rounded-lg w-fit'>
            {content}
          </p>
        )}
        {images && images.length > 0 && (
          <div className='flex gap-2'>
            {images.map((img) => (
              <div key={img} className='aspect-square rounded-lg bg-card'>
                <img
                  className='size-[100px] object-cover aspect-square rounded-lg'
                  src={img}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageLeft;
