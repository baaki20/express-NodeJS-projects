const Product = require('../models/products')

const getAllProducts = async(req, res) => {
    const {featured, company, name} = req.query
    const productsObject = {}

    if(featured) {
        productsObject.featured = featured === 'true' ? true : false
    }
    if(company) {
        productObject.company = company
    }
    if(name) {
        productsObject.name = name
    }
    const products = await Product.find(productsObject)
    res.status(200).json({products, nHits: products.length})
}

module.exports = {getAllProducts}