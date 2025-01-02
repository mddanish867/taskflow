import React, { useState, useCallback } from "react";
import { ArrowRight, Loader } from "lucide-react";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { useForgotPasswordMutation } from "../api/authAPI/authApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "../helper/toast";


const forgotPassSchema = z
  .object({   
    email: z.string().email('Invalid email address'),  
  });

const ForgotPassword = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [forgotPass] = useForgotPasswordMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
  });

  
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
  
      const parsed = forgotPassSchema.safeParse(formData);
  
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
        const response = await forgotPass({
          email: formData.email,          
        }).unwrap();
    if(response.status === 200){
      toast.success(response.message || `OTP successfully sent to your ${formData.email}!`);
      localStorage.setItem("email",formData.email)
      navigate('/verify-otp')
    }
    else{
      toast.error(response.message || 'Something went wrong');
    }
      } catch (err) {
        console.error('Error signing up:', err);
        const message = err.data?.message || 'Something went wrong';
        setErrors({ general: message });
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <a href="/">
            <span className="text-3xl font-bold text-blue-600">SooraAuth</span>
          </a>{" "}
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset your password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
          {['email'].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700 capitalize"
                >
                  {field.replace('confirmPassword', 'Confirm Password')}
                </label>
                <input
                  id={field}
                  name={field}
                  type={field.includes('password') ? 'password' : 'text'}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm outline-none focus:ring-1 focus:ring-blue-400 ${
                    errors[field] && 'border-red-600'
                  }`}
                  placeholder={`Enter your ${field}`}
                />
                {errors[field] && <div className="text-red-600 text-sm">{errors[field]}</div>}
              </div>
            ))}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loading ? (
                  <Loader className="animate-spin h-5 w-5" />
                ) : (
                  <>
                    Send Reset OTP
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
