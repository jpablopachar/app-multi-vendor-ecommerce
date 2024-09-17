/* eslint-disable no-undef */

import Category from '../../models/category.js'
import Product from '../../models/product.js'
import { responseReturn } from '../../utils/response.js'

export class HomeController {
  formatProduct = (products) => {
    const productsTemp = []

    let i = 0

    while (i < products.length) {
      let temp = []
      let j = i

      while (j < i + 3) {
        if (products[j]) temp = [...temp, products[j]]

        j++
      }

      productsTemp.push([...temp])

      i = j
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
      const products = await Product.find({}).limit(12).sort({ createdAt: -1 })

      const allProduct1 = await Product.find({})
        .limit(9)
        .sort({ createdAt: -1 })

      const latestProduct = this.formatProduct(allProduct1)

      const allProduct2 = await Product.find({}).limit(9).sort({ rating: -1 })

      const topRatedProduct = this.formatProduct(allProduct2)

      const allProduct3 = await Product.find({}).limit(9).sort({ discount: -1 })

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
