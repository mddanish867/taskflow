import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/auth/ForgotPassword";
import Login from "./components/auth/Login";
import LoginwithUsername from "./components/auth/LoginwithUsername";
import OTPVerification from "./components/auth/OTPVerification";
import TaskFlow from "./components/home/LandingPage";
import Pricing from "./components/pricing/Pricing";
import Contact from "./components/contact/Contact";
import Feature from "./components/features/Features"
import Layout from "./components/layout/Layout";
import SignupForm from "./components/auth/Signup";
import Dashboard from "./components/dashboard/dashboard";
import { Provider } from "react-redux";
import { store } from "./store/store";
import VerifyOTP from "./components/auth/VerifyOTP";
import ResetPassword from "./components/auth/ResetPassword";
import PrivateRoute from "./components/utils/PrivateRoute";
import AccountSelection from "./components/auth/AccountSelection";

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
              <Route path="/features" element={<Feature />} />

            </Route>
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}

            <Route path="/signup" element={<SignupForm />} />
            <Route path="/otp-verification" element={<OTPVerification />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/add-account" element={<AccountSelection />} />
            <Route path="/login" element={<LoginwithUsername />} />
            <Route path="/otp-login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            {/* 
Private Route */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
