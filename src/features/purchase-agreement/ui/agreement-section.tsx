import { useState } from "react";

interface IAgreementSectionProps {
    isTariffSelected?: boolean;
}

export const AgreementSection = ({
    isTariffSelected,
}: IAgreementSectionProps) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isError, setIsError] = useState(false);

    const handlePurchase = () => {
        if (!isChecked) {
            setIsError(true);
        } else {
            setIsError(false);
        }
    };

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIsChecked(event.target.checked);
        if (isError) setIsError(false);
    };

    return (
        <div className="max-w-2xl mt-12 text-start ">
            <div className={`flex items-center justify-center gap-2 mb-4 `}>
                <input
                    type="checkbox"
                    id="agreement"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className={`
                        w-8 h-8 appearance-none cursor-pointer
                        bg-body rounded border-2 border-gray-600
                        checked:relative
                        checked:after:content-['✓']
                        checked:after:absolute
                        checked:after:text-orange
                        checked:after:text-2xl
                        checked:after:top-1/2
                        checked:after:left-1/2
                        checked:after:-translate-x-1/2
                        checked:after:-translate-y-1/2
                        ${isError ? "rounded border-2 border-red" : ""}
                    `}
                />
                <label htmlFor="agreement" className="text-gray-300">
                    Я согласен с офертой рекуррентных платежей и Политикой
                    конфиденциальности
                </label>
            </div>

            <button
                onClick={handlePurchase}
                className={`max-[375px]:w-72 w-90 py-5 font-bold text-text-button transition-all rounded-[20px] px-15 bg-orange cursor-pointer ${isTariffSelected ? "animate-button" : ""}`}
            >
                Купить
            </button>

            <p className="mt-6 text-xs text-gray-500">
                Нажимая кнопку «Купить», Пользователь соглашается на разовое
                списание денежных средств для получения пожизненного доступа к
                приложению. Пользователь соглашается, что данные
                кредитной/дебетовой карты будут сохранены для осуществления
                покупок дополнительных услуг сервиса в случае желания
                пользователя.
            </p>
        </div>
    );
};
