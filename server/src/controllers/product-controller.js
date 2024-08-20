import ProductService from "../services/product-service.js"

class ProductController {
	async createProduct(req, res, next) {
		try {
			const product = req.body
			await ProductService.createProduct(product)

			return res.json({message: 'Продукт створений'})
		} catch (e) {
			next(e)
		}
	}

	async deleteProduct(req, res, next) {
		try {
			const id = req.params.id;
			const productTitle = await ProductService.deleteProduct(id)

			return res.json({message: `Продукт ${productTitle} успішно видален`})
		} catch (e) {
			next(e)
		}
	}

	async editProduct(req, res, next) {
		try {
			const id = req.params.id;
			const product = req.body

			await ProductService.editProduct(id, product)

			return res.json({message: `Продукт успішно змінено`})
		} catch (e) {
			next(e)
		}
	}

	async getProducts(req, res, next) {
		try {
			const products = await ProductService.getListProducts();

			return res.json(products)
		} catch (e) {
			next(e)
		}
	}

	async getProductById(req, res, next) {
		try {
			const id = req.params.id;
			const product = await ProductService.getProduct(id);

			return res.json(product)
		} catch (e) {
			next(e)
		}
	}


	async toggleFavourite(req, res, next) {
		try {
			const id = req.params.id;
			await ProductService.toggleFavourite(id);

			return res.json({message: 'Поле успішно змінено'})
		} catch (e) {
			next(e)
		}
	}
}

export default new ProductController()
