import { Timer } from "@features/timer";

export const Header = () => {
    return (
        <div className="ticky-nav bg-header">
            <div className="container mx-auto">
                <Timer />
            </div>
        </div>
    );
};
