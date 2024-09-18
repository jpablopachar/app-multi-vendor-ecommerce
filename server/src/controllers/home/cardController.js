import { Types } from 'mongoose'
import Card from '../../models/card.js'
import { responseReturn } from '../../utils/response.js'

export class CardController {
  addToCard = async (req, res) => {
    const { userId, productId, quantity } = req.body

    try {
      /* Busca un documento específico que cumpla con dos condiciones: que el campo productId
      sea igual a productId y que el campo userId sea igual a userId. */
      const product = await Card.findOne({
        $and: [{ productId: { $eq: productId } }, { userId: { $eq: userId } }],
      })

      if (product) {
        responseReturn(res, 404, { error: 'Product already added to card' })
      } else {
        const product = await Card.create({ userId, productId, quantity })

        responseReturn(res, 201, {
          message: 'Added to card successfully',
          product,
        })
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message })
    }
  }

  getCardProducts = async (req, res) => {
    const { userId } = req.params

    const co = 5

    try {
      const cardProducts = await Card.aggregate([
        { $match: { userId: { $eq: Types.ObjectId(userId) } } },
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

      const outOfStockProduct = cardProducts.filter(
        (product) => product.products[0].stock < product.quantity
      )

      for (let i = 0; i < outOfStockProduct.length; i++) {
        cardProductCount = cardProductCount + outOfStockProduct[i].quantity
      }

      const stockProduct = cardProducts.filter(
        (product) => product.products[0].stock >= product.quantity
      )

      for (let i = 0; i < stockProduct.length; i++) {
        const { quantity } = stockProduct[i]

        cardProductCount = buyProductItem + quantity
        buyProductItem = buyProductItem + quantity

        const { price, discount } = stockProduct[i].products[0]

        if (discount !== 0) {
          calculatePrice =
            calculatePrice +
            quantity * (price - Math.floor((price * discount) / 100))
        } else {
          calculatePrice = calculatePrice + quantity * price
        }
      }

      let p = []
      let unique = [
        ...new Set(
          stockProduct.map((product) => product.products[0].sellerId.toString())
        ),
      ]

      for (let i = 0; i < unique.length; i++) {
        let price = 0

        for (let j = 0; j < stockProduct.length; j++) {
          const productTemp = stockProduct[j].products[0]

          if (unique[i] === productTemp.sellerId.toString()) {
            let pri = 0

            if (productTemp.discount !== 0) {
              pri =
                productTemp.price -
                Math.floor((productTemp.price * productTemp.discount) / 100)
            } else {
              pri = productTemp.price
            }

            pri = pri - Math.floor((pri * co) / 100)
            price = price + pri * stockProduct[j].quantity

            p[i] = {
              sellerId: unique[i],
              shopName: productTemp.shopName,
              price,
              products: p[i]
                ? [
                    ...p[i].products,
                    {
                      _id: stockProduct[j]._id,
                      quantity: stockProduct[j].quantity,
                      productInfo: productTemp,
                    },
                  ]
                : [
                    {
                      _id: stockProduct[j]._id,
                      quantity: stockProduct[j].quantity,
                      productInfo: productTemp,
                    },
                  ],
            }
          }
        }
      }

      responseReturn(res, 200, {
        cardProducts: p,
        price: calculatePrice,
        cardProductCount,
        shippingFee: 20 * p.length,
        outOfStockProduct,
        buyProductItem,
      })
    } catch (error) {
      responseReturn(res, 500, { error: error.message })
    }
  }
}
