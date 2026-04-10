import { useGetTariffsQuery } from "@/entities/discount/discountApi";
import { AgreementSection } from "@/features/purchase-agreement";
import { cn } from "@/shared/lib/utils";
import DiscountCard from "@/widgets/discount-list/ui/discount-card";
import manImg from "@assets/images/man.png";
import { useMemo } from "react";

export const DiscountList = () => {
    const { data, isLoading, isError } = useGetTariffsQuery();

    const sortedData = useMemo(() => {
        if (!data) return [];
        return [...data].sort((a, b) => Number(b.is_best) - Number(a.is_best));
    }, [data]);

    const bestTariff = sortedData[0]?.is_best ? sortedData[0] : null;
    const otherTariffs = useMemo(() => {
        const filtered = sortedData.filter((item) => !item.is_best);
        const order: Record<string, number> = {
            "3 месяца": 0,
            "1 месяц": 1,
            "1 неделя": 2,
        };
        return [...filtered].sort((a, b) => order[a.period] - order[b.period]);
    }, [sortedData]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading tariffs</div>;

    return (
        <div className="flex gap-21.75 mt-8">
            <img src={manImg} alt="Man" className="object-contain w-96 h-191" />
            <div className="space-y-4 w-187">
                {bestTariff && (
                    <DiscountCard
                        discount={bestTariff}
                        className="pl-30.5 pr-20 pt-8.5 pb-6.5"
                    />
                )}
                <div className="grid grid-cols-3 gap-4">
                    {otherTariffs.map((item) => (
                        <DiscountCard key={item.id} discount={item} />
                    ))}
                </div>
                <div
                    className={cn(
                        "flex gap-2 py-4.5 px-5 w-[65%]",
                        "bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-orange/50 transition-all"
                    )}
                >
                    <span className="text-orange">!</span>
                    <p>
                        Следуя плану на 3 месяца и более, люди получают
                        <br />в 2 раза лучший результат, чем за 1 месяц
                    </p>
                </div>
                <AgreementSection />
            </div>
        </div>
    );
};
