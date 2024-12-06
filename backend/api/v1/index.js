const routes = require('express').Router()
const auth = require('./auth')
const users = require('./users')
const products = require('./products')


routes.use("/v1/",auth)
routes.use("/v1/",users)
routes.use("/v1/",products)

module.exports = routes;