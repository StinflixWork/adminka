import { CreateProductForm } from './CreateProductForm'
import { ProductList } from './ProductList'

export const ProductsPage = () => {
	return (
		<section className='h-full flex flex-col gap-y-10'>
			<CreateProductForm />
			<ProductList />
		</section>
	)
}
