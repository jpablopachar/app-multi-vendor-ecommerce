import { Router } from 'express'

import { CustomerAuthController } from '../../controllers/home/customerAuthController.js'

const customerAuthController = new CustomerAuthController()

export const customerAuthRouter = Router()

customerAuthRouter.get('/customer-register', customerAuthController.customerRegister)
customerAuthRouter.get('/customer-login', customerAuthController.customerLogin)
customerAuthRouter.get('/logout', customerAuthController.customerLogout)