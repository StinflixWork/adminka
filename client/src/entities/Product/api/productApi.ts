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
		deleteProduct: build.mutation<{ message: string }, string>({
			query: id => ({
				url: `api/products/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: [GET_PRODUCTS]
		}),
		editProduct: build.mutation<{ message: string }, { id: string; product: ProductResource }>({
			query: ({ id, product }) => ({
				url: `api/products/${id}`,
				method: 'PUT',
				body: product
			}),
			invalidatesTags: [GET_PRODUCTS]
		}),
		getListProducts: build.query<ProductResponse[], void>({
			query: () => 'api/products',
			providesTags: [GET_PRODUCTS]
		}),
		toggleFavourites: build.mutation<void, string>({
			query: id => ({
				url: `api/products/${id}`,
				method: 'PATCH'
			}),
			invalidatesTags: [GET_PRODUCTS]
		})
	})
})

export const {
	useGetListProductsQuery,
	useCreateProductMutation,
	useDeleteProductMutation,
	useEditProductMutation,
	useToggleFavouritesMutation
} = productApi
