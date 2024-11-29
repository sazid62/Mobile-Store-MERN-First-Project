// @ts-nocheck

import { Link } from "react-router-dom";
import { useProductsStore } from "@/store/products";
import { useEffect, useState } from "react";

export default function Home() {
  const { products, importProducts, deleteProduct, updateProduct } = useProductsStore();
  const [editProduct, setEditProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    image: ""
  });

  useEffect(() => {
    importProducts();
  }, []);

  useEffect(() => {
    if (editProduct) {
      setEditForm({
        name: editProduct.name,
        price: editProduct.price,
        image: editProduct.image
      });
    }
  }, [editProduct]);

  const handleEditSubmit = async () => {
    const res = await updateProduct(editProduct._id, editForm);
    console.log("res = ", res);
    if (res.success) {
      await importProducts(); // Refresh products after successful edit
      setEditProduct(null);
    }
  };

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <img 
          src="https://png.pngtree.com/png-vector/20190628/ourmid/pngtree-empty-box-icon-for-your-project-png-image_1521417.jpg"
          alt="Empty state"
          className="w-16 h-16 sm:w-24 sm:h-24 mb-2 sm:mb-4 opacity-60" 
        />
        <h2 className="text-lg sm:text-xl text-gray-600 mb-2 sm:mb-4 text-center">No products found</h2>
        <Link 
          to="/create"
          className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Product
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 container mx-auto">
      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Edit Product</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Name:</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Price:</label>
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Image URL:</label>
                <input
                  type="text"
                  value={editForm.image}
                  onChange={(e) => setEditForm({...editForm, image: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleEditSubmit}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setEditProduct(null)}
                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {products.map((product) => (
          <div key={product._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-square">
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 line-clamp-2">{product.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base font-medium">${product.price}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setEditProduct(product)}
                  className="flex-1 px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    const res = await deleteProduct(product._id);
                    console.log("res = ", res);
                  }}
                  className="flex-1 px-3 py-1.5 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
