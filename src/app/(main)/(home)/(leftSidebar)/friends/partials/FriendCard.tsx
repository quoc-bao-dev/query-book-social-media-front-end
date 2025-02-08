import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Button } from '@/components/common/Button';
import { getFirstCharacter } from '@/utils/nameUtilts';

type FriendCardProps = {
    id: string;
    cover: string;
    fullName: string;
    avatar: string;
    title: string;
    followers: number;
    following: number;
};

const FriendCard = ({
    avatar,
    fullName,
    id,
    title,
    followers,
    following,
}: FriendCardProps) => {
    const handleClick = () => {
        console.log(id);
    };
    return (
        <article className=" bg-gray-400/30 rounded-md">
            <Image
                src="/images/that.png"
                alt=""
                width={400}
                height={400}
                className="w-full h-[140px] object-cover rounded-md"
            />
            <div className="relative">
                <div className="absolute left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <Avatar className="h-[140px] w-[140px] object-cover border-4 border-card">
                        <AvatarImage src={avatar} />
                        <AvatarFallback>
                            <p>{getFirstCharacter(fullName)}</p>
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <div className="p-5 pt-[80px] text-center">
                <p className="font-semibold text-lg">{fullName}</p>
                <p className="text-neutral-900/60">{title}</p>
                <div className="flex justify-center ">
                    <div className="grid grid-cols-2 mt-3">
                        <div className="px-6 border-r border-gray-400">
                            <p className="font-semibold text-2xl">
                                {followers}
                            </p>
                            <p className="text-neutral-900/60">Followers</p>
                        </div>
                        <div className="px-6">
                            <p className="font-semibold text-2xl">
                                {following}
                            </p>
                            <p className="text-neutral-900/60">Following</p>
                        </div>
                    </div>
                </div>
                <Button onClick={handleClick} className="w-full mt-6">
                    Message
                </Button>
            </div>
        </article>
    );
};

export default FriendCard;
