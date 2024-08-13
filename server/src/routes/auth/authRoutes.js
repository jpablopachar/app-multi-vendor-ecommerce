import { Router } from 'express'
import { AuthController } from '../../controllers/auth/authController.js'
import { authMiddleware } from '../../middlewares/authMiddleware.js'

const authController = new AuthController()

export const authRouter = Router()

/**
 * @openapi
 * /get-user:
 *   get:
 *     summary: Retrieve user information
 *     description: Returns the authenticated user's information.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user's ID
 *                 name:
 *                   type: string
 *                   description: The user's name
 *                 email:
 *                   type: string
 *                   description: The user's email address
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
authRouter.get('/get-user', authMiddleware, authController.getUser)
authRouter.get('/logout', authMiddleware, authController.logout)

authRouter.post('/admin-login', authController.adminLogin)
authRouter.post('/seller-register', authController.sellerRegister)
authRouter.post('/seller-login', authController.sellerLogin)
authRouter.post('/profile-info-add', authMiddleware, authController.profileInfoAdd)
