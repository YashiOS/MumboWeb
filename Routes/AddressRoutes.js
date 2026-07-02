const express = require('express')
const router = express.Router();
const User = require("../Model/UserModel");

router.post('/saveAddress', async(req, res, next) => {
    try {
        const { userId, address, lat, long } = req.body;

        if (!address || lat == null || long == null) {
            return res.status(400).json({
                success: false,
                message: "Address, latitude and longitude are required."
            });
        }

        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        user.addresses.push({
            address,
            lat,
            long
        });

        await user.save();

        res.status(200).json({
            success: true,
            message: "Address saved successfully.",
            addresses: user.addresses
        });

    } catch (err) {
         res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

router.post('/getAddresses', async(req, res, next) => {
    try {
        const { userId } = req.body;
         const user = await User.findOne({ userId });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Address saved successfully.",
            addresses: user.addresses
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        }); 
    }
});

module.exports = router;