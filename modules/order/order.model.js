const mongoose = require("mongoose");
const { jsonTransform } = require("../../utils/db");

const transformFields = [
  "id",
  "buyer",
  "seller",
  "catalog",
  "products",
  "createdAt",
];

const OrderSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    catalog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Catalog",
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc) => jsonTransform(doc, transformFields),
    },
  }
);

module.exports = mongoose.model("Order", OrderSchema);
