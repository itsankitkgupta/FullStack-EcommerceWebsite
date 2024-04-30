import Navbar from "../Components/Navbar"
import Home from './Home'
const Dashboard = ({sidebarToggle,setSidebarToggle}) => {
  return (
    <div className={`${sidebarToggle?" w-full ":" ml-64 "}`}>
        <Navbar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>
        <Home sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>
    </div>
  )
}

export default Dashboard
