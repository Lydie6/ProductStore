import Product from "../models/product.model.js";
import mongoose from "mongoose";
export const getProducts=async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json({success: true, data: products });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
export const createProduct= async (req, res) => {
    const product = req.body;
    
    if(!product.name || !product.price || !product.image) { // Notez 'image' en minuscule
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Convertir le prix en nombre si envoyé comme string
    if (typeof product.price === 'string') {
        product.price = parseFloat(product.price);
    }

    const newProduct = new Product(product);
    
    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error while creating product:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}
export const updateProduct= async (req, res) => {
    const { id } = req.params;
    const product =req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: 'id Product invalid' });
    }
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, product, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({ success: true, data: updatedProduct });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}
export const deleteProduct = async (req, res) => {
    const { id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({success: false, message: 'id Product invalid' });
  }
    console.log("id is",id)
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
}