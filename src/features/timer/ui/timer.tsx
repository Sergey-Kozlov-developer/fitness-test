import { useTimer } from "@/shared/context/timer-context";

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
            <p className="text-white font-bold px-4 sm:px-0 text-[14px] min-[375px]:text-base lg:text-2xl">
                Успейте открыть пробную неделю
            </p>
            <p
                className={`text-2xl sm:text-3xl md:text-4xl ${getTimeColor()} ${isBlinking ? "animate-pulse" : ""}`}
            >
                <span>+</span> {timeString} <span>+</span>
            </p>
        </div>
    );
};
