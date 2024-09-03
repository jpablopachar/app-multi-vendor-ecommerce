/* eslint-disable no-undef */

import { compare, hash } from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import formidable from 'formidable'
import Admin from '../../models/admin.js'
import SellerCustomers from '../../models/chat/seller-customer.js'
import Seller from '../../models/seller.js'
import { responseReturn } from '../../utils/response.js'
import { createToken } from '../../utils/tokenCreate.js'

export class AuthController {
  adminLogin = async (req, res) => {
    const { email, password } = req.body

    try {
      const admin = await Admin.findOne({ email }).select('+password')

      if (admin) {
        const match = await compare(password, admin.password)

        if (match) {
          const token = createToken({ id: admin.id, role: admin.role })

          res.cookie('accessToken', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          })

          responseReturn(res, 200, { token, message: 'Login successful' })
        } else {
          responseReturn(res, 401, { error: 'Invalid password' })
        }
      } else {
        responseReturn(res, 404, { error: 'Email not found' })
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message })
    }
  }

  sellerLogin = async (req, res) => {
    const { email, password } = req.body

    try {
      const seller = await Seller.findOne({ email }).select('+password')

      if (seller) {
        const match = await compare(password, seller.password)

        if (match) {
          const token = createToken({ id: seller.id, role: seller.role })

          res.cookie('accessToken', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          })

          responseReturn(res, 200, { token, message: 'Login successful' })
        } else {
          responseReturn(res, 401, { error: 'Invalid password' })
        }
      } else {
        responseReturn(res, 404, { error: 'Email not found' })
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message })
    }
  }

  sellerRegister = async (req, res) => {
    const { email, name, password } = req.body

    try {
      const user = await Seller.findOne({ email })

      if (user) {
        responseReturn(res, 400, { error: 'Email already registered' })
      } else {
        const seller = await Seller.create({
          name,
          email,
          password: await hash(password, 10),
          method: 'local',
          shopInfo: {},
        })

        await SellerCustomers.create({ myId: seller.id })

        const token = createToken({ id: seller.id, role: seller.role })

        res.cookie('accessToken', token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })

        responseReturn(res, 201, { token, message: 'Register successful' })
      }
    } catch {
      responseReturn(res, 500, { error: 'Internal Server Error' })
    }
  }

  getUser = async (req, res) => {
    const { id, role } = req

    try {
      if (role === 'admin') {
        const user = await Admin.findById(id)

        responseReturn(res, 200, { userInfo: user })
      } else {
        const seller = await Seller.findById(id)

        responseReturn(res, 200, { userInfo: seller })
      }
    } catch {
      responseReturn(res, 500, { error: 'Internal Server Error' })
    }
  }

  profileImageUpload = async (req, res) => {
    const { id } = req

    const form = formidable({ multiples: true })

    form.parse(req, async (err, _, files) => {
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
        secure: true,
      })

      const { image } = files

      try {
        const result = await cloudinary.uploader.upload(image[0].filepath, {
          folder: 'profile',
        })

        if (result) {
          await Seller.findByIdAndUpdate(id, { image: result.url })

          const userInfo = await Seller.findById(id)

          responseReturn(res, 201, {
            message: 'Profile image upload successfully',
            userInfo,
          })
        } else {
          responseReturn(res, 404, { error: 'Image upload failed' })
        }
      } catch (error) {
        responseReturn(res, 500, { error: error.message })
      }
    })
  }

  profileInfoAdd = async (req, res) => {
    const { division, district, shopName, sub_district } = req.body
    const { id } = req

    try {
      await Seller.findByIdAndUpdate(id, {
        shopInfo: {
          division,
          district,
          shopName,
          sub_district,
        },
      })

      const userInfo = await Seller.findById(id)

      responseReturn(res, 200, {
        message: 'Profile info add successful',
        userInfo,
      })
    } catch (error) {
      responseReturn(res, 500, { error: error.message })
    }
  }

  logout = async (req, res) => {
    try {
      res.cookie('accessToken', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })

      responseReturn(res, 200, { message: 'Logout successful' })
    } catch (error) {
      responseReturn(res, 500, { error: error.message })
    }
  }
}
