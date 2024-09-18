import { Types } from 'mongoose'
import Card from '../../models/card.js'
import { responseReturn } from '../../utils/response.js'

export class CardController {
  addToCard = async (req, res) => {
    const { userId, productId, quantity } = req.body

    try {
      const existingProduct = await Card.findOne({ productId, userId })

      if (existingProduct) {
        return responseReturn(res, 404, {
          error: 'Product already added to card',
        })
      } else {
        const product = await Card.create({ userId, productId, quantity })

        return responseReturn(res, 201, {
          message: 'Added to card successfully',
          product,
        })
      }
    } catch (error) {
      return responseReturn(res, 500, { error: error.message })
    }
  }

  getCardProducts = async (req, res) => {
    const { userId } = req.params

    const commissionRate = 5

    try {
      // Obtener productos del carrito y realizar la relación con los productos
      const cardProducts = await Card.aggregate([
        { $match: { userId: Types.ObjectId(userId) } },
        {
          $lookup: {
            from: 'Products',
            localField: 'productId',
            foreignField: '_id',
            as: 'products',
          },
        },
      ])

      let buyProductItem = 0
      let calculatePrice = 0
      let cardProductCount = 0

      // Separar productos fuera de stock y con stock
      const outOfStockProduct = cardProducts.filter(
        (product) => product.products[0].stock < product.quantity
      )

      const stockProduct = cardProducts.filter(
        (product) => product.products[0].stock >= product.quantity
      )

      // Calcular cantidad de productos fuera de stock
      cardProductCount = outOfStockProduct.reduce(
        (acc, product) => acc + product.quantity,
        0
      )

      // Calcular precio total y productos comprables
      stockProduct.forEach((product) => {
        const { quantity } = product
        const { price, discount } = product.products[0]

        // Actualiza el total de productos comprables
        buyProductItem += quantity

        // Calcula el precio con descuento si existe
        let finalPrice = price

        if (discount) finalPrice = price - Math.floor((price * discount) / 100)

        calculatePrice += quantity * finalPrice
      })

      // Agrupar productos por vendedor
      const productsBySeller = stockProduct.reduce((acc, product) => {
        const productInfo = product.products[0]
        const sellerId = productInfo.sellerId.toString()

        if (!acc[sellerId]) {
          acc[sellerId] = {
            sellerId: sellerId,
            shopName: productInfo.shopName,
            price: 0,
            products: [],
          }
        }

        let productPrice = productInfo.price

        if (productInfo.discount)
          productPrice =
            productInfo.price -
            Math.floor((productInfo.price * productInfo.discount) / 100)

        // Aplicar comisión
        productPrice =
          productPrice - Math.floor((productPrice * commissionRate) / 100)
        acc[sellerId].price += productPrice * product.quantity

        acc[sellerId].products.push({
          _id: product._id,
          quantity: product.quantity,
          productInfo: productInfo,
        })

        return acc
      }, {})

      const productArray = Object.values(productsBySeller)

      // Enviar respuesta
      responseReturn(res, 200, {
        cardProducts: productArray,
        price: calculatePrice,
        cardProductCount,
        shippingFee: 20 * productArray.length,
        outOfStockProduct,
        buyProductItem,
      })
    } catch (error) {
      responseReturn(res, 500, { error: error.message })
    }
  }
}
