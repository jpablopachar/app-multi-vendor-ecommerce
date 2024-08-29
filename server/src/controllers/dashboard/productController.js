/* eslint-disable no-undef */

import { v2 as cloudinary } from 'cloudinary'
import formidable from 'formidable'
import Product from '../../models/product.js'
import { responseReturn } from '../../utils/response.js'

export class ProductController {
  addProduct = async (req, res) => {
    const { id } = req

    const form = formidable({ multiples: true })

    form.parse(req, async (err, field, files) => {
      let {
        name,
        category,
        description,
        stock,
        price,
        discount,
        shopName,
        brand,
      } = field

      const { images } = files

      name = name[0].trim()

      const slug = name.split(' ').join('-')

      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
        secure: true,
      })

      try {
        let allImageUrl = []

        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.uploader.upload(images[i].filepath, {
            folder: 'products',
          })

          allImageUrl = [...allImageUrl, result.url]
        }

        await Product.create({
          sellerId: id,
          name,
          slug,
          shopName,
          category: category.trim(),
          description: description.trim(),
          stock: parseInt(stock),
          price: parseInt(price),
          discount: parseInt(discount),
          images: allImageUrl,
          brand: brand.trim(),
        })

        responseReturn(res, 201, { message: 'Product added successfully' })
      } catch (error) {
        responseReturn(res, 500, { error: error.message })
      }
    })
  }

  getProducts = async (req, res) => {
    const { page, searchValue, parPage } = req.query
    const { id } = req

    const skipPage = parseInt(parPage) * (parseInt(page) - 1)

    try {
      if (searchValue) {
        const products = await Product.find({
          $text: { $search: searchValue },
          sellerId: id,
        })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 })

        const total = await Product.find({
          $text: { $search: searchValue },
          sellerId: id,
        }).countDocuments()

        responseReturn(res, 200, { products, total })
      } else {
        const products = await Product.find({ sellerId: id })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 })

        const total = await Product.find({ sellerId: id }).countDocuments()

        responseReturn(res, 200, { products, total })
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  getProduct = async (req, res) => {
    const { productId } = req.params

    try {
      const product = await Product.findById(productId)

      responseReturn(res, 200, { product })
    } catch (error) {
      console.log(error.message)
    }
  }
}
