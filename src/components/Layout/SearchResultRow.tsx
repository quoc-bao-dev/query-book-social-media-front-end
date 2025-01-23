import { getFirstCharacter } from '@/utils/nameUtilts';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type SearchResultRowProps = {
    avatar?: string;
    name: string;
    title: string;
    onClick?: () => void;
};
const SearchResultRow = ({
    avatar,
    name,
    title,
    onClick,
}: SearchResultRowProps) => {
    return (
        <div
            className="flex gap-2 p-2 rounded-lg hover:bg-gray-200/60 cursor-pointer"
            onClick={onClick}
        >
            <Avatar className="h-[48px] w-[48px] rounded-lg">
                <AvatarImage src={avatar} className="object-cover " />
                <AvatarFallback>{getFirstCharacter(name)}</AvatarFallback>
            </Avatar>
            <div className="">
                <h3 className="font-semibold text-neutral-800/90 ">{name}</h3>
                <p className="text-sm text-neutral-600/70 ">{title}</p>
            </div>
        </div>
    );
};

export default SearchResultRow;
