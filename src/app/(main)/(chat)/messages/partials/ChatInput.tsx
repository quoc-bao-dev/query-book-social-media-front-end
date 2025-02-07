'use client';

import SendIcon from '@/components/icons/SendIcon';
import { useMessageSocket } from '@/provider/SocketProvider';
import { useAuth } from '@/store/authSignal';
import { useEffect, useRef } from 'react';
import { sChat } from '../signal/chatSignal';

const ChatInput = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { curMembers, curRoomId } = sChat.use();
    const { user } = useAuth();

    const { socket } = useMessageSocket();
    const handleSendMessage = () => {
        const message = inputRef.current?.value;
        if (!message) return;
        if (!socket) return;
        if (!user) return;

        const sendMessage = ({
            senderId,
            groupId,
            members,
            message,
        }: {
            senderId: string;
            groupId: string;
            members: string[];
            message: string;
        }) => {
            socket?.emit('send_message', {
                senderId,
                groupId,
                members,
                message,
            });
        };
        sendMessage({
            senderId: user?.id,
            groupId: curRoomId,
            members: curMembers.map((m) => m.id),
            message,
        });
        inputRef.current!.value = '';
    };

    const handleEmitTyping = () => {
        if (!socket) return;
        socket.emit('typing', {
            senderId: user?.id,
            groupId: curRoomId,
            members: curMembers.map((m) => m.id),
        });
    };

    useEffect(() => {
        const handleEnter = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        };
        window.addEventListener('keydown', handleEnter);
        return () => {
            window.removeEventListener('keydown', handleEnter);
        };
    }, []);

    return (
        <div className="px-4 h-[60px] flex gap-2 items-center border-t border-gray-300">
            <input
                onChange={handleEmitTyping}
                ref={inputRef}
                type="text"
                className="w-full border border-gray-300 px-4 py-2 rounded-full ring-info-500 outline-info-500"
                placeholder="Type your message"
            />

            <div
                className="p-2 flex justify-center items-center rounded-full hover:bg-gray-200/90 cursor-pointer"
                onClick={handleSendMessage}
            >
                <SendIcon className="text-primary-500" />
            </div>
        </div>
    );
};

export default ChatInput;
