require('dotenv').config()
const jsonProducts = require('./products.json')
const connectDB = require('./db/connectDB')
const Product = require('./models/products')

const populate = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProducts)
    
        console.log("Sucessfull!")
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

populate()