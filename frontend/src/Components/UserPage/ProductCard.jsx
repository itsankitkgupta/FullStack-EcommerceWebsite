import  { useEffect, useState } from "react";
import Cookies from "js-cookie";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error fetching products: ${response.statusText}`);
        }
        const fetchedData = await response.json();
        setProducts(fetchedData.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, [token]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
      {loading ? (
        <div>Loading...</div>
      ) : (
        products.map((product, index) => (
          <ProductItem key={index} product={product} />
        ))
      )}
    </div>
  );
};

const ProductItem = ({ product }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition duration-300">
      <a href={`/product/${product.id}`}>
        <img
          className="h-80 w-full object-cover"
          src={`http://localhost:3000/${product.Image}`}
          alt={product.ProductName}
        />
      </a>
      <div className="px-4 py-4">
        <span className="text-gray-400 uppercase text-sm">
          {product.Manufacturer}
        </span>
        <p className="text-lg font-bold block truncate capitalize">
          {product.ProductName}
        </p>
        <p className="text-lg font-bold block truncate capitalize">
          {product.ProductType}
        </p>
        <p className="text-lg font-bold block truncate capitalize">
          {product.Description}
        </p>
        <div className="flex items-center">
          <p className="text-lg font-semibold my-3">{product.Price}</p>
          <del>
            <p className="text-sm text-gray-600 ml-2">{product.oldPrice}</p>
          </del>
          <div className="ml-auto">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
