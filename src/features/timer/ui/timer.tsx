import { useEffect, useRef, useState } from "react";

export const Timer = () => {
    const [time, setTime] = useState(120);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTime((prev) => {
                if (prev < 1) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const isBlinking = time <= 30 && time > 0;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const timeString = `${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
    const getTimeColor = () => {
        if (time === 0) return "text-white";
        if (time <= 30) return "text-red-500";
        return "text-white";
    };
    return (
        <div className="text-center py-2">
            <p className="text-white text-2xl font-bold">
                Успейте открыть пробную неделю
            </p>
            <p
                className={`text-4xl ${getTimeColor()} ${isBlinking ? "animate-pulse" : ""}`}
            >
                <span>+</span> {timeString} <span>+</span>
            </p>
        </div>
    );
};
