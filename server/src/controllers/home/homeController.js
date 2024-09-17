/* eslint-disable no-undef */

import Category from '../../models/category.js'
import Product from '../../models/product.js'
import { responseReturn } from '../../utils/response.js'

export class HomeController {
  formatProduct = (products) => {
    const productsTemp = []

    for (let i = 0; i < products.length; i += 3) {
      const chunk = products.slice(i, i + 3)

      productsTemp.push(chunk)
    }

    return productsTemp
  }

  getCategories = async (req, res) => {
    try {
      const categories = await Category.find({})

      responseReturn(res, 200, { categories })
    } catch (error) {
      console.log(error.message)
    }
  }

  getProducts = async (req, res) => {
    try {
      const [products, allProduct1, allProduct2, allProduct3] =
        await Promise.all([
          Product.find({}).limit(12).sort({ createdAt: -1 }),
          Product.find({}).limit(9).sort({ createdAt: -1 }),
          Product.find({}).limit(9).sort({ rating: -1 }),
          Product.find({}).limit(9).sort({ discount: -1 }),
        ])

      const latestProduct = this.formatProduct(allProduct1)

      const topRatedProduct = this.formatProduct(allProduct2)

      const discountProduct = this.formatProduct(allProduct3)

      responseReturn(res, 200, {
        products,
        latestProduct,
        topRatedProduct,
        discountProduct,
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}
