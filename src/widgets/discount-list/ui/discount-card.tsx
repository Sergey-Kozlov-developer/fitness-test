import type { IDiscount } from "@/entities/discount/types";
import { cn } from "@/shared/lib/utils";
import type { ReactNode } from "react";

interface IDiscountCardProps {
    discount: IDiscount;
    className?: ReactNode;
}

const DiscountCard = ({ discount, className }: IDiscountCardProps) => {
    const discountPercent = Math.round(
        ((discount.full_price - discount.price) / discount.full_price) * 100
    );

    return (
        <div
            className={cn(
                "bg-white/5 backdrop-blur-sm rounded-4xl p-5 border border-white/10 hover:border-orange/50 transition-all",
                className
            )}
        >
            {/* Скидка */}
            <div className="mb-2 text-sm font-bold text-orange">
                -{discountPercent}%
            </div>

            {/* Для карточки "Навсегда" - горизонтальное расположение */}
            {discount.is_best ? (
                <>
                    <div className="flex items-center justify-between gap-10">
                        {/* Левая часть: период и цены */}
                        <div className="">
                            <div className="mb-3 text-xl font-bold text-white">
                                {discount.period}
                            </div>
                            <div className="flex flex-col mb-3">
                                <span className="text-5xl font-bold text-orange">
                                    {discount.price} ₽
                                </span>
                                <span className="text-2xl text-gray-400 line-through text-end">
                                    {discount.full_price} ₽
                                </span>
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
                    <div className="absolute px-2 py-1 text-xs text-white rounded-full -top-2 -right-2 bg-orange">
                        Хит
                    </div>
                </>
            ) : (
                <div className="w-60">
                    {/* Период */}
                    <div className="mb-3 text-xl font-bold text-white">
                        {discount.period}
                    </div>

                    {/* Цены */}
                    <div className="flex flex-col mb-3 px-9">
                        <span className="text-5xl font-bold text-white">
                            {discount.price} ₽
                        </span>
                        <span className="text-2xl text-center text-gray-400 line-through">
                            {discount.full_price} ₽
                        </span>
                    </div>

                    {/* Текст */}
                    <p className="text-[16px] text-gray-300">{discount.text}</p>
                </div>
            )}
        </div>
    );
};

export default DiscountCard;
