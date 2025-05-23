import { useEffect, useRef } from 'react';

export const useChatScroll = (dep: unknown[]) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [...dep]);

    return ref;
};
