import type { IDiscount } from "@/entities/discount/types";

interface IDiscountCardProps {
    discount: IDiscount;
}

const DiscountCard = ({ discount }: IDiscountCardProps) => {
    return (
        <>
            <div className="col-span-2">
                <div className="flex">
                    <div>
                        <p>{discount.period}</p>
                        <p>{discount.price}</p>
                        <p>{discount.full_price}</p>
                    </div>
                    <div>
                        <p>{discount.text}</p>
                    </div>
                </div>
            </div>
            <div className="col-span-2 row-span-2">45</div>
        </>
    );
};

export default DiscountCard;
