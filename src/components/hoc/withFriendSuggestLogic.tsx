import { ComponentType } from 'react';

export type WithFriendSuggestLogicProps = {
    userId: string;
    onSendRequest: () => void;
    onRemove: () => void;
    isFriend: boolean;
};

const withFriendSuggestLogic = <
    P extends Omit<
        WithFriendSuggestLogicProps,
        'onSendRequest' | 'onRemove' | 'isFriend'
    >
>(
    WrapCmp: ComponentType<P & WithFriendSuggestLogicProps>
) => {
    const EnhancedComponent = (props: P) => {
        const addFriend = () => {
            console.log('[add friend] userId: ', props.userId);
        };
        const remove = () => {
            console.log('[remove friend] userId: ', props.userId);
        };

        const isFriend = true;

        return (
            <WrapCmp
                {...props}
                onRemove={addFriend}
                onSendRequest={remove}
                isFriend={isFriend}
            />
        );
    };

    return EnhancedComponent;
};

export default withFriendSuggestLogic;
