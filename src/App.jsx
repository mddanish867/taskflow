import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ForgotPassword from "./components/auth/ForgotPassword"
import Login from "./components/auth/Login"
import TaskFlow from "./components/home/LandingPage"
import Pricing from "./components/pricing/Pricing"
import Contact from "./components/contact/Contact"


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<TaskFlow/>} />
        <Route path="/pricing" element={<Pricing/>} />
        <Route path="/contact" element={<Contact/>} />

      </Routes>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />

      </Routes>
    </Router>      
    </>
  )
}

export default App
