const express = require('express')
const router = express.Router();
const Product = require('../Model/ProductsModel');


router.get('/getProducts', async(req, res, next) => {
    try{ 
    const products = await Product.find();
        res.json({
            success: true,
            data: products,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

router.post('/getSpecificProducts', async(req, res, next) => {
    try {
        const { category } = req.body;
        const products = await Product.find({ category });
         res.status(200).json({
            statusCode: 200,
            message: "Successfully fetched",
            data: products
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
        next(err);
    }
})
router.post('/productDetail', async(req, res, next) => {
    try {
        const { productId } = req.body;
        const product = await Product.findOne({productId});
        res.status(200).json({
            statusCode: 200,
            message: "Successfully fetched",
            data: product
        })
    } catch(err) {
         res.status(500).json({
            success: false,
            message: err.message,
        });
        next(err);
    }
});

module.exports = router