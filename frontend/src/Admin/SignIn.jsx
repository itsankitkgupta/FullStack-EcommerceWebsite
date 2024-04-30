import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import Cookies from 'js-cookie'
const AdminSignIn = () => {
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const API = await fetch("http://localhost:3000/api/v1/AdminSignIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email:email, password: password }),
      });

  

      if (API.ok) {
        const data = await API.json();

        const token = data.AuthToken 

       Cookies.set("token",token)

        toast("Signin Successful");
        localStorage.setItem("name",email)

        setTimeout(() => {  
        navigate("/adminpanel/home");
          
  },1000);
      } else{
        toast("Please enter a valid email or password");
        setTimeout(() => {
          navigate("/adminpanel/AdminSignIn")
        }, 2000);
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      // Optionally display a user-friendly error message
    }
  };

  return (
    <>
      <Navbar />
          <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-xl font-bold text-center">Sign In</h1>
        </div>
        <div className="space-y-6" >
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-width-1"
                value={email}
                placeholder="Email.."
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-width-1"
                value={password}
                placeholder="password.."
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
              onClick={handleSignIn}
            >
              Login
            </button>
          </div>
          <div>
  <h2 ><Link to={"/adminpanel/forgotpass"}>Forgot Password?</Link></h2>
</div>
        </div>
      </div>
    </div>
<Toaster/>
    </>
  );
};

export default AdminSignIn;
