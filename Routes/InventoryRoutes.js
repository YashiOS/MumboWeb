const express = require('express')
const router = express.Router();
const Inventory = require('../Model/InventoryModel');

router.get('/getInventory', async(req, res, next) => {
    try {
      const inventories = await Inventory.find();
        res.status(200).json({
            status: 200,
            success: true,
            data: inventories,
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message,
        }); 
    }
});

module.exports = router;
