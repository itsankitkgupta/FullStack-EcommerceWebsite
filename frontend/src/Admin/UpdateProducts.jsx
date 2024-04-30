import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProducts = () => {
  const [Sname, setSName] = useState("");
  const [Stype, setSType] = useState("");
  const [Sprice, setSPrice] = useState("");
  const [Smanufacturer, setSManufacturer] = useState("");
  const [Sdescription, setSDescription] = useState("");
  const [Sphoto, setSphoto] = useState(null);
  const [Sid, setSid] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const updateProduct = async () => {
    const formData = new FormData();
    formData.append("id", Sid);
    formData.append("ProductName", Sname);
    formData.append("ProductType", Stype);
    formData.append("Price", Sprice);
    formData.append("Manufacturer", Smanufacturer);
    formData.append("Description", Sdescription);
    if (Sphoto) {
      formData.append("filename", Sphoto);
    } else {
      alert("file not uploaded");
    }

    const prods = await fetch("http://localhost:3000/api/v1/update-product", {
      method: "PUT",
      body: formData,
    });
    const data = await prods.json();

    if (data) {
      toast.success("Products Updated successfully");
      setTimeout(() => {
        navigate("/adminpanel/home");
      }, 700);
    } else {
      toast.error("Couldn't Update");
    }
  };

  const getSingleProduct = async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/singleproduct/${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) {
      throw new Error("Error in fetching details", response.statusText);
    }
    const fetcheddata = await response.json();
    setSid(fetcheddata.data._id);
    setSName(fetcheddata.data.ProductName);
    setSType(fetcheddata.data.ProductType);
    setSPrice(fetcheddata.data.Price);
    setSManufacturer(fetcheddata.data.Manufacturer);
    setSDescription(fetcheddata.data.Description);
    setSphoto(fetcheddata.data.Image);
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-medium text-center mb-8">Update Product</h1>
        <div className="bg-lime-100 p-6 rounded-lg shadow-md">
          <form onSubmit={updateProduct} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2">
                Product Name
              </label>
              <input
                id="name"
                type="text"
                value={Sname}
                onChange={(e) => setSName(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="type" className="block mb-2">
                Product Type
              </label>
              <select
                id="type"
                value={Stype}
                onChange={(e) => setSType(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Electronics">Electronics</option>
                <option value="Clothes">Clothing</option>
                <option value="Wearables">Wearables</option>
                <option value="Groceries">Groceries</option>
                <option value="FastFood">Fast Food</option>
              </select>
            </div>
            <div>
              <label htmlFor="price" className="block mb-2">
                Price
              </label>
              <input
                id="price"
                type="text"
                value={Sprice}
                onChange={(e) => setSPrice(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="manufacturer" className="block mb-2">
                Manufacturer
              </label>
              <input
                id="manufacturer"
                type="text"
                value={Smanufacturer}
                onChange={(e) => setSManufacturer(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="description" className="block mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={Sdescription}
                onChange={(e) => setSDescription(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            {Sphoto && (
              <div>
                <img
                  src={`http://localhost:3000/${Sphoto}`}
                  alt=""
                  className="max-w-full h-auto"
                />
              </div>
            )}
            <div>
              <label htmlFor="photo" className="block mb-2">
                Product Photo
              </label>
              <input
                id="photo"
                type="file"
                name="filename"
                onChange={(e) => setSphoto(e.target.files[0])}
                className="mb-4"
              />
            </div>
            <button
              type="submit"
              className="bg-white hover:bg-gray-100 text-gray-800 w-full font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default UpdateProducts;
