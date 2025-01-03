import React, { useState, useCallback } from "react";
import { Mail, Lock, Loader, ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../api/authAPI/authApiSlice";
import { toast } from "../helper/toast";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loggedinUser] = useLoginUserMutation();
  const dispatch = useDispatch();

  const handleChange = useCallback(
    (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    },
    [formData]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const parsed = loginSchema.safeParse(formData);
  if (!parsed.success) {
    const fieldErrors = parsed.error.issues.reduce(
      (acc, issue) => ({ ...acc, [issue.path[0]]: issue.message }),
      {}
    );
    setErrors(fieldErrors);
    toast.error(fieldErrors[Object.keys(fieldErrors)[0]]);
    return;
  }
    setLoading(true);
    try {
      const response = await loggedinUser({
        password: formData.password,
        email: formData.email,
      }).unwrap();
      if (response.status === 200) {
        toast.success(response.message || "Account created successfully!");
        if (response.access_token) {
          localStorage.setItem("access_token", response.access_token);
        }
        navigate("/dashboard");
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      const message = error.data?.message || "Something went wrong";
      setErrors({ general: message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const continueWithEmail = async () => {
    navigate("/otp-login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <a href="/">
            <span className="text-3xl font-bold text-blue-600">SooraAuth</span>
          </a>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <a
            href="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            create a new account
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>         

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader className="animate-spin h-5 w-5" />
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
            <div className="text-center">
                <a
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
          </form>

          {/* Continue with email, magic link, and SSO buttons */}
          {/* (the buttons remain the same as in the original code) */}
        </div>
      </div>
    </div>
  );
};

export default Login;
