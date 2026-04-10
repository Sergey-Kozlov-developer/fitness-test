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
    const { isTimerActive } = useTimer();
    const discountPercent = Math.round(
        ((discount.full_price - discount.price) / discount.full_price) * 100
    );

    return (
        <div
            onClick={onSelect}
            className={cn(
                "bg-white/5 backdrop-blur-sm rounded-4xl p-5 border border-white/10 hover:border-orange/50 transition-all relative cursor-pointer",
                isSelected ? "border-orange" : "",
                className
            )}
        >
            {/* Скидка */}
            {isTimerActive && (
                <div
                    className={`absolute top-0 left-12.75 mb-2 text-sm font-bold text-white bg-red py-1.25 px-2 rounded-b-md rounded-bl-md transition-all duration-500 ${isTimerActive ? "opacity-100" : "opacity-0 hidden"}`}
                >
                    -{discountPercent}%
                </div>
            )}

            {/* Для карточки "Навсегда" - горизонтальное расположение */}
            {discount.is_best ? (
                <>
                    <div className="flex items-center justify-between gap-10">
                        {/* Левая часть: период и цены */}
                        <div>
                            <div className="mb-3 text-xl font-bold text-center text-white ">
                                {discount.period}
                            </div>
                            <div className="flex flex-col mb-3">
                                <span className="text-5xl font-bold text-orange">
                                    {discount.price} ₽
                                </span>
                                {isTimerActive && (
                                    <span
                                        className={`text-2xl text-gray-400 line-through transition-all duration-500 ${isTimerActive ? "opacity-100" : "opacity-0 hidden"}`}
                                    >
                                        {discount.full_price} ₽
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Правая часть: текст */}
                        <div className="flex-1">
                            <p className="text-[16px] text-gray-300">
                                {discount.text}
                            </p>
                        </div>
                    </div>
                    {/* Best badge */}
                    <div className="absolute text-2xl text-orange top-2.5 right-5">
                        ХИТ!
                    </div>
                </>
            ) : (
                <div className="w-60">
                    {/* Период */}
                    <div className="mt-8 mb-3 text-xl font-bold text-center text-white">
                        {discount.period}
                    </div>

                    {/* Цены */}
                    <div className="flex flex-col mb-3 px-9">
                        <span className="text-5xl font-bold text-white">
                            {discount.price} ₽
                        </span>
                        {isTimerActive && (
                            <span
                                className={`text-2xl text-gray-400 line-through transition-all duration-500 ${isTimerActive ? "opacity-100" : "opacity-0 hidden"}`}
                            >
                                {discount.full_price} ₽
                            </span>
                        )}
                    </div>

                    {/* Текст */}
                    <p className="text-[16px] text-gray-300">{discount.text}</p>
                </div>
            )}
        </div>
    );
};

export default DiscountCard;
