/* eslint-disable no-undef */

import stripe from 'stripe'
import { v4 as uuid } from 'uuid'
import { STRIPE_KEY } from '../../config'
import Stripe from '../../models/stripe'
import { responseReturn } from '../../utils/response'

const stripeRef = new stripe(STRIPE_KEY)

export class PaymentController {
  createStripeConnectAccount = async (req, res) => {
    const { id } = req

    try {
      await Stripe.deleteOne({ sellerId: id })

      const account = await stripeRef.accounts.create({ type: 'express' })

      const accountLink = await stripeRef.accountLinks.create({
        account: account.id,
        refresh_url: 'http://localhost:3001/refresh',
        return_url: `http://localhost:3001/success?activeCode=${uuid()}`,
        type: 'account_onboarding',
      })

      await Stripe.create({
        sellerId: id,
        stripeId: account.id,
        code: uuid(),
      })

      responseReturn(res, 200, { url: accountLink.url })
    } catch (error) {
      console.error('Error in createStripeConnectAccount', error)

      responseReturn(res, 500, { error: 'Internal server error' })
    }
  }
}
