import { getFirstCharacter } from '@/utils/nameUtilts';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import Tooltip from '../common/Tooltip';

type SearchResultRowProps = {
    id: string;
    avatar?: string;
    name: string;
    title: string;
    email: string;
    onClick?: () => void;
};
const SearchResultRow = ({
    id,
    avatar,
    name,
    title,
    email,
    onClick,
}: SearchResultRowProps) => {
    return (
        <Link href={`/${id}`}>
            <div
                className="flex gap-2 p-2 rounded-lg hover:bg-gray-200/60 cursor-pointer"
                onClick={onClick}
            >
                <Avatar className="h-[48px] w-[48px] rounded-lg">
                    <AvatarImage src={avatar} className="object-cover " />
                    <AvatarFallback>{getFirstCharacter(name)}</AvatarFallback>
                </Avatar>
                <Tooltip content={email}>
                    <div className="">
                        <h3 className="font-semibold text-neutral-800/90 ">
                            {name}
                        </h3>
                        <p className="text-sm text-neutral-600/70 ">{title}</p>
                    </div>
                </Tooltip>
            </div>
        </Link>
    );
};

export default SearchResultRow;
