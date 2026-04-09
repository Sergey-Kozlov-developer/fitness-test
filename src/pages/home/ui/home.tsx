import {Header} from "@widgets/header";
import {useGetTariffsQuery} from "@entities/discount/discountApi.ts";

export const Home = () => {

	const {data, isLoading, isError} = useGetTariffsQuery()

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error loading tariffs</div>;

	return (
		<>
			<Header />
			<main className='container'>
				<div>
					<div className='text-amber-200'>
						<h1 className='text-5xl'>hi</h1>
						{data?.map((item) => (
							<div key={item.id}>
								{item.text}
							</div>
						))}
					</div>
				</div>
			</main>
		</>
	);
};
