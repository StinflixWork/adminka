import { api } from '@shared/api/api.ts'
import { GET_PRODUCTS } from '@shared/api/tags.ts'

import { ProductResource, ProductResponse } from './types.ts'

const productApi = api.injectEndpoints({
	endpoints: build => ({
		createProduct: build.mutation<{ message: string }, ProductResource>({
			query: product => ({
				url: 'api/create-product',
				method: 'POST',
				body: product
			}),
			invalidatesTags: [GET_PRODUCTS]
		}),
		getListProducts: build.query<ProductResponse[], void>({
			query: () => 'api/products',
			providesTags: [GET_PRODUCTS]
		})
	})
})

export const { useGetListProductsQuery, useCreateProductMutation } = productApi
