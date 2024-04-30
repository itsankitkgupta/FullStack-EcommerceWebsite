import { useState } from "react"
import Navbar from "../Components/Navbar"
import { useNavigate,Link } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"

const AdminSignIn = () => {
const[name,setname]=useState("")
const[email,setemail]=useState("")
const[phoneno,setphoneno]=useState("")
const[password,setpassword]=useState("")
const navigate = useNavigate()

  const handlesignup = async () => {
    try {
      const API = await fetch("http://localhost:3000/api/v1/AdminSignUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name:name, email:email, phoneno:phoneno, password:password }),
      });
      const data = await API.json();
  
      if(!name|| !email || !phoneno||!password){
        toast("All fields are necessary ");
        if(data.message==="Email id already exist") {
          alert("Email id already exit")
        }
      }else if (data) {
        toast.success("Verification mail sent successfully");
        setTimeout(() => {
        navigate("/AdminSignIn/mail-verification");
          }, 2000);
      }
    } catch (error) {
      toast("An error occurred during signup " + error.message);
    }
  };
  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-xl font-bold text-center">Sign Up</h1>
        </div>
        <div className="space-y-6" >
          <div className="rounded-md shadow-sm -space-y-px">
          <div className="relative">
              <label htmlFor="name" className="sr-only">Name</label><br />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-width-1"
                value={name}
                placeholder="Name.."
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="email" className="sr-only">E-mail</label><br />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-width-1"
                value={email}
                placeholder="Email.."
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="phoneno" className="sr-only">Phone no</label><br />
              <input
                id="phoneno"
                name="phoneno"
                type="text"
                autoComplete="phoneno"
                required
                className="rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-width-1"
                value={phoneno}
                placeholder="Phone no.."
                onChange={(e) => setphoneno(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label><br />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-width-1"
                value={password}
                placeholder="Password"
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-width-1"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <button
              type="button"
              className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handlesignup}
            >
              Sign Up
            </button>
          </div>
          <h2 className="cursor-pointer hover:text-blue-800"><Link to={"/adminpanel/AdminSignIn"}>Already a user?</Link></h2>

        </div>
      </div>
    </div>
    <Toaster/>
    </>
  )
}

export default AdminSignIn
