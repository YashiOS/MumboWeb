const express = require('express')
const router = express.Router();
const Categories = require('../Model/CategoriesModel');

router.get('/getCategory', async(req, res, next) => {
    try {
      const categories = await Categories.find();
        res.status(200).json({
            status: 200,
            success: true,
            data: categories,
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message,
        }); 
    }
});

module.exports = router;
