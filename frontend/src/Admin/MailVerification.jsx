import { useState } from "react";
import Navbar from "../Components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MailVerification = () => {
const navigate = useNavigate()
  const [code, setcode] = useState();
  const handleverification = async () => {
    try {
      const API = await fetch("http://localhost:3000/api/v1/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({verificationCode: code}),
      });
      // const data = await API.json();
      if (API.ok) {
toast.success("Email verification successfull");
setTimeout(() => {
  navigate("/adminpanel/AdminSignIn")
}, 1000);

      }else{
        toast.error("Mail verification unsuccessfull")
      }
    } catch (error) {
      console.error("An error occurred in sending mail" + error.message);
    }
  };
  return (
    <>
      <Navbar />
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="text-xl font-bold text-center">Mail Verification</h1>
          </div>
          <div className="space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="relative">
                <label htmlFor="email" className="sr-only">
                Verification Code
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-width-1"
                  value={code}
                  placeholder="Code..."
                  onChange={(e) => setcode(e.target.value)}
                />
              </div>
              <div className="float-end pt-3">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleverification}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster/>
    </>
  );
};

export default MailVerification;
