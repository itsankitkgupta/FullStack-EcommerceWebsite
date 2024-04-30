import { useState } from 'react'
import Dashboard from './Admin/Dashboard'
import Sidebar from './Admin/Sidebar'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

function App() {
const[sidebarToggle,setSidebarToggle]=useState(false)

const token = Cookies.get("token")

const navigate=useNavigate()

 if(!token){
  navigate('/adminpanel')
  return
 }

  return (
    <>
<Sidebar sidebarToggle={sidebarToggle}/>
<Dashboard sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>

{/* <Menus/> */}
{/* <Footer/> */}

    </>
  )
}

export default App
