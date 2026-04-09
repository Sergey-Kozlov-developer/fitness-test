export interface IDiscount {
	id: string;
	period: string;
	price: number;
	full_price: number;
	is_best: boolean;
	text: string;
}
export type TDiscountResponse = IDiscount[];