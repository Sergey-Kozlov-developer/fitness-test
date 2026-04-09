import {baseApi} from "@shared/api/baseApi.ts";
import type {IDiscount, TDiscountResponse} from "@entities/discount/types.ts";


export const discountApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getTariffs: builder.query<TDiscountResponse, void>({
			query: () => '/GetTariffs',
			transformResponse: (response: string) => {
				return JSON.parse(response) as IDiscount[];
			},

		}),
	})
})

export const {
	useGetTariffsQuery,
} = discountApi;