import { useEffect, useState } from "react";
import Navbar from "../Components/UserPage/Navbar"
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie"
const UsersList = () => {
  const [users, setUsers] = useState([]);

const token = Cookies.get("token")
console.log(token, "userlist")
  const getUsers = async () => {
    const userlist = await fetch("http://localhost:3000/api/v1/users", {
      method: "GET",
      headers: { "Content-Type": "application/json",
    "Authorization":`Bearer ${token}`
    },
    });
    const data = await userlist.json();
    setUsers(data.data);
  };

  useEffect(() => {
    getUsers();
  
  }, []);

const deleUser = async(x)=>{
const sure= confirm("Are you sure?")
if(sure){
  const user = await fetch("http://localhost:3000/api/v1/users",{
method:"DELETE",
headers:{"Content-type":"application/json"},
body:JSON.stringify({id:x})
  })
  const data = user.json({})
  getUsers()
  if(data)toast("User deleted successfully!")
}
}
  return (
    <div>
      <Navbar/>
   
      <table className="border-collapse  border-slate-600  text-left w-full h-full">
        <caption className="text-lg font-medium">
          List of Users with Admin Priviledges
        </caption>
      <thead className="border border-slate-600 bg-lime-200  ">
          <tr className="border border-gray-500">
            <th className="border border-slate-600">Name</th>
            <th className="border border-slate-600">Email</th>
            <th className="border border-slate-600">Phone no</th>
            <th className="border border-slate-600">Edit</th>

          </tr>
        </thead>
        <tbody className="bg-lime-200 text-left border-collapse  border-slate-600 " >
          {users&&users.map((user) =>{return (
            <tr key={user._id}>
              <td className="border border-slate-600">{user.Name}</td>
              <td className="border border-slate-600">{user.Email}</td>
              <td className="border border-slate-600">{user.PhoneNo}</td>
              <td className="border border-slate-600"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"onClick={()=>deleUser(user._id)}> Delete</button></td>
            </tr>
          )})}
        </tbody>
      </table>
      <Toaster/>
    </div>
  );
};

export default UsersList;
