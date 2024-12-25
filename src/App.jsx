import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ForgotPassword from "./components/auth/ForgotPassword"
import Login from "./components/auth/Login"
import LoginwithUsername from "./components/auth/LoginwithUsername"

import TaskFlow from "./components/home/LandingPage"
import Pricing from "./components/pricing/Pricing"
import Contact from "./components/contact/Contact"
import Layout from "./components/layout/Layout"
import SignupForm from "./components/auth/Signup"
import Dashboard from "./components/dashboard/dashboard"


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route element={<Layout/>}>
        <Route path="/" element={<TaskFlow/>} />
        <Route path="/pricing" element={<Pricing/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/dashboard" element={<Dashboard/>} />

        </Route>
        <Route path="/signup" element={<SignupForm/>} />
        <Route path="/loginwithUsername" element={<LoginwithUsername/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
      </Routes>
      
    </Router>      
    </>
  )
}

export default App
