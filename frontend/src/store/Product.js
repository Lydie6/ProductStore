// src/store/Product.js
import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  // Fonction pour créer un produit
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill out all fields" };
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        throw new Error("Failed to create product");
      }

      const data = await res.json();

      set((state) => ({
        products: [...state.products, data],
      }));

      return { success: true, message: "Product created successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const productReturn = await res.json();
    set({products: productReturn.data});
  },
  deleteProduct: async (id) => {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    const productReturn = await res.json();
    if (!res.ok || !productReturn.success) {
      return { success: false, message: productReturn.message || "Failed to delete product" };
    }
    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }));
    return { success: true, message: "Product deleted successfully" };
  },
  updateProduct: async (id, data) => {
   try{
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const prdctModifedReturn = await res.json();
    if (!res.ok || !prdctModifedReturn.success) {
      return { success: false, message: prdctModifedReturn.message || "Failed to update product" };
    }
    set((state) => ({
      products: state.products.map((product) =>product._id === id ? prdctModifedReturn.data : product),
    }));
    return {
    success: true,
    data: prdctModifedReturn.data,
    message: "Product updated successfully",
     };
   }
   catch (error) {
    return {
      success: false,
      message: "Network error or server unreachable",
    };
   }
  }
}));
