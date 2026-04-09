import type { IDiscount } from "@/entities/discount/types";

interface IDiscountCardProps {
    discount: IDiscount;
}

const DiscountCard = ({ discount }: IDiscountCardProps) => {
    const discountPercent = Math.round(
        ((discount.full_price - discount.price) / discount.full_price) * 100
    );

    return (
        <div className="bg-white/5 backdrop-blur-sm rounded-4xl p-5 border border-white/10 hover:border-orange/50 transition-all">
            {/* Скидка */}
            <div className="text-orange font-bold text-sm mb-2">
                -{discountPercent}%
            </div>

            {/* Период */}
            <div className="text-white text-xl font-bold mb-3">
                {discount.period}
            </div>

            {/* Цены */}
            <div className="mb-3">
                <span className="text-white text-3xl font-bold">
                    {discount.price} ₽
                </span>
                <span className="text-gray-400 line-through text-sm ml-2">
                    {discount.full_price} ₽
                </span>
            </div>

            {/* Текст */}
            <p className="text-gray-300 text-sm">{discount.text}</p>

            {/* Best badge */}
            {discount.is_best && (
                <div className="absolute -top-2 -right-2 bg-orange text-white text-xs px-2 py-1 rounded-full">
                    Хит
                </div>
            )}
        </div>
    );
};

export default DiscountCard;
