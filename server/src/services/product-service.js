import  ProductModel from '../models/product-model.js'
import { ApiError } from '../exceptions/api-error.js'

class ProductService {
	async createProduct(product) {
		const isProductFound = await ProductModel.find({title: product.title})

		if (isProductFound.length > 0) {
			throw ApiError.BadRequest(`Продукт ${product.title} вже існує`)
		}

		await ProductModel.create(product)
	}

	async deleteProduct(id) {
		const result = await ProductModel.findByIdAndDelete(id);

		return result.title
	}

	async editProduct(id, product) {
		await ProductModel.findOneAndUpdate({_id: id}, product)
	}

	async getListProducts() {
		const products = await ProductModel.find({})
		return products
	}

	async getProduct(id) {
		const product = await ProductModel.findOne({_id: id})
		return product
	}

	async toggleFavourite(id) {
		const product = await ProductModel.findOne({_id: id})
		product.isFavourite = !product.isFavourite
		await product.save()

		return product
	}
}

export default new ProductService()
