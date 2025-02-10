import CommentIcon from '@/components/icons/CommentIcon';
import HeartIcon from '@/components/icons/HeartIcon';
import ShareIcon from '@/components/icons/ShareIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useLikeMutation } from '@/queries/like';
import { useAuth } from '@/store/authSignal';
import { PostResponse } from '@/types/post';
import { getFirstCharacter } from '@/utils/nameUtilts';
import { formatDistanceToNow, parseISO } from 'date-fns';
import PostComment from './PostComment';
import PostImage from './PostImage';
import Image from 'next/image';

// FIXME: fix interface of post

interface PostProps {
    post: Pick<
        PostResponse,
        'id' | 'author' | 'content' | 'hashTags' | 'mediaUrls' | 'createdAt' | 'likesCount' | 'likes' | 'comments'
    >;
}
const Post = ({ post }: PostProps) => {
    const { user } = useAuth()
    const { mutateAsync: likePost } = useLikeMutation()

    // Chuyển đổi chuỗi thành đối tượng Date
    const date = parseISO(post.createdAt);

    // Tính toán khoảng cách thời gian từ thời điểm cụ thể đến hiện tại
    const distance = formatDistanceToNow(date, { addSuffix: true });

    const isLiked = post.likes.some((like) => like.id === user?.id);

    const handleLike = () => { likePost(post.id) };


    return (
        <div className="w-full gap-5 border rounded-xl px-4 py-4 bg-card">
            <div className="px-8 pt-8 pb-4">
                <div className="flex justify-between">
                    <div className="">
                        <Avatar>
                            <AvatarImage src={post.author?.avatarUrl} />
                            <AvatarFallback>
                                {getFirstCharacter(post.author.fullName)}
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="text-left w-full px-4">
                        <div className="">{post.author.fullName}</div>
                        <div className="text-gray-600">{distance}</div>
                    </div>

                    <div className="">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                            />
                        </svg>
                    </div>
                </div>

                <div className="pt-4">
                    <p className=" whitespace-pre-line">{post.content}</p>
                </div>
            </div>

            <div className="relative">
                <PostImage lsImage={post.mediaUrls} />
            </div>

            <div className="grid grid-cols-2 border-b-[1px]">
                <div className="flex px-8 py-4 items-center">
                    <div onClick={handleLike}>
                        {!isLiked ? <HeartIcon /> : <HeartIcon className="fill-error-500 stroke-error-500" />}
                    </div>
                    <div className="px-2">{post.likesCount}</div>
                    <div className="w-full">
                        <div className="flex items-center ">
                            {post.likes.sort((a,) => a.id !== user?.id ? 1 : -1).map((like, index) => (
                                <Avatar key={like.id} className={cn("w-[25px] h-[25px] object-cover", {
                                    "-ml-3": index > 0,
                                    "rounded-[50%] z-30": index === 0
                                })}>
                                    <AvatarImage src={like.avatarUrl} />
                                    <AvatarFallback>
                                        <p className="text-xs">{getFirstCharacter(like.name)}</p>
                                    </AvatarFallback>
                                </Avatar>
                            ))}
                            <div className="">
                                {post.likes.sort((a,) => a.id !== user?.id ? 1 : -1).map((like) => (
                                    <p className="text-xs" key={like.id}> {like.name}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex text-neutral-500 justify-end px-8 py-4 gap-3">
                    <CommentIcon />
                    <ShareIcon />
                </div>
            </div>

            {/* comment */}
            {post.comments.map((comment) => (
                <div className="" key={comment.id}>
                    <div className="flex py-1">
                        {/* user comment */}
                        <div className="flex justify-center">
                            <Avatar className="w-[40px] h-[40px] rounded-[50%]">
                                <AvatarImage src={comment.avatarUrl} />
                                <AvatarFallback>
                                    {getFirstCharacter(comment?.fullName ?? '')}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        {/* show comment */}
                        <div className="w-auto h-auto">
                            <div className="bg-gray-50 rounded-lg ml-3 py-2 px-3">
                                <div className="text-neutral-900 ">
                                    <p className="font-normal">{comment.fullName}</p>
                                </div>

                                <div className="text-gray-900"> {comment.content}</div>
                            </div>

                            <div className="py-1 pl-[12px]">
                                <Image src={comment.mediaUrl!} alt="" className="max-h-[150px] w-auto rounded-lg" width={1000} height={1000} />
                            </div>

                            <div className="flex justify-end items-center px-3 gap-5 text-neutral-600 py-1 text-[14px] font-medium">
                                <div className="">Xóa</div>
                                <div className="">Trả lời</div>
                            </div>
                        </div>
                    </div>
                    {/* delete & rep comment */}

                </div>

            ))}
            <PostComment postId={post.id} />
            {/* comment */}
        </div>
    );
};

export default Post;
