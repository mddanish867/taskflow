import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/auth/ForgotPassword";
import Login from "./components/auth/Login";
import LoginwithUsername from "./components/auth/LoginwithUsername";
import OTPVerification from "./components/auth/OTPVerification";
import TaskFlow from "./components/home/LandingPage";
import Pricing from "./components/pricing/Pricing";
import Contact from "./components/contact/Contact";
import Layout from "./components/layout/Layout";
import SignupForm from "./components/auth/Signup";
import Dashboard from "./components/dashboard/dashboard";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<TaskFlow />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/otp-verification" element={<OTPVerification />} />
            <Route path="/login" element={<LoginwithUsername />} />
            <Route path="/otp-login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
