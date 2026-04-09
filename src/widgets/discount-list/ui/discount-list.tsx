import { useGetTariffsQuery } from "@/entities/discount/discountApi";
import DiscountCard from "@/widgets/discount-list/ui/discount-card";
import manImg from "@assets/images/man.png";

export const DiscountList = () => {
    const { data, isLoading, isError } = useGetTariffsQuery();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading tariffs</div>;
    return (
        <div className="grid grid-flow-col grid-rows-3 gap-4">
            <img src={manImg} alt="" className="row-span-3 w-96" />
            {data?.map((item) => (
                <DiscountCard discount={item} />
            ))}
        </div>
    );
};
