import { useTimer } from "@/shared/context/timer-context";
import { useEffect, useRef, useState } from "react";

export const Timer = () => {
    const { time } = useTimer();

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
        <div className="py-2 text-center">
            <p className="text-2xl font-bold text-white">
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
