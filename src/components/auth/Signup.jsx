import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import { useRegisterUserMutation } from '../api/authAPI/authApiSlice';
import { Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const signupSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    // name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    // mobile: z
    //   .string()
    //   .regex(/^\d{10}$/, 'Mobile number must be a valid 10-digit number'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'], // Assign error to confirmPassword field
    }
  );


const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    // name: '',
    email: '',
    // mobile: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [createUser] = useRegisterUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear the error for the current field as the user types
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('');
  
    const parsed = signupSchema.safeParse(formData);
  
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || 'Invalid input';
      setErrors(firstError);
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await createUser({
        email: formData.email,
        password: formData.password,
        username: formData.username,
      }).unwrap();
  if(response.status === 200){
    navigate('/otp-verification')
  }
    } catch (err) {
      console.error('Error signing up:', err);
      setErrors(err.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 border rounded-md shadow-sm"
                placeholder="Enter your username"
              />
              {errors.username && <div className="text-red-600 text-sm">{errors.username}</div>}
            </div>

            {/* Name Field */}
            {/* <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 border rounded-md shadow-sm"
                placeholder="Enter your name"
              />
              {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
            </div> */}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 border rounded-md shadow-sm"
                placeholder="Enter your email"
              />
              {errors.email && <div className="text-red-600 text-sm">{errors.email}</div>}
            </div>

            {/* Mobile Field */}
            {/* <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                Mobile
              </label>
              <input
                id="mobile"
                name="mobile"
                type="text"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 border rounded-md shadow-sm"
                placeholder="Enter your mobile number"
              />
              {errors.mobile && <div className="text-red-600 text-sm">{errors.mobile}</div>}
            </div> */}

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 border rounded-md shadow-sm"
                placeholder="Enter your password"
              />
              {errors.password && <div className="text-red-600 text-sm">{errors.password}</div>}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 border rounded-md shadow-sm"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <div className="text-red-600 text-sm">{errors.confirmPassword}</div>
              )}
            </div>

            {/* General Error */}
            {errors.general && <div className="text-red-600 text-sm">{errors.general}</div>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 bg-blue-600 text-white rounded-md"
              >
                {loading ? <Loader className="animate-spin h-5 w-5" /> : 'Create Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
