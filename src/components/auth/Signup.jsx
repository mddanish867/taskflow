import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import { useRegisterUserMutation } from '../api/authAPI/authApiSlice';
import { Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '../helper/toast';

const signupSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
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
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [createUser] = useRegisterUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = useCallback(
    (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    },
    [formData]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const parsed = signupSchema.safeParse(formData);

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
      const response = await createUser({
        email: formData.email,
        password: formData.password,
        username: formData.username,
      }).unwrap();
  if(response.status === 200){
    toast.success(response.message || 'Account created successfully!');
    localStorage.setItem('email', formData.email);
    navigate('/otp-verification')
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
      <div className="flex justify-center">
        <a href="/" className="text-3xl font-bold text-blue-600">
          SooraAuth
        </a>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            already have an account?
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {['username', 'email', 'password', 'confirmPassword'].map((field) => (
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

            {errors.general && <div className="text-red-600 text-sm">{errors.general}</div>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 rounded-md ${
                  loading ? 'bg-blue-500' : 'bg-blue-600'
                } text-white`}
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