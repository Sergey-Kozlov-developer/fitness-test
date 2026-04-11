import { Header } from "@widgets/header";
import { DiscountList } from "@/widgets/discount-list";

export const Home = () => {
    return (
        <>
            <Header />
            <main className="container mx-auto mt-12 max-lg:px-4">
                {/* <h1 className="font-bold text-white mb-27.5 text-xl min-[375px]:text-2xl lg:text-4xl">
                    Выбери подходящий для себя
                    <span className="text-orange"> тариф</span>
                </h1> */}

                <DiscountList />
            </main>
        </>
    );
};
