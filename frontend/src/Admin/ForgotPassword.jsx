import { useState } from "react";
import Navbar from "../Components/Navbar";
import toast, { Toaster } from "react-hot-toast";
const MailVerification = () => {
  const [email, setEmail] = useState();
  const handleSignIn = async () => {
    try {
      const API = await fetch("http://localhost:3000/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });
      // const data = await API.json();
      if (API.ok) {
toast.success("OTP Sent Successfully!..")
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
                  Email
                </label>
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
              <div className="float-end pt-3">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleSignIn}
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
