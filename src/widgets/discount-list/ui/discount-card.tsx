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
    const priceColor =
        time <= 30 && time > 0 ? "text-red-500 animate-pulse" : "text-gray-400";
    const cardLayout = !discount.is_best
        ? "flex xl:flex-col items-center md:gap-10 xl:gap-4"
        : "flex items-center justify-between gap-10";

    const discountPosition = discount.is_best
        ? "max-[375px]:justify-end justify-between max-[375px]:gap-5"
        : "justify-end min-[375px]:justify-start";

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
                "bg-white/5 backdrop-blur-sm max-sm:px-5.5 rounded-4xl border border-white/10 hover:border-orange/50 transition-all cursor-pointer",
                "px-5.25 pt-17.5 pb-6.5",
                isSelected && "border-orange",
                className,
                cardLayout,
                "max-[375px]:flex-row max-[375px]:items-center xl:items-center gap-12.5"
            )}
        >
            <div>
                <div
                    className={cn(
                        `text-sm min-[375px]:text-[16px] md:text-2xl font-bold text-white xl:text-center `,
                        discount.is_best ? "xl:pb-4" : "xl:pb-7.5"
                    )}
                >
                    {discount.period}
                </div>
                <div
                    className={cn(
                        "text-3xl min-[375px]:text-[34px] lg:text-5xl font-bold xl:text-center inline-flex items-baseline",
                        discount.is_best ? "text-orange" : "text-white"
                    )}
                >
                    {currentPrice}
                    <span className="text-3xl min-[375px]:text-[34px] lg:text-5xl ml-3">
                        ₽
                    </span>
                </div>
                {isTimerActive && (
                    <div
                        className={cn(
                            "text-sm sm:text-[16px] md:text-2xl line-through xl:text-end min-[320px]:text-end",
                            priceColor
                        )}
                    >
                        {discount.full_price} ₽
                    </div>
                )}
            </div>

            <p className="text-sm sm:text-[16px] text-gray-300 xl:text-start">
                {getText()}
            </p>
            <div
                className={cn(
                    "absolute top-0 left-12.75 right-7.5 sm:right-0 flex items-start px-5",
                    discountPosition
                )}
            >
                {isTimerActive && (
                    <div className="bg-red text-white text-sm font-bold px-2 py-1 rounded-b-md">
                        -{discountPercent}%
                    </div>
                )}
                {discount.is_best && (
                    <div className="text-orange text-[13px] sm:text-[16px] md:text-2xl pt-2.5 min-[375px]:ml-auto">
                        ХИТ!
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiscountCard;
