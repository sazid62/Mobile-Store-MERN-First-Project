// @ts-ignore
// @ts-nocheck


import { useState } from "react";
import { useProductsStore } from "@/store/products";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"

export default function CreatePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: ""
  });

  const { createProduct } = useProductsStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createProduct(formData);
    if (res.success) {
      toast({
        title: (
          <div className="flex items-center dark:text-white">
            <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Success
          </div>
        ),
        description: (
          <span className="dark:text-white">Product added successfully!</span>
        ),
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
    else {
      console.log("res", res);
      toast({
        title: (
          <div className="flex items-center dark:text-white">
            <svg className="w-6 h-6 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            {res.message}
          </div>
        ),
        description: (
          <span className="dark:text-white">{res.error}</span>
        ),
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen p-2 sm:p-6 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto w-full">
        <div className="bg-white dark:bg-gray-800 rounded shadow-lg p-3 sm:p-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
            <div className="text-gray-600 dark:text-gray-200 text-base sm:text-lg font-bold">Add New Product</div>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="grid gap-3 sm:gap-4 gap-y-3 sm:gap-y-4 text-sm grid-cols-1">
                <div>
                  <label className="text-gray-600 dark:text-gray-200 font-medium block mb-1">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="h-10 border dark:border-gray-600 rounded px-3 w-full bg-gray-50 dark:bg-gray-700 text-base dark:text-gray-200"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="text-gray-600 dark:text-gray-200 font-medium block mb-1">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="h-10 border dark:border-gray-600 rounded px-3 w-full bg-gray-50 dark:bg-gray-700 text-base dark:text-gray-200"
                    placeholder="Enter price"
                  />
                </div>

                <div>
                  <label className="text-gray-600 dark:text-gray-200 font-medium block mb-1">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="h-10 border dark:border-gray-600 rounded px-3 w-full bg-gray-50 dark:bg-gray-700 text-base dark:text-gray-200"
                    placeholder="Enter image URL"
                  />
                </div>

                <div className="mt-3">
                  <Button type="submit">
                    Add Product
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
