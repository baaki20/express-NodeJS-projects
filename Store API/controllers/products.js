const Product = require('../models/products')
const asynchHandler = require('express-async-handler')

const getAllProducts = asynchHandler(async(req, res) => {
    const {featured, company, name, sort, fields, numericFilters} = req.query
    const productsObject = {}

    if(featured) {
        productsObject.featured = featured === 'true' ? true : false
    }
    if(company) {
        productsObject.company = company
    }
    if(name) {
        productsObject.name = {$regex: name, $options: 'i'}
    }
    if(numericFilters) {
        const mapOperators = {
            '>' : '$gt',
            '>=' : '$gte',
            '=' : '$eq',
            '<' : '$lt',
            '<=' : '$lte'
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filter = numericFilters.replace(regEx, (match) => `-${mapOperators[match]}-`)
        const options = ['price', 'rating']
        filter = filter.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if(options.includes(field)) {
                productsObject[field] = {[operator] : Number(value)}
            }
        });
        console.log(productsObject)
    }

    let result = Product.find(productsObject)
    if(sort) {
        const sortList = sort.split(',').join('')
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }

    if(fields) {
        const fieldsList = fields.split(',').join('')
        result = result.select(fieldsList)
    }

    const limit = Number(req.query.limit) || 10
    const page = Number(req.query.page) || 1
    const skip = (page - 1) * limit

    result = result.limit(limit).skip(skip)
    const products = await result
    res.status(200).json({products, nHits: products.length})
})

module.exports = {getAllProducts}