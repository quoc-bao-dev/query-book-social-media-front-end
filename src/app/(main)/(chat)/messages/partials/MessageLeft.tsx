import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getFirstCharacter } from "@/utils/nameUtilts"

type Props = {
    avatar: string
    content: string
    name: string
}
const MessageLeft = ({ avatar, content, name }: Props) => {
    return (
        <div className="flex gap-2 max-w-[450px]">
            <Avatar className="size-[40px]">
                <AvatarImage src={avatar} />
                <AvatarFallback>{getFirstCharacter(name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex flex-col gap-1">
                <p className="text-primary-foreground py-2 px-3 bg-primary-500 rounded-lg w-fit">
                    {content}
                </p>
            </div>
        </div>
    )
}

export default MessageLeft