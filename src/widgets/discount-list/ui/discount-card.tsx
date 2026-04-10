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

            {/* Период */}
            <div className="mb-3 text-xl font-bold text-white">
                {discount.period}
            </div>

            {/* Цены */}
            <div className="mb-3">
                <span className="text-3xl font-bold text-white">
                    {discount.price} ₽
                </span>
                <span className="ml-2 text-sm text-gray-400 line-through">
                    {discount.full_price} ₽
                </span>
            </div>

            {/* Текст */}
            <p className="text-sm text-gray-300">{discount.text}</p>

            {/* Best badge */}
            {discount.is_best && (
                <div className="absolute px-2 py-1 text-xs text-white rounded-full -top-2 -right-2 bg-orange">
                    Хит
                </div>
            )}
        </div>
    );
};

export default DiscountCard;
