const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    modelUrl: { type: String, default: "https://example.com/model.glb" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
