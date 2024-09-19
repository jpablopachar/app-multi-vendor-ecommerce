/* eslint-disable no-undef */

import { v2 as cloudinary } from 'cloudinary'
import formidable from 'formidable'
import { Types } from 'mongoose'
import AuthorOrders from '../../models/author-orders'
import Banner from '../../models/banner'
import AdminSellerMessage from '../../models/chat/admin-seller-message'
import SellerCustomerMessage from '../../models/chat/seller-customer-message'
import Customer from '../../models/customer'
import CustomerOrders from '../../models/customer-orders'
import Product from '../../models/product'
import Seller from '../../models/seller'
import SellerWallets from '../../models/seller-wallets'
import ShopWallets from '../../models/shop-wallets'
import { responseReturn } from '../../utils/response'

export class DashboardController {
  getAdminDashboardData = async (req, res) => {
    try {
      const [
        totalSale,
        totalProducts,
        totalOrders,
        totalSellers,
        messages,
        recentOrders,
      ] = await Promise.all([
        ShopWallets.aggregate([
          {
            $group: {
              _id: null,
              totalAmount: { $sum: '$amount' },
            },
          },
        ]),
        Product.countDocuments(),
        Customer.countDocuments(),
        Seller.countDocuments(),
        AdminSellerMessage.find().sort({ createdAt: -1 }).limit(3),
        CustomerOrders.find().sort({ createdAt: -1 }).limit(5),
      ])

      responseReturn(res, 200, {
        totalProducts,
        totalOrders,
        totalSellers,
        messages,
        recentOrders,
        totalSale: totalSale.length > 0 ? totalSale[0].totalAmount : 0,
      })
    } catch (error) {
      responseReturn(res, 500, { error: error.message })
    }
  }

  getSellerDashboardData = async (req, res) => {
    const { id } = req
    try {
      const sellerObjectId = new Types.ObjectId(id)

      const [
        totalSale,
        totalProducts,
        totalOrders,
        totalPendingOrders,
        messages,
        recentOrders,
      ] = await Promise.all([
        SellerWallets.aggregate([
          {
            $match: { sellerId: sellerObjectId },
          },
          {
            $group: {
              _id: null,
              totalAmount: { $sum: '$amount' },
            },
          },
        ]),
        Product.countDocuments({ sellerId: sellerObjectId }),
        AuthorOrders.countDocuments({ sellerId: sellerObjectId }),
        AuthorOrders.countDocuments({
          sellerId: sellerObjectId,
          deliveryStatus: 'pending',
        }),
        SellerCustomerMessage.find({
          $or: [{ senderId: sellerObjectId }, { receiverId: sellerObjectId }],
        }).limit(3),
        AuthorOrders.find({ sellerId: sellerObjectId })
          .sort({ createdAt: -1 })
          .limit(5),
      ])

      responseReturn(res, 200, {
        totalProducts,
        totalOrders,
        totalPendingOrders,
        messages,
        recentOrders,
        totalSale: totalSale.length > 0 ? totalSale[0].totalAmount : 0,
      })
    } catch (error) {
      responseReturn(res, 500, { error: error.message })
    }
  }

  addBanner = async (req, res) => {
    const form = formidable({ multiples: true })

    form.parse(req, async (err, field, files) => {
      const { productId } = field
      const { mainban } = files

      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
        secure: true,
      })

      try {
        const { slug } = Product.findById(productId)
        const result = await cloudinary.uploader.upload(mainban[0].filepath, {
          folder: 'banners',
        })
        const banner = await Banner.create({
          productId,
          banner: result.url,
          link: slug,
        })

        responseReturn(res, 200, {
          message: 'Banner added successfully',
          banner,
        })
      } catch (error) {
        responseReturn(res, 500, { error: error.message })
      }
    })
  }
}
