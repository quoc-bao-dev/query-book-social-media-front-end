import { NotifyType } from '@/types/notify';
import FriendRequestRow from './FriendRequestRow';

type Props = {
    notify: NotifyType;
};
const NotifyRow = ({ notify }: Props) => {
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
        return (
            <div className="px-3 py-2 rounded-sm bg-card flex items-center justify-between text-neutral-900/70">
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
