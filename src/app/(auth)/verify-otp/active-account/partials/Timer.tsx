'use client';

import { useEffect, useRef, useState } from 'react';

const Timer = () => {
    const [time, setTime] = useState(60 * 5);
    const intervalRef = useRef<NodeJS.Timeout>(null);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime === 0) {
                    clearInterval(intervalRef.current as NodeJS.Timeout);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(intervalRef.current as NodeJS.Timeout);
    }, []);
    return (
        <div className="text-2xl font-bold">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
    );
};

export default Timer;
