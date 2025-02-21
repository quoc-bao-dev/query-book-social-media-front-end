import { getFirstCharacter } from '@/utils/nameUtilts';
import { AvatarFallback, AvatarImage, Avatar as AvatarUI } from '../ui/avatar';

type Props = {
    src: string;
    className?: string;
    fallBack?: string;
};
const Avatar = ({ src, className, fallBack }: Props) => {
    return (
        <AvatarUI className={className}>
            <AvatarImage src={src} />
            {fallBack && (
                <AvatarFallback>{getFirstCharacter(fallBack)}</AvatarFallback>
            )}
        </AvatarUI>
    );
};

export default Avatar;
