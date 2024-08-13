import { Schema, model } from 'mongoose'

/**
 * @openapi
 * components:
 *   schemas:
 *     Seller:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - method
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the seller
 *         email:
 *           type: string
 *           description: The email address of the seller
 *         password:
 *           type: string
 *           description: The password of the seller (not selected by default)
 *           select: false
 *         role:
 *           type: string
 *           description: The role of the user, default is 'seller'
 *           default: seller
 *         status:
 *           type: string
 *           description: The status of the seller, default is 'pending'
 *           default: pending
 *         payment:
 *           type: string
 *           description: The payment status of the seller, default is 'inactive'
 *           default: inactive
 *         method:
 *           type: string
 *           description: The method used by the seller
 *         image:
 *           type: string
 *           description: The URL of the seller's image
 *           default: ''
 *         shopInfo:
 *           type: object
 *           description: Additional information about the seller's shop
 *           default: {}
 */
const sellerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      default: 'seller',
    },
    status: {
      type: String,
      default: 'pending',
    },
    payment: {
      type: String,
      default: 'inactive',
    },
    method: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    shopInfo: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
)

sellerSchema.index(
  {
    name: 'text',
    email: 'text',
  },
  {
    weights: {
      name: 5,
      email: 4,
    },
  }
)

export default model('Seller', sellerSchema)
