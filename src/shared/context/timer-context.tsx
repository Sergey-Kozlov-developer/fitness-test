import { createContext, useContext, useEffect, useRef, useState } from "react";

interface TimerContextType {
    isTimerActive: boolean;
    time: number;
}

const TimerContext = createContext<TimerContextType>({
    isTimerActive: true,
    time: 120,
});

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
    const [isTimerActive, setIsTimerActive] = useState(true);
    const [time, setTime] = useState(120);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (!isTimerActive) return;

        intervalRef.current = setInterval(() => {
            setTime((prev) => {
                if (prev <= 1) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    setIsTimerActive(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isTimerActive]);

    return (
        <TimerContext.Provider value={{ isTimerActive, time }}>
            {children}
        </TimerContext.Provider>
    );
};

export const useTimer = () => useContext(TimerContext);
