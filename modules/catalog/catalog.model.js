const mongoose = require("mongoose");
const { jsonTransform } = require("../../utils/db");

const transformFields = ["id", "name", "seller", "createdAt"];

const CatalogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

module.exports = mongoose.model("Catalog", CatalogSchema);
