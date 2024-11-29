import Product from "../model/product.model.js";
import mongoose from "mongoose";



export const getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json({ status: "success", data: products });
}

export const createProduct =  async (req, res) => {
    const product = req.body;
    // console.log("hhhhhhhhhhhhhhhhh = ", product);
    if (!product.name || !product.price || !product.image) {
        // console.log(product);
        return res.status(400).json({ status: "failed", message: "All fields are required" });
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({ status: "success", data: newProduct });
    } catch (error) {
        res.status(500).json({ status: "failed", message: error.message });
    }
}



export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try  {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ status: "success", message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: "failed", message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    console.log("backend id = ", id);
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ status: "failed", message: "Invalid product id" });
    }
    const product = req.body;
    // console.log(product);
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ status: "success", data: updatedProduct });
    } catch (error) {
        res.status(500).json({ status: "failed", message: error.message });
    }
}

