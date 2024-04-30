import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFacebook} from '@fortawesome/free-brands-svg-icons';
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const Footer = () => {
  const[Email,setEmail]=useState();
  const sendMail = async () => {
    const response = await fetch("http://localhost:3000/api/v1/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Mail: Email })
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error("An error occurred from backend during sending mail");
    }
  
    if (data) {
      toast.success("Subscribed to newsletter successfully");
    } else {
      toast.success("Mail couldn't be sent");
    }
  };
  
  return (
    <div>
      <hr />
      <footer className="bg-lime-300">
        <div className="container mx-auto py-3 px-3">
          <div className="grid md:grid-cols-12 grid-cols-1 gap-7">
            <div className="lg:col-span-4 col-span-12">
              <div className="mx-6 ">
                <p>
                  LABYRINTH GLOBAL SOLUTIONS has the required experience to help
                  architect, design, develop and deliver any technical solution
                  to your organization..
                </p>
              </div>
              <div className="lg:col-span-2 md:col-span-4 col-span-12">
                <h3 className="tracking-wide font-semibold">
                  &copy; 2024<span>Labrynth Global Solutions</span>
                </h3>
                <address>
                  <p>Govt Printing Press Road, New Market, Hyderabad</p>
                </address>
              </div>
            </div>
            <div>
              Contact info +91 8919078185 info@labyrinthglobalsolutions Address:
              Cyber Space Building, 5th Floor, Madhapur Hi-Tech City, 500081
            </div>
            <div>
              <h3 className="tracking-wide font-semibold text-xl">Company</h3>
              <ul className="list-none mt-2 space-y-2">
                <li className="hover:text-lime-900 ease-in-out transition-all duration-500 font-medium">
                  <Link to={"/"}>About Us</Link>
                </li>
                <li className="hover:text-lime-900 ease-in-out transition-all duration-500 font-medium">
                  <Link to={"/"}>Services</Link>
                </li>
                <li className="hover:text-lime-900 ease-in-out transition-all duration-500 font-medium">
                  <Link to={"/"}>Pricing</Link>
                </li>

                <li className="hover:text-lime-900 ease-in-out transition-all duration-500 font-medium">
                  <Link to={"/"}>FAQ</Link>
                </li>

                <li className="hover:text-lime-900 ease-in-out transition-all duration-500 font-medium">
                  <Link to={"/"}>Policies</Link>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-3 md:col-span-3 col-span-12">
              <h3 className="tracking-wide text-xl font-semibold">
                Our Services
              </h3>
              <ul className="list-none mt-2 space-y-2">
                <li className="hover:text-lime-900 ease-in-out transition-all duration-500 font-medium">
                  Polarion ALM
                </li>
                <li className="hover:text-lime-900 ease-in-out transition-all duration-500 font-medium">
                  SAAS & Cloud Solutions
                </li>
                <li className="hover:text-lime-900 ease-in-out transition-all duration-500 font-medium">
                  Mendix
                </li>
                <li className="hover:text-lime-900 ease-in-out transition-all duration-500 font-medium">
                  Web Development
                </li>
                <li className="hover:text-lime-900 ease-in-out transition-all duration-500 font-medium">
                  Total Visits: 0
                </li>
              </ul>
            </div>
            <div className="lg:col-span-3 md:col-span-4 col-span-12">
              <h5 className="tracking-wide font-semibold text-xl">
                Newsletter
              </h5>
              <p className="mt-6">Sign up and recieve the latest via email</p>
              <label htmlFor="email-input">
                Write your email <span className="text-red-600">*</span>
                <input
                  className="mt-3 w-full px-2 py-3 h-10 bg-transparent rounded outline-none border border-gray-500 focus:border-[FFCDA#] focus:ring-0"
                  type="email"
                  id="email-input"
                  placeholder="name@example.com"
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </label>
              <button onClick={sendMail} type="submit" className="mt-2 py-2 px-6 duration-500 tracking-wide border text-base text-center border-slate-700 text-black rounded-md w-full hover:bg-lime-500">Submit</button>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-700">
 <div className="md:text-left text-center container mx-auto py-4 px-6">
<p className="mb-0">
  &copy; 
  {
    new Date().getFullYear()
  }&nbsp;
   Ankit Kumar Gupta&nbsp;
   <FontAwesomeIcon icon={faInstagram} />&nbsp;
   <FontAwesomeIcon icon={faFacebook} />&nbsp;
<FontAwesomeIcon icon={faSmile} />

</p>
 </div>
        </div>
      </footer>
      <Toaster/>
    </div>
  );
};

export default Footer;
