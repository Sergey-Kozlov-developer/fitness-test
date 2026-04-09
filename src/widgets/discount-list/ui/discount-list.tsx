import { useGetTariffsQuery } from "@/entities/discount/discountApi";
import DiscountCard from "@/widgets/discount-list/ui/discount-card";
import manImg from "@assets/images/man.png";

export const DiscountList = () => {
    const { data, isLoading, isError } = useGetTariffsQuery();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading tariffs</div>;

    return (
        <div className="grid grid-cols-2 gap-6 mt-8">
            {/* Левая колонка с изображением */}
            <div className="relative">
                <img
                    src={manImg}
                    alt="Man training"
                    className="w-96 object-cover"
                />
            </div>

            {/* Правая колонка с карточками */}
            <div className="grid grid-cols-2 gap-4">
                {data?.map((item) => (
                    <DiscountCard key={item.id} discount={item} />
                ))}
            </div>
        </div>
    );
};
