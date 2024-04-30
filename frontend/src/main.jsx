import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import {BrowserRouter,Routes, Route} from "react-router-dom"
import AdminSignUp from './Admin/SignUp.jsx'
import AdminSignIn from './Admin/SignIn.jsx'
import UsersList from './Admin/UsersList.jsx'
import Products from './Admin/Products.jsx'
import Home from './Admin/Home.jsx'
import MailVerification from './Admin/MailVerification.jsx'
import UpdateProducts from './Admin/UpdateProducts.jsx'
import ForgotPassword from './Admin/ForgotPassword.jsx'
import Navbar from './Components/UserPage/Navbar.jsx'
import SignUp from './Components/SignUp.jsx'
import ProductCard from "./Components/UserPage/ProductCard.jsx"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <BrowserRouter>
    <Routes>
      {/*For Admin Panel*/}
      <Route path='/adminpanel' element={<AdminSignUp/>}/>
      <Route path='/adminpanel/home' element={<App/>}/>
      <Route path='/adminpanel/AdminSignIn' element={<AdminSignIn/>}/>
      <Route path='/adminpanel/forgotpass' element={<ForgotPassword/>}/>
      <Route path='/adminpanel/users' element={<UsersList/>}/>
       <Route path='/adminpanel/add-products' element={<Products/>}/>
       <Route path='/adminpanel/products-list' element={<Home/>}/>
       <Route path='/AdminSignIn/mail-verification' element={<MailVerification/>}/>
       <Route path='/home/updateproducts/:id' element={<UpdateProducts/>}/>

       {/* For User */}
       <Route path='/' element={<Navbar/>}/>
       <Route path='/' element={<ProductCard/>}/>

       <Route path='/sign-up' element={<SignUp/>}/>

</Routes>
</BrowserRouter>
  </React.StrictMode>,
)
