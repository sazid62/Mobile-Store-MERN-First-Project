// @ts-ignore
// @ts-nocheck


import { create } from "zustand";

export const useProductsStore = create((set) => ({
    products: [],
    importProducts: async () => {
        const res = await fetch('http://localhost:3000/products/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        set({ products: data.data });
        return { success: true, message: "Products imported successfully" };
    },
    deleteProduct: async (id) => {
        const res = await fetch(`http://localhost:3000/products/${id}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        set((state) => ({ products: state.products.filter(product => product._id !== id) }));
        return { success: true, message: "Product deleted successfully" };
    },
    updateProduct: async (id, updAatedProduct) => {
        console.log("frontend id = ", id);
        console.log("updatedProduct = ", updAatedProduct);
        try {
            const res = await fetch(`http://localhost:3000/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updAatedProduct),
            });
            const data = await res.json();
            console.log("data = ", data);
            // set((state) => ({products: state.products.map(product => product._id === id ? data.data : product)}));
            return { success: true, message: "Product updated successfully" };
        } catch (error) {
            return { success: false, message: "Failed to update product" };
        }
    },
    createProduct: async (newProduct) => {
        // console.log("newProduct = ", newProduct);

        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: 'Please fill all the fields' };
        }
        else {

            const res = await fetch('http://localhost:3000/products/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });
            const data = await res.json();
            // console.log("data = ", JSON.stringify(newProduct));
            set((state) => ({ products: [...state.products, data.data] }));
            return { success: true, message: "Product created successfully" };
        }
    },
}));





