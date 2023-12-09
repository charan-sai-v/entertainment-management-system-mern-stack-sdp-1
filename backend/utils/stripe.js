const Stripe = require('stripe')

module.exports = Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
})