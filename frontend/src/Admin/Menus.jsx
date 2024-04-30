import { Link } from "react-router-dom";
const Menus = () => {
  return (
    <div>
        <div className="bg-lime-300 w-[15%]">
          <ul className="m-6 mt-3 bg-lime-300">
            <li className="m-6  hover:bg-lime-100 active:bg-lime-200">
              <h2><Link to={"home"}>Home</Link></h2>
            </li>
            <li className="m-6  hover:bg-lime-100 active:bg-lime-200">
              <h2><Link to={"products"}>Products</Link></h2>
            </li>
            <li className="m-6 hover:bg-lime-100 active:bg-lime-200 ">
              <h2><Link to={"AdminSignIn"}>Sign In</Link></h2>
            </li>
            <li className="m-6  hover:bg-lime-100 active:bg-lime-200">
              <h2>
                <Link to={"AdminSignUp"}>Sign Up</Link>
              </h2>
            </li>
            <li className="m-6  hover:bg-lime-100 active:bg-lime-200">
              <h2>
                <Link to={"users"}>See Users</Link>
              </h2>
            </li>
          </ul>
        </div>
      </div>
  );
};

export default Menus;
