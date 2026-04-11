import { Header } from "@widgets/header";
import { DiscountList } from "@/widgets/discount-list";

export const Home = () => {
    return (
        <>
            <Header />
            <main className="container mx-auto mt-12 max-lg:px-4">
                <div className="w-full max-w-304 mx-auto">
                    <DiscountList />
                </div>
            </main>
        </>
    );
};
