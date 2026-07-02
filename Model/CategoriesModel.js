const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    category: {
      type: String,
      required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    productCount: {
        type: Number,
        required: true
    }
  }
);

CategorySchema.index({
    category: "text"
});

module.exports = mongoose.model(
  'Categories',
  CategorySchema,
  'Categories'
);
