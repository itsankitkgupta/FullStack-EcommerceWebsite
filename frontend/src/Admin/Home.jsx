import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'

const Home = ({ sidebarToggle }) => {
  const [products, setProducts] = useState([]);

  const delProduct = async (pid) => {
    const sure = window.confirm("Are you sure?");
    if (sure) {
      const response = await fetch("http://localhost:3000/api/v1/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: pid }),
      });
      if (response.ok) {
        toast.success("Product deleted successfully");
        getProducts();
      } else {
        toast.error("Failed to delete product");
      }
    }
  };

  const token=  Cookies.get("token")


  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/products", {
        method: "GET",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching products: ${response.statusText}`);
      }

      const fetchedData = await response.json();
      setProducts(fetchedData.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={`${sidebarToggle ? "" : "w-full"}`}>
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 border-col">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manufacturer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Images</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operations</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b border-gray-200 bg-white">
              <td className="px-6 py-4 whitespace-nowrap">{product.ProductName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.ProductType}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.Price}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.Manufacturer}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.Description}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <img src={`http://localhost:3000/${product.Image}`} alt="product" className="h-20 w-20 object-cover" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link to={`/home/updateproducts/${product._id}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                <button onClick={() => delProduct(product._id)} className="ml-4 text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Toaster />
    </div>
  );
};

export default Home;
