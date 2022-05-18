const mongoose = require("mongoose");
const { jsonTransform } = require("../../utils/db");

const currencyValues = ["INR", "USD"];

const transformFields = ["id", "name", "price", "createdAt"];

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      currency: {
        type: String,
        enum: currencyValues,
        default: currencyValues[0],
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
    },
    catalog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Catalog",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc) => jsonTransform(doc, transformFields),
    },
  }
);

module.exports = mongoose.model("Product", ProductSchema);
