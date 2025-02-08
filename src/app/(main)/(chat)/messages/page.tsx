import Chat from './partials/Chat';
import ChatHeader from './partials/ChatHeader';
import ChatInput from './partials/ChatInput';
import ChatSideBarLeft from './partials/ChatSideBarLeft';
import ChatSideBarRight from './partials/ChatSideBarRight';

export const metadata = {
    title: 'Messages',
    description: 'Welcome to Query Book!',
};

const Page = () => {
    return (
        <div className="flex relative w-full">
            {/* sidebar */}
            <ChatSideBarLeft />
            {/* sidebar */}

            {/* main */}
            <div className="flex-1 h-[calc(100vh-var(--header-height))]">
                {/* header */}
                <ChatHeader />
                {/* header */}

                {/* body */}
                <Chat />
                {/* body */}

                {/* input */}
                <ChatInput />
                {/* input */}
            </div>
            {/* main */}

            {/* sidebar */}
            <div className="hidden lg:contents">
                <ChatSideBarRight />
            </div>
            {/* sidebar */}
        </div>
    );
};

export default Page;
