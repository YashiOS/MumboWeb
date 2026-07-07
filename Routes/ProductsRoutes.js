const express = require('express')
const router = express.Router();
const Fuse = require('fuse.js');
const Product = require('../Model/ProductsModel');

const SEARCH_FIELDS = 'productId name brand category subcategory mrpInr sellingPriceInr discountPct';
const SEARCH_CACHE_TTL_MS = 5 * 60 * 1000;
const searchCache = { fuse: null, fetchedAt: 0 };

const getSearchIndex = async () => {
    if (searchCache.fuse && Date.now() - searchCache.fetchedAt < SEARCH_CACHE_TTL_MS) {
        return searchCache.fuse;
    }

    const products = await Product.find({ isActive: 'Yes' })
        .select(SEARCH_FIELDS)
        .lean();

    searchCache.fuse = new Fuse(products, {
        keys: [
            { name: 'name', weight: 0.5 },
            { name: 'brand', weight: 0.25 },
            { name: 'category', weight: 0.15 },
            { name: 'subcategory', weight: 0.1 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
        minMatchCharLength: 2,
    });
    searchCache.fetchedAt = Date.now();

    return searchCache.fuse;
};


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
router.get('/search', async(req, res, next) => {
    try {
        const q = (req.query.q || '').trim();

        if (!q) {
            return res.status(200).json({
                success: true,
                data: []
            });
        }

        const fuse = await getSearchIndex();
        const results = fuse.search(q, { limit: 20 });

        res.status(200).json({
            success: true,
            data: results.map(result => result.item)
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
        next(err);
    }
});

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