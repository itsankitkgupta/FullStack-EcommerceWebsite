import { Link, useNavigate } from "react-router-dom";
import {FaCog, FaHome, FaPoll,FaRegEnvelope,FaRegFileAlt} from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import Cookies from 'js-cookie'

const Sidebar = ({sidebarToggle}) => {
  const navigate = useNavigate()

  const handlelogout= async()=>{
      // const response = await fetch("http://localhost:3000/logout",{
      //   method:"GET",
      //   headers:{"Content-Type":"application/json"},

      // })
      // if(response.ok){
      //   alert(response.message)
      //   navigate("/adminpanel")
      // }
const promt = prompt("Are you sure?")
if(promt){
  localStorage.clear()
      Cookies.remove("token")
      navigate("/adminpanel")
}
  }
  return (

    <div className={`${sidebarToggle?" hidden ":" block "} w-64 bg-gray-800 fixed h-full px-4 py-2`}>
      <div className="my-2 mb-4">
        <h1 className="text-2x text-white font-bold">Admin Dashboard</h1>
        <hr />
      </div>
      <ul className="mt-3 text-white font-bold">
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <Link to={"/adminpanel/products-list"} className="px-3">
            <FaHome className="inline-block w-6 h-6 mr-2 -mt-2"></FaHome>
         Products
          </Link>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <Link to={"/adminpanel/add-products"} className="px-3">
            <FaRegFileAlt className="inline-block w-6 h-6 mr-2 -mt-2"></FaRegFileAlt>
            Add Products
          </Link>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <Link to={"/adminpanel/users"} className="px-3">
            <FaPoll className="inline-block w-6 h-6 mr-2 -mt-2"></FaPoll>
            Admins List
          </Link>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <a href="" className="px-3">
            <FaRegEnvelope className="inline-block w-6 h-6 mr-2 -mt-2"></FaRegEnvelope>
            Inbox
          </a>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <a href="" className="px-3">
            <FaCog className="inline-block w-6 h-6 mr-2 -mt-2"></FaCog>
            Setting
          </a>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2" onClick={handlelogout} >
          <a href="" className="px-3" >
            <IoIosLogOut className="inline-block w-7 h-7 mr-2 -mt-2"/>
          Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
