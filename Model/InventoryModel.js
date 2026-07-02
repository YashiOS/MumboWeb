const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InventorySchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    inventoryId: {
        type: String,
        required: true,
        unique: true
    },

    storeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    onHandQty: {
      type: Number,
      required: true
    },

    reorderLevel: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      required: true,
    },

    lastRestocked: {
      type: Date,
      required: true,
    }
  }
);

InventorySchema.index({
    productName: "text"
});

module.exports = mongoose.model(
  'Inventory',
  InventorySchema,
  'Inventory'
);
