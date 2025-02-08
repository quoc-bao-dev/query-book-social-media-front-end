import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getFirstCharacter } from "@/utils/nameUtilts"

type MessageLeftProps = {
    avatar: string
    content: string
    name: string
}
const MessageRight = ({ avatar, content, name }: MessageLeftProps) => {
    return (
        <div className="flex w-full">
            <div className="ml-auto flex gap-2 max-w-[450px]">
                <div className="flex-1 flex flex-col gap-1">
                    <p className="text-neutral-800 py-2 px-3 bg-neutral-200/40 rounded-lg ">
                        {content}
                    </p>
                </div>
                <Avatar className="size-[40px]">
                    <AvatarImage src={avatar} />
                    <AvatarFallback>{getFirstCharacter(name)}</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}

export default MessageRight