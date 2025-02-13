'use client';
import { useEffect, useRef } from "react";

type AutoResizeTextareaProps = {
    onchange: () => void;
};

const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({ onchange }) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, []);

    const handleInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    return (
        <textarea

            ref={textareaRef}
            id="auto-resize-textarea"
            className="border-none w-full break-words px-4 py-3 focus:outline-none overflow-hidden resize-none rounded-lg"
            placeholder="Nguyễn ơi, bạn đang nghĩ gì?"
            onInput={handleInput}
            onChange={onchange}
        ></textarea>
    );
};

export default AutoResizeTextarea;