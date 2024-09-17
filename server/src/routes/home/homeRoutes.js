import { Router } from 'express'

import { HomeController } from '../../controllers/home/homeController.js'

const homeController = new HomeController()

export const homeRouter = Router()

homeRouter.get('/get-categories', homeController.getCategories)
homeRouter.get('/get-products', homeController.getProducts)
