import type { IDiscount } from "@/entities/discount/types";
import { useTimer } from "@/shared/context/timer-context";
import { cn } from "@/shared/lib/utils";
import type { ReactNode } from "react";

interface IDiscountCardProps {
    discount: IDiscount;
    className?: ReactNode;
    isSelected?: boolean;
    onSelect?: () => void;
}

const DiscountCard = ({
    discount,
    className,
    isSelected,
    onSelect,
}: IDiscountCardProps) => {
    const { isTimerActive, time } = useTimer();
    const discountPercent = Math.round(
        ((discount.full_price - discount.price) / discount.full_price) * 100
    );

    const currentPrice = isTimerActive ? discount.price : discount.full_price;
    const getText = () => {
        if (discount.is_best) {
            return window.innerWidth <= 412
                ? "Всегда быть в форме"
                : discount.text;
        }
        return discount.text;
    };

    return (
        <div
            onClick={onSelect}
            className={cn(
                "bg-white/5 backdrop-blur-sm rounded-4xl border border-white/10 hover:border-orange/50 transition-all relative cursor-pointer",
                isSelected ? "border-orange" : "",
                className
            )}
        >
            {isTimerActive && (
                <div
                    className={cn(
                        "absolute top-0 mb-2 text-sm font-bold text-white bg-red py-1.25 px-2 rounded-b-md",
                        "right-9 lg:left-12.75 lg:right-auto"
                    )}
                >
                    -{discountPercent}%
                </div>
            )}

            {discount.is_best ? (
                <>
                    <div className="flex items-center justify-between gap-10">
                        <div>
                            <div className="mb-3 text-xl font-bold text-center text-white ">
                                {discount.period}
                            </div>
                            <div className="flex flex-col mb-3">
                                <span className="text-5xl font-bold text-orange">
                                    {currentPrice} ₽
                                </span>
                                {isTimerActive && (
                                    <span
                                        className={`text-2xl line-through transition-all duration-500 ${
                                            time <= 30 && time > 0
                                                ? "text-red-500 animate-pulse"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        {discount.full_price} ₽
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex-1">
                            <p className="text-[16px] text-gray-300">
                                {getText()}
                            </p>
                        </div>
                    </div>
                    <div
                        className={cn(
                            "absolute text-2xl text-orange top-2.5 right-5 max-lg:top-3.5",
                            ""
                        )}
                    >
                        ХИТ!
                    </div>
                </>
            ) : (
                <div className="w-full lg:w-60">
                    <div className="flex flex-row items-center justify-between gap-4 lg:flex-col lg:items-start xl:items-stretch lg:gap-0">
                        <div className="text-left lg:text-center">
                            <div className="mt-8 mb-3 text-xl font-bold text-white">
                                {discount.period}
                            </div>
                            <div className="flex flex-col mb-3">
                                <span className="text-5xl font-bold text-white">
                                    {currentPrice} ₽
                                </span>
                                {isTimerActive && (
                                    <span
                                        className={`text-2xl text-gray-400 line-through ${time <= 30 && time > 0 ? "text-red-500 animate-pulse" : "text-gray-400"}`}
                                    >
                                        {discount.full_price} ₽
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 lg:text-start xl:text-center">
                            <p className="text-[16px] text-gray-300">
                                {discount.text}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DiscountCard;
