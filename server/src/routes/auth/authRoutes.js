import { Router } from 'express'
import { AuthController } from '../../controllers/auth/authController.js'
import { authMiddleware } from '../../middlewares/authMiddleware.js'

const authController = new AuthController()

export const authRouter = Router()

authRouter.get('/get-user', authMiddleware, authController.getUser)
authRouter.get('/logout', authMiddleware, authController.logout)

authRouter.post('/admin-login', authController.adminLogin)
authRouter.post('/seller-register', authController.sellerRegister)
authRouter.post('/seller-login', authController.sellerLogin)
authRouter.post('/profile-info-add', authMiddleware, authController.profileInfoAdd)
