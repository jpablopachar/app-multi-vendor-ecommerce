/* eslint-disable no-undef */

import AdminSellerMessage from '../../models/chat/admin-seller-message'
import SellerCustomer from '../../models/chat/seller-customer'
import SellerCustomerMessage from '../../models/chat/seller-customer-message'
import Customer from '../../models/customer'
import Seller from '../../models/seller'
import { responseReturn } from '../../utils/response'

export class ChatController {
  addCustomerFriend = async (req, res) => {
    const { sellerId, userId } = req.body

    if (!sellerId || !userId)
      responseReturn(res, 400, {
        error: 'sellerId and userId are required',
      })

    try {
      if (sellerId === '') {
        const MyFriends = await SellerCustomer.findOne({ myId: userId })

        responseReturn(res, 200, { myFriends: MyFriends.myFriends })
      }

      const seller = await Seller.findById(sellerId)

      if (!seller) responseReturn(res, 404, { error: 'Seller not found' })

      const user = await Customer.findById(userId)

      if (!user) responseReturn(res, 404, { error: 'User not found' })

      const checkSeller = await SellerCustomer.findOne({
        $and: [
          { myId: { $eq: userId } },
          { myFriends: { $elemMatch: { fdIn: sellerId } } },
        ],
      })

      if (!checkSeller) {
        await SellerCustomer.updateOne(
          { myId: userId },
          {
            $push: {
              myFriends: {
                fdIn: sellerId,
                name: seller.shopInfo?.shopName,
                image: seller.image,
              },
            },
          }
        )
      }

      const checkCustomer = await SellerCustomer.findOne({
        $and: [
          { myId: { $eq: userId } },
          { myFriends: { $elemMatch: { fdIn: userId } } },
        ],
      })

      if (!checkCustomer) {
        await SellerCustomer.updateOne(
          { myId: sellerId },
          {
            $push: {
              myFriends: {
                fdIn: userId,
                name: user.name,
                image: '',
              },
            },
          }
        )
      }

      const messages = await SellerCustomer.find({
        $or: [
          {
            $and: [
              { receiverId: { $eq: sellerId } },
              { senderId: { $eq: userId } },
            ],
          },
          {
            $and: [
              { receiverId: { $eq: userId } },
              { senderId: { $eq: sellerId } },
            ],
          },
        ],
      })

      const MyFriends = await SellerCustomer.findOne({ myId: userId })

      const currentFd = MyFriends.myFriends.find((fd) => fd.fdIn === sellerId)

      responseReturn(res, 200, {
        messages,
        myFriends: MyFriends.myFriends,
        currentFd,
      })
    } catch (error) {
      console.error('Error in addCustomerFriend:', error)

      responseReturn(res, 500, { error: 'Error in addCustomerFriend' })
    }
  }

  customerMessageAdd = async (req, res) => {
    const { userId, text, sellerId, name } = req.body

    if (!userId || !text || !sellerId || !name)
      responseReturn(res, 400, {
        error: 'userId, text, sellerId and name are required',
      })

    try {
      const message = SellerCustomerMessage.create({
        senderName: name,
        senderId: userId,
        receiverId: sellerId,
        message: text,
      })

      const data = await SellerCustomer.findOne({ myId: userId })

      let myFriends = data.myFriends
      let index = myFriends.findIndex((fd) => fd.fdIn === sellerId)

      while (index > 0) {
        let temp = myFriends[index]

        myFriends[index] = myFriends[index - 1]
        myFriends[index - 1] = temp
        index--
      }

      await SellerCustomer.updateOne({ myId: userId }, { myFriends })

      const data1 = await SellerCustomer.findOne({ myId: sellerId })

      let myFriends1 = data1.myFriends
      let index1 = myFriends1.findIndex((fd) => fd.fdIn === userId)

      while (index1 > 0) {
        let temp1 = myFriends1[index1]

        myFriends1[index1] = myFriends1[index1 - 1]
        myFriends1[index1 - 1] = temp1
        index1--
      }

      await SellerCustomer.updateOne(
        { myId: sellerId },
        { myFriends: myFriends1 }
      )

      responseReturn(res, 200, { message })
    } catch (error) {
      console.error('Error in customerMessageAdd:', error)

      responseReturn(res, 500, { error: 'Error in customerMessageAdd' })
    }
  }

  getCustomers = async (req, res) => {
    const { sellerId } = req.params

    if (!sellerId)
      responseReturn(res, 400, {
        error: 'sellerId is required',
      })

    try {
      const data = await SellerCustomer.findOne({ myId: sellerId })

      responseReturn(res, 200, { customers: data.myFriends })
    } catch (error) {
      console.error('Error in getCustomers:', error)

      responseReturn(res, 500, { error: 'Error in getCustomers' })
    }
  }

  getCustomersSellerMessage = async (req, res) => {
    const { customerId } = req.params
    const { id } = req

    try {
      const messages = await SellerCustomerMessage.find({
        $or: [
          {
            $and: [
              { receiverId: { $eq: customerId } },
              { senderId: { $eq: id } },
            ],
          },
          {
            $and: [
              { receiverId: { $eq: id } },
              { senderId: { $eq: customerId } },
            ],
          },
        ],
      })

      const currentCustomer = await Customer.findById(customerId)

      responseReturn(res, 200, { messages, currentCustomer })
    } catch (error) {
      console.error('Error in getCustomersSellerMessage:', error)

      responseReturn(res, 500, { error: 'Error in getCustomersSellerMessage' })
    }
  }

  sellerMessageAdd = async (req, res) => {
    const { senderId, text, receiverId, name } = req.body

    if (!senderId || !text || !receiverId || !name)
      responseReturn(res, 400, {
        error: 'senderId, text, receiverId and name are required',
      })

    try {
      const message = SellerCustomerMessage.create({
        senderName: name,
        senderId,
        receiverId,
        message: text,
      })

      const data = await SellerCustomer.findOne({ myId: senderId })

      let myFriends = data.myFriends
      let index = myFriends.findIndex((fd) => fd.fdIn === receiverId)

      while (index > 0) {
        let temp = myFriends[index]

        myFriends[index] = myFriends[index - 1]
        myFriends[index - 1] = temp
        index--
      }

      await SellerCustomer.updateOne({ myId: senderId }, { myFriends })

      const data1 = await SellerCustomer.findOne({ myId: receiverId })

      let myFriends1 = data1.myFriends
      let index1 = myFriends1.findIndex((fd) => fd.fdIn === senderId)

      while (index1 > 0) {
        let temp1 = myFriends1[index1]

        myFriends1[index1] = myFriends1[index1 - 1]
        myFriends1[index1 - 1] = temp1
        index1--
      }

      await SellerCustomer.updateOne(
        { myId: receiverId },
        { myFriends: myFriends1 }
      )

      responseReturn(res, 200, { message })
    } catch (error) {
      console.error('Error in sellerMessageAdd:', error)

      responseReturn(res, 500, { error: 'Error in sellerMessageAdd' })
    }
  }

  getSellers = async (req, res) => {
    try {
      const sellers = await Seller.find({})

      responseReturn(res, 200, { sellers })
    } catch (error) {
      console.error('Error in getSellers:', error)

      responseReturn(res, 500, { error: 'Error in getSellers' })
    }
  }

  sellerAdminMessageInsert = async (req, res) => {
    const { senderId, receiverId, message, senderName } = req.body

    if (!senderId || !receiverId || !message || !senderName)
      responseReturn(res, 400, {
        error: 'senderId, receiverId, message and senderName are required',
      })

    try {
      const messageData = await AdminSellerMessage.create({
        senderId,
        receiverId,
        message,
        senderName,
      })

      responseReturn(res, 200, { message: messageData })
    } catch (error) {
      console.error('Error in sellerAdminMessageInsert:', error)

      responseReturn(res, 500, { error: 'Error in sellerAdminMessageInsert' })
    }
  }

  getAdminMessages = async (req, res) => {
    const { receiverId } = req.params

    if (!receiverId)
      responseReturn(res, 400, { error: 'receiverId is required' })

    const id = ''

    try {
      const messages = await AdminSellerMessage.find({
        $or: [
          {
            $and: [
              { receiverId: { $eq: receiverId } },
              { senderId: { $eq: id } },
            ],
          },
          {
            $and: [
              { receiverId: { $eq: id } },
              { senderId: { $eq: receiverId } },
            ],
          },
        ],
      })

      let currentSeller = {}

      if (receiverId) currentSeller = await Seller.findById(receiverId)

      responseReturn(res, 200, { messages, currentSeller })
    } catch (error) {
      console.error('Error in getAdminMessages:', error)

      responseReturn(res, 500, { error: 'Error in getAdminMessages' })
    }
  }

  getSellerMessages = async (req, res) => {
    const receiverId = ''

    const { id } = req

    try {
      const messages = await AdminSellerMessage.find({
        $or: [
          {
            $and: [
              { receiverId: { $eq: receiverId } },
              { senderId: { $eq: id } },
            ],
          },
          {
            $and: [
              { receiverId: { $eq: id } },
              { senderId: { $eq: receiverId } },
            ],
          },
        ],
      })

      responseReturn(res, 200, { messages })
    } catch (error) {
      console.error('Error in getSellerMessages:', error)

      responseReturn(res, 500, { error: 'Error in getSellerMessages' })
    }
  }
}
