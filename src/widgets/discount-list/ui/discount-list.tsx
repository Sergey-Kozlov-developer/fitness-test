import { useGetTariffsQuery } from "@/entities/discount/discountApi";
import { AgreementSection } from "@/features/purchase-agreement";
import { cn } from "@/shared/lib/utils";
import DiscountCard from "@/widgets/discount-list/ui/discount-card";
import manImg from "@assets/images/man.png";
import { useMemo, useState } from "react";

export const DiscountList = () => {
    const { data, isLoading, isError } = useGetTariffsQuery();
    const [selected, setSelected] = useState<string | null>(null);

    const sortedData = useMemo(() => {
        if (!data) return [];
        // исправление одинакого id приходящего по API
        // генерируем уникальный id
        const uniqueData = data.map((item) => ({
            ...item,
            id:
                item.period === "Навсегда" && item.id === data[2]?.id
                    ? `${item.id}-unique`
                    : item.id,
        }));

        return uniqueData.sort((a, b) => Number(b.is_best) - Number(a.is_best));
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
        <div className="flex flex-col gap-8 lg:gap-21.75 mt-8">
            <h1 className="font-bold text-white mb-27.5 text-xl min-[375px]:text-2xl lg:text-4xl text-center lg:text-left">
                Выбери подходящий для себя
                <span className="text-orange"> тариф</span>
            </h1>

            <div className="flex flex-col gap-21.5 lg:flex-row justify-center">
                <img
                    src={manImg}
                    alt="Man"
                    className="object-contain w-full h-auto lg:w-96 lg:h-191"
                />
                <div className="w-full space-y-4 lg:w-187">
                    {bestTariff && (
                        <DiscountCard
                            discount={bestTariff}
                            className="lg:pl-30.5 lg:pr-20 pt-8.5 pb-6.5"
                            isSelected={selected === bestTariff.id}
                            onSelect={() => setSelected(bestTariff.id)}
                        />
                    )}

                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                        {otherTariffs.map((item) => (
                            <DiscountCard
                                key={item.id}
                                discount={item}
                                isSelected={selected === item.id}
                                onSelect={() => setSelected(item.id)}
                                className="px-4"
                            />
                        ))}
                    </div>
                    <div
                        className={cn(
                            "flex gap-2 py-4.5 px-5 w-full lg:w-[65%]",
                            "bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-orange/50 transition-all"
                        )}
                    >
                        <span className="text-orange">!</span>
                        <p>
                            Следуя плану на 3 месяца и более, люди получают
                            <br />в 2 раза лучший результат, чем за 1 месяц
                        </p>
                    </div>
                    <AgreementSection isTariffSelected={!!selected} />
                </div>
            </div>
            <div className="border border-down-border rounded-4xl p-4 sm:p-7.5">
                <button className="mb-7.5 text-green rounded-4xl border border-green px-4 sm:px-7.5 py-2 sm:py-4 text-xl sm:text-3xl">
                    гарантия возврата 30 дней
                </button>
                <p className="text-base leading-6 sm:text-2xl sm:leading-8 text-warranty">
                    Мы уверены, что наш план сработает для тебя и ты увидишь
                    видимые результаты уже через 4 недели! Мы даже готовы
                    полностью вернуть твои деньги в течение 30 дней с момента
                    покупки, если ты не получишь видимых результатов.
                </p>
            </div>
        </div>
    );
};
