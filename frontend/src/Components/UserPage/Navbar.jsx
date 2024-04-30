import { IoMenuOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import clsx from "clsx";
import ProductCard from "./ProductCard";
const Navbar = () => {
  const [isSidedown, setisSidedown] = useState(false);
  return (
    <>
      <nav className="flex justify-between px-8 items-center py-6 lg:px-24 ">
        <div className="flex items-center gap-8">
        <section className="flex items-center gap-4">
          <IoMenuOutline
            className="text-3xl cursor-pointer lg:hidden"
            onClick={() => setisSidedown(true)}
          />
          <Link to={"/"} className="text-4xl font-mono">
          Shopify
          </Link>
        </section>
        <Link to={"/"} className="hidden lg:block font-bold text-gray-600 hover:text-blue-500 transition-all">
          Collection
        </Link>
        <Link to={"/"} className="hidden lg:block font-bold text-gray-600 hover:text-blue-500 transition-all">
          Men
        </Link>
        <Link to={"/"} className=" hidden lg:block font-bold text-gray-600 hover:text-blue-500 transition-all">
          Women
        </Link>
        <Link to={"/"} className=" hidden lg:block font-bold text-gray-600 hover:text-blue-500 transition-all">
          Trendy
        </Link>
        <Link to={"/"} className="hidden lg:block font-bold text-gray-600 hover:text-blue-500 transition-all">
          About
        </Link>
        <Link to={"/"} className="hidden lg:block font-bold text-gray-600 hover:text-blue-500 transition-all">
          Contact
        </Link>
        </div>
        {/* side bar mobile menu */}
        <div
          className={clsx(
            "fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0 -translate-x-full transition-all",
            isSidedown && "translate-x-0"
          )}
        >
          <section className="text-black bg-white flex-column absolute left-0 top-0 h-screen p-8 gap-8 z-50 w-56">
            <IoCloseSharp
              className="mt-0 mb-8 text-3xl cursor-pointer"
              onClick={() => setisSidedown(false)}
            />
            <Link to={"/"} className="font-bold">
              Collection
            </Link>
            <Link to={"/"} className="font-bold">
              Men
            </Link>
            <Link to={"/"} className="font-bold">
              Women
            </Link>
            <Link to={"/"} className="font-bold">
              Trendy
            </Link>
            <Link to={"/"} className="font-bold">
              About
            </Link>
            <Link to={"/"} className="font-bold">
              Contact
            </Link>
          </section>
        </div>
        <section className="flex items-center gap-4">
          <MdOutlineShoppingCart className="text-3xl" />
          <img
            src="https://i.pravatar.cc/50"
            alt=""
            className="h-8 w-8 rounded-full"
          />
        </section>
      </nav>
      <ProductCard/>
      <hr />
    </>
  );
};

export default Navbar;
