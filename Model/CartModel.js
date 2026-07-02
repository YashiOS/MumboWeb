const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: [
        {
            productId: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            },
            price: {
                type: Number,
                default: 0
            }
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model("Cart", cartSchema);
