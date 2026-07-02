const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductsDetailsSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
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

    subcategory: {
      type: String,
      required: true,
      trim: true,
    },

    ageRange: {
      type: String,
      required: true,
      trim: true,
    },

    mrpInr: {
      type: Number,
      required: true,
    },

    sellingPriceInr: {
      type: Number,
      required: true,
    },

    discountPct: {
      type: Number,
      required: true,
    },

    packSize: {
      type: String,
      required: true,
    },

    weightG: {
      type: Number,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

ProductsDetailsSchema.index({
    name: "text"
});

module.exports = mongoose.model(
  'ProductsDetails',
  ProductsDetailsSchema,
  'ProductsDetails'
);