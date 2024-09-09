import { useGetListProductsQuery } from '@entities/Product'

import { Loader } from '@shared/ui/Loader'

import { SuppliersTable } from './SuppliersTable'

export const SuppliersPage = () => {
	const { data, isLoading } = useGetListProductsQuery()

	if (isLoading) {
		return (
			<section className='h-full grid place-items-center'>
				<Loader />
			</section>
		)
	}

	return (
		<section className='h-full flex flex-col'>
			<SuppliersTable data={data} />
		</section>
	)
}
