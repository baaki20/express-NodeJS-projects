const Product = require('../models/products')
const asynchHandler = require('express-async-handler')

const getAllProducts = asynchHandler(async(req, res) => {
    const {featured, company, name} = req.query
    const productsObject = {}

    if(featured) {
        productsObject.featured = featured === 'true' ? true : false
    }
    if(company) {
        productsObject.company = company
    }
    if(name) {
        productsObject.name = name
    }
    const products = await Product.find(productsObject)
    res.status(200).json({products, nHits: products.length})
})

module.exports = {getAllProducts}