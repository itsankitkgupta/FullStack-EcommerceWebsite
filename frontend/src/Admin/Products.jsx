import { useState } from "react";
import Navbar from "../Components/Navbar";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const postProduct = async () => {
    const formData = new FormData();
    formData.append("ProductName", name);
    formData.append("ProductType", type);
    formData.append("Price", price);
    formData.append("Manufacturer", manufacturer);
    formData.append("Description", description);

    if (file) {
      formData.append("filename", file);
    } else {
      alert("Please upload a file");
      return;
    }

  // const token=  Cookies.get("token")


    const prods = await fetch("http://localhost:3000/api/v1/products", {
      method: "POST",
      // headers:{
      //   "Content-Type":"application/json",
      // },
      body: formData,
    });
    const data = await prods.json();

    if (data) {
      toast.success("Product added Successfully");
      navigate("/adminpanel/home")
      clearForm();
    } else {
      setMessage("Failed to save product");
    }
  };

  const clearForm = () => {
    setName("");
    setType("");
    setPrice("");
    setManufacturer("");
    setDescription("");
    setFile(null);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl font-semibold mb-4 text-center">Product Entry</h1>
        {message && <div className="text-red-500 mb-4">{message}</div>}
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Product Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="Electronics">Electronics</option>
              <option value="Clothes">Clothing</option>
              <option value="Wearables">Wearables</option>
              <option value="Groceries">Groceries</option>
              <option value="Fast Food">Fast Food</option>
            </select>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700">Manufacturer</label>
            <input
              type="text"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {file && <img src={URL.createObjectURL(file)} alt="product" className="mt-2 w-full" />}
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={postProduct}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Products;
