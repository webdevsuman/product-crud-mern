import mongoose from "mongoose";
import createProductSchema from "../utils/createProductSchema.js";

const ProductSchema = createProductSchema({
  categories: ["Electronics", "Clothing", "Shoes", "Books", "Accessories", "Other"],
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
