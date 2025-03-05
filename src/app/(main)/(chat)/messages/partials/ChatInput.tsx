'use client';

import ImageIcon from '@/components/icons/ImageIcon';
import SendIcon from '@/components/icons/SendIcon';
import { useMessageSocket } from '@/provider/SocketProvider';
import { useAuth } from '@/store/authSignal';
import { Message, RoomChatResponse } from '@/types/chat';
import { uploadImages } from '@/utils/uploadUtils';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { sChat } from '../signal/chatSignal';
import { sChatImageInput } from '../signal/imageInputSignal';

const ChatInput = () => {
  const [images, setImages] = useState<File[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const { curMembers, curRoomId } = sChat.use();
  const { user } = useAuth();

  const { socket } = useMessageSocket();

  const queriClient = useQueryClient();

  const addImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.click();

    input.onchange = () => {
      const files = input.files;
      if (!files) return;
      setImages((pre) => [...pre, ...Array.from(files)]);
    };
  };
  const removeImage = (index: number) => () => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
  const handleSendMessage = async () => {
    const message = inputRef.current?.value;

    if (!message && message?.trim().length === 0 && images?.length === 0)
      return;

    if (!socket) return;

    if (!user) return;

    const messageTemp: Message = {
      _id: Math.random().toString(),
      senderId: user.id,
      content: message || '',
      images: images.map((i) => URL.createObjectURL(i)),
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    };

    queriClient.setQueryData<RoomChatResponse[]>(['roomChat'], (data) => {
      const dataTemp = data
        ?.map((room) => {
          if (room._id === curRoomId) {
            return {
              ...room,
              lastMessage: message
                ? [
                    {
                      _id: Math.random().toString(),
                      senderId: user.id,
                      content: message,
                      createdAt: Date.now().toString(),
                    },
                  ]
                : [],
              updatedAt: new Date().toISOString(),
            };
          }
          return room;
        })
        .sort((a, b) => {
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        });

      return dataTemp;
    });

    queriClient.setQueryData<Message[]>(['message', curRoomId], (data) => {
      return data ? [...data, messageTemp] : [messageTemp];
    });

    inputRef.current!.value = '';
    setImages([]);

    let lsImages: string[] | undefined = undefined;
    if (images.length > 0) {
      const files = await uploadImages(images);
      lsImages = files?.files.map((f) => f.filename);
    }

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
        images: lsImages,
      });
    };

    sendMessage({
      senderId: user?.id,
      groupId: curRoomId,
      members: curMembers.map((m) => m.id),
      message: message!,
    });
  };

  const handleSeenMessage = () => {
    if (!socket) return;
    socket.emit('seen_message', { userId: user?.id, roomChatId: curRoomId });
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
    sChatImageInput.set({ hasImage: images.length > 0 });
  }, [images]);

  useEffect(() => {
    if (!socket) return;
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSendMessage();
      }
    };
    window.addEventListener('keydown', handleEnter);
    return () => {
      window.removeEventListener('keydown', handleEnter);
    };
  }, [socket, handleSendMessage]);

  return (
    <div className='px-4 bg-neutral-100/50'>
      {images.length > 0 && (
        <div className='flex  gap-3 py-2 px-2 h-[130px] w-full overflow-x-auto'>
          {images.map((image, index) => (
            <div
              key={index}
              className='size-[114px] col-span-2 relative bg-card rounded-lg  group'
            >
              <img
                src={URL.createObjectURL(image)}
                alt={`Image ${index}`}
                className='w-full aspect-square object-cover rounded-lg'
              />
              <div
                onClick={removeImage(index)}
                className='cursor-pointer absolute -top-2 -right-2  size-5  justify-center items-center bg-black/50 text-white rounded-full hidden group-hover:flex'
              >
                x
              </div>
            </div>
          ))}
        </div>
      )}
      <div className=' h-[60px] flex gap-2 items-center border-t border-gray-300'>
        <input
          onFocus={handleSeenMessage}
          onChange={handleEmitTyping}
          ref={inputRef}
          type='text'
          className='w-full border border-gray-300 px-4 py-2 rounded-full ring-info-500 outline-info-500'
          placeholder='Type your message'
        />
        <div
          className='p-2 flex justify-center items-center rounded-full hover:bg-gray-200/90 cursor-pointer'
          onClick={addImage}
        >
          <ImageIcon className='text-primary-500' />
        </div>
        <div
          className='p-2 flex justify-center items-center rounded-full hover:bg-gray-200/90 cursor-pointer'
          onClick={handleSendMessage}
        >
          <SendIcon className='text-primary-500' />
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
