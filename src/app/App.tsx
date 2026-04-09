import {useGetTariffsQuery} from "@entities/discount/discountApi.ts";

function App() {

	const {data, isLoading, isError} = useGetTariffsQuery()

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error loading tariffs</div>;

	return (
		<div className='text-amber-200'>
			<h1 className='text-5xl'>hi</h1>
			{data?.map((item) => (
				<div key={item.id}>
					{item.text}
				</div>
			))}
		</div>
	)
}

export default App
