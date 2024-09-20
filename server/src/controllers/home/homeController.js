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

      const [products, minPriceProduct, maxPriceProduct] = await Promise.all([
        Product.find({}).limit(9).sort({ createdAt: -1 }),
        Product.findOne({}).sort({ price: 1 }),
        Product.findOne({}).sort({ price: -1 }),
      ])

      const latestProduct = this.formatProduct(products)

      if (minPriceProduct && maxPriceProduct) {
        priceRange.low = minPriceProduct.price
        priceRange.high = maxPriceProduct.price
      }

      responseReturn(res, 200, { latestProduct, priceRange })
    } catch (error) {
      console.error(error.message)
    }
  }

  queryProducts = async (req, res) => {
    const parPage = 12

    req.query.parPage = parPage

    try {
      const filteredProducts = new QueryProducts(
        await Product.find({}),
        req.query
      )
        .categoryQuery()
        .ratingQuery()
        .searchQuery()
        .priceQuery()
        .sortByPrice()

      const totalProductsCount = filteredProducts.countProducts()

      const result = filteredProducts.skip().limit().getProducts()

      responseReturn(res, 200, {
        products: result,
        totalProducts: totalProductsCount,
        parPage,
      })
    } catch (error) {
      console.error(error.message)
    }
  }

  productDetails = async (req, res) => {
    const { slug } = req.params;

    if (!slug) {
      return responseReturn(res, 400, { error: 'Product slug is required' });
    }

    try {
      const product = await Product.findOne({ slug });

      if (!product) {
        return responseReturn(res, 404, { error: 'Product not found' });
      }

      const [relatedProducts, moreProducts] = await Promise.all([
        Product.find({
          _id: { $ne: product.id },
          category: product.category,
        }).limit(2),

        Product.find({
          _id: { $ne: product.id },
          sellerId: product.sellerId,
        }).limit(3),
      ]);

      return responseReturn(res, 200, {
        product,
        relatedProducts,
        moreProducts,
      });
    } catch (error) {
      console.error('Error in productDetails:', error);
      return responseReturn(res, 500, { error: 'Internal server error' });
    }
  }
}
