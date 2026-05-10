import Product from "../models/Product.js";

class ProductController {
  async createProduct(req, res) {
    try {
      const { name, description, price, category, inStock } = req.body;
      const payload = {
        name,
        description,
        price,
        category,
        inStock,
      };
      const prod = new Product(payload);
      const data = await prod.save();
      return res.status(201).json({
        status: true,
        message: "Product Created Successfully",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async getProduct(req, res) {
    try {
      const filter = {};
      if (req.query.category) filter.category = req.query.category;

      const data = await Product.find(filter);
      return res.status(200).json({
        status: true,
        message: "Product Fetched Successfully",
        total: data.length,
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async getProductById(req, res) {
    try {
      const id = req.params.id;
      const dataSingle = await Product.findById(id);
      return res.status(200).json({
        status: true,
        message: "Single Product Fetched Successfully",
        data: dataSingle,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async updateProductById(req,res){
    try{
      const id = req.params.id;
      const payload = { ...req.body };
      const data = await Product.findByIdAndUpdate(id, payload);
      return res.status(200).json({
        status: true,
        message: "Product Updated Successfully",
      });
    }catch(error){
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async deleteProduct(req,res){
    try{
      const id = req.params.id;
      const data = await Product.findByIdAndDelete(id);
      return res.status(200).json({
        status: true,
        message: "Product Deleted Successfully",
      });
    }catch(error){
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }
}

export default new ProductController();
