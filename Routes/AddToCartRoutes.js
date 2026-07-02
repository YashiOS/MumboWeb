const express = require('express')
const router = express.Router();
const Product = require('../Model/ProductsModel');
const Cart = require("../Model/CartModel");

router.post("/addToCart", async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const product = await Product.findOne({ productId });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({
                userId,
                products: [
                    {
                        productId,
                        quantity: 1,
                        price: product.sellingPriceInr
                    }
                ]
            });

            await cart.save();

            return res.status(201).json({
                success: true,
                message: "Product added to cart",
                data: cart
            });
        }

        const productIndex = cart.products.findIndex(
            item => item.productId.toString() === productId
        );

        if (productIndex > -1) {
            cart.products[productIndex].quantity += 1;
            cart.products[productIndex].price = product.sellingPriceInr * cart.products[productIndex].quantity;
        } else {
            cart.products.push({
                productId,
                quantity: 1,
                price: product.sellingPriceInr
            });
        }

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Product added successfully",
            data: cart
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

router.post("/removeFromCart", async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const productIndex = cart.products.findIndex(
            item => item.productId === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart"
            });
        }

        if (cart.products[productIndex].quantity > 1) {
            const product = await Product.findOne({ productId });
            cart.products[productIndex].quantity -= 1;
            cart.products[productIndex].price = product.sellingPriceInr * cart.products[productIndex].quantity;
        } else {
            cart.products.splice(productIndex, 1);
        }

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            data: cart
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});


router.post("/fetchCartDetails", async (req, res) => {
    try {

        const { userId } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart is empty"
            });
        }

        const cartItems = await Promise.all(
            cart.products.map(async (item) => {

                const product = await Product.findOne({
                    productId: item.productId
                });

                return {
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                    product
                };
            })
        );

        res.status(200).json({
            success: true,
            totalItems: cartItems.length,
            data: cartItems
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

module.exports = router;