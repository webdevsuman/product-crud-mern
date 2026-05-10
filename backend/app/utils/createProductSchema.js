import mongoose, { Schema } from "mongoose";

const createProductSchema = ({ categories = [] } = {}) => {
  return new Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        default: "",
        trim: true,
      },

      price: {
        type: Number,
        required: true,
        min: 0,
      },

      category: {
        type: String,
        enum: categories,
        // required: true,
        trim: true,
        default: "Other",
      },

      inStock: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );
};

export default createProductSchema;
