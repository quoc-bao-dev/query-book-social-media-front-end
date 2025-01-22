import { Button } from '@/components/common/Button';
import Image from 'next/image';
type FollowItemProps = {
    avatar: string;
    name: string;
    title: string;
    id: string;
    onFollow: (id: string) => void;
};

const FollowItem = ({ avatar, name, title, id, onFollow }: FollowItemProps) => {
    const handleFollow = () => {
        onFollow(id);
    };
    return (
        <div className=" flex gap-4 w-full ">
            <div className="w-[60px] aspect-square rounded-lg overflow-hidden">
                <Image
                    src={avatar}
                    alt=""
                    width={60}
                    height={60}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="">
                <p className="text-lg font-semibold">{name}</p>
                <p className="text-gray-600">{title}</p>
            </div>
            <div className="ml-auto">
                <Button onClick={handleFollow}>Follow</Button>
            </div>
        </div>
    );
};

export default FollowItem;
