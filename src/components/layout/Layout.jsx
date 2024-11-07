import { Outlet } from "react-router-dom";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";
const Layout = ({ children }) => {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar/>
        <main className="flex-grow">
        <Outlet />
        </main>
       <Footer/>
      </div>
    );
  };
  
  export default Layout;