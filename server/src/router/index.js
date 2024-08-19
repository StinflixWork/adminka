import { Router } from 'express'
import { body } from 'express-validator'

import UserController from '../controllers/user-controller.js'
import ProductController from '../controllers/product-controller.js'
import { authMiddleware } from '../middlewares/auth-middleware.js'

const router = Router()

router.post('/registration',
	body('email').isEmail(),
	body('password').isLength({ min: 8, max: 32 }),
	UserController.registration
)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)

router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)
router.get('/users', authMiddleware, UserController.getUsers)

// Products
router.post('/create-product', authMiddleware, ProductController.createProduct)
router.get('/products', authMiddleware, ProductController.getProducts)
router.get('/products/:id', authMiddleware, ProductController.getProductById)
router.delete('/products/:id', authMiddleware, ProductController.deleteProduct)
router.put('/products/:id', authMiddleware, ProductController.editProduct)
router.patch('/products/:id', authMiddleware, ProductController.toggleFavourite)

export default router
