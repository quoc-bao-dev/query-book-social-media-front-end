import { NotifyType } from '@/types/notify';
import FriendRequestRow from './FriendRequestRow';
import { isValidDate, toDuration } from '@/utils/date';
import Avatar from '../common/Avatar';
import Link from 'next/link';
import { useNotifyDrawer } from './NotifyDrawer';

type Props = {
    notify: NotifyType;
};
const NotifyRow = ({ notify }: Props) => {
    const { close } = useNotifyDrawer();
    const FollowNotify = ({
        userId,
        avatar,
        createdAt,
        message,
        name,
    }: {
        userId: string;
        avatar: string;
        name: string;
        message: string;
        createdAt: string;
    }) => {
        return (
            <Link href={`/${userId}`} onClick={close}>
                <div className="py-2  px-3  rounded-sm bg-card text-neutral-900/70 hover:bg-neutral-100 cursor-pointer">
                    <div className=" flex items-center gap-4">
                        <Avatar
                            className="size-[40px]"
                            src={avatar}
                            fallBack={name}
                        />
                        <div>
                            <p className="font-semibold">{message}</p>
                            {isValidDate(createdAt) && (
                                <p className="mt-2 text-neutral-900/30">
                                    {toDuration(createdAt)}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        );
    };

    const AcceptNotify = ({
        userId,
        avatar,
        createdAt,
        message,
        name,
    }: {
        userId: string;
        avatar: string;
        name: string;
        message: string;
        createdAt: string;
    }) => {
        return (
            <Link href={`/${userId}`} onClick={close}>
                <div className="py-2  px-3  rounded-sm bg-card text-neutral-900/70 hover:bg-neutral-100 cursor-pointer">
                    <div className=" flex items-center gap-4">
                        <Avatar
                            className="size-[40px]"
                            src={avatar}
                            fallBack={name}
                        />
                        <div>
                            <p className="font-semibold">{message}</p>
                            {isValidDate(createdAt) && (
                                <p className="mt-2 text-sm text-neutral-900/30">
                                    {toDuration(createdAt)}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        );
    };

    if (notify.type === 'friend_request') {
        return (
            <FriendRequestRow
                avatar={notify.avatarUrl!}
                name={notify.fullName}
                id={notify.id}
                createdAt={notify.createdAt}
            />
        );
    }

    if (notify.type === 'relationship') {
        if (notify.relationType === 'follow') {
            return (
                <FollowNotify
                    userId={notify.senderId?._id!}
                    avatar={notify.senderId?.avatarUrl}
                    name={notify.senderId?.fisrtName}
                    createdAt={notify.createdAt}
                    message={notify.message}
                />
            );
        }

        if (notify.relationType === 'accept_request') {
            return (
                <AcceptNotify
                    userId={notify.targetId?._id!}
                    avatar={notify.targetId?.avatarUrl}
                    name={notify.targetId?.fisrtName}
                    createdAt={notify.createdAt}
                    message={notify.message}
                />
            );
        }
        return (
            <div className="px-3 py-2 rounded-sm bg-card flex items-center justify-between text-neutral-900/70 hover:bg-neutral-100">
                <p className="text-sm font-semibold">{notify.message}</p>
                <div className="py-1 px-2 rounded-sm text-xs font-semibold text-gray-50 bg-neutral-900/70">
                    {notify.createdAt}
                </div>
            </div>
        );
    }
    return <div>NotifyRow</div>;
};

export default NotifyRow;
