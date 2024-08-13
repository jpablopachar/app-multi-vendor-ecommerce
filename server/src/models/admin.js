import { Schema, model } from 'mongoose'

/**
 * @openapi
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - image
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del administrador
 *         email:
 *           type: string
 *           description: Correo electrónico del administrador
 *         password:
 *           type: string
 *           description: Contraseña del administrador
 *         image:
 *           type: string
 *           description: URL de la imagen del administrador
 *         role:
 *           type: string
 *           description: Rol del administrador
 *           default: admin
 */
const adminSchema = new Schema({
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
  },
  image: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'admin',
  },
})

export default model('Admin', adminSchema)
