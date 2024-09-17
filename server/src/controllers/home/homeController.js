/* eslint-disable no-undef */

import Category from '../../models/category.js'
import Product from '../../models/product.js'
import { QueryProducts } from '../../utils/queryProducts.js'
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

  productPriceRange = async (req, res) => {
    try {
      const priceRange = { low: 0, high: 0 }

      const products = await Product.find({}).limit(9).sort({ createdAt: -1 })

      const latestProduct = this.formatProduct(products)

      const getForPrice = await Product.find({}).sort({ price: 1 })

      if (getForPrice.length > 0) {
        priceRange.high = getForPrice[getForPrice.length - 1].price
        priceRange.low = getForPrice[0].price
      }

      responseReturn(res, 200, { latestProduct, priceRange })
    } catch (error) {
      console.log(error.message)
    }
  }

  queryProducts = async (req, res) => {
    const parPage = 12

    req.query.parPage = parPage

    try {
      const products = await Product.find({}).sort({ createdAt: -1 })

      const totalProducts = new QueryProducts(products, req.query)
        .categoryQuery()
        .ratingQuery()
        .searchQuery()
        .priceQuery()
        .sortByPrice()
        .countProducts()

      const result = new QueryProducts(totalProducts, req.query)
        .categoryQuery()
        .ratingQuery()
        .priceQuery()
        .searchQuery()
        .sortByPrice()
        .skip()
        .limit()
        .getProducts()

      responseReturn(res, 200, { products: result, totalProducts, parPage })
    } catch (error) {
      console.log(error.message)
    }
  }
}
