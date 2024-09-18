import { Router } from 'express'

import { OrderController } from '../../controllers/order/orderController.js'

const orderController = new OrderController()

export const orderRouter = Router()

orderRouter.post('/place-order', orderController.placeOrder)
orderRouter.post('/add-to-wishList', orderController.addWishList)

orderRouter.get('/get-card-products/:userId', orderController.getCardProducts)
orderRouter.get('/get-wishlist-products/:userId', orderController.getWishList)

orderRouter.put('/quantity-inc/:cardId', orderController.quantityIncrement)
orderRouter.put('/quantity-dec/:cardId', orderController.quantityDecrement)

orderRouter.delete(
  '/delete-card-product/:cardId',
  orderController.deleteCardProducts
)
orderRouter.delete(
  '/remove-wishlist-product/:wishlistId',
  orderController.removeWishList
)