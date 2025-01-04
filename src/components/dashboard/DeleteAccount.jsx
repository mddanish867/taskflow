import React, { useState, useCallback } from 'react';
import { AlertTriangle, Loader } from "lucide-react";
import { z } from 'zod';
import { useDeleteAccountMutation } from '../api/authAPI/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from '../helper/toast';

const deleteSchema = z.object({    
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  reason: z.string().optional(),
  deleteConfirmation: z.string().refine(val => val === 'DELETE', {
    message: 'Please type DELETE to confirm'
  })
});

const DeleteAccount = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    reason: '',
    deleteConfirmation: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [deleteAccount] = useDeleteAccountMutation();
  const navigate = useNavigate();

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

    const parsed = deleteSchema.safeParse(formData);

    if (!parsed.success) {
      const fieldErrors = parsed.error.issues.reduce(
        (acc, issue) => ({ ...acc, [issue.path[0]]: issue.message }),
        {}
      );
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await deleteAccount({
        email: formData.email,
        password: formData.password,
        reason: formData.reason
      }).unwrap();

      if (response.status === 200) {
        localStorage.clear();
      // Clear specific cookies
      document.cookie.split(";").forEach(cookie => {
        const name = cookie.split("=")[0].trim();
        const domainParts = window.location.hostname.split(".");
      
        // Try to delete cookies for all parent domains
        domainParts.forEach((_, index) => {
          const domain = domainParts.slice(index).join(".");
          const pathList = ["/", "/somepath"]; // Include more paths if known
          
          pathList.forEach(path => {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; domain=${domain};`;
          });
        });
      
        // Try without specifying the domain (defaults to current domain)
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
      });
      
        
        toast.success(response.message || 'Account deleted successfully');        
        navigate('/signup');
      } else {
        toast.error(response.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('Error deleting account:', err);
      const message = err.data?.message || 'Something went wrong';
      setErrors({ general: message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
          <div>
            <h3 className="text-red-600 font-medium">
              Delete Your Account
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Once you delete your account, there is no going back. Please
              be certain.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm your email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter your email"
          />
          {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Enter your password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`mt-1 block w-full border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter your password"
          />
          {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reason for leaving (optional)
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tell us why you're deleting your account"
          />
          {errors.reason && <div className="text-red-600 text-sm mt-1">{errors.reason}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type "DELETE" to confirm
          </label>
          <input
            type="text"
            name="deleteConfirmation"
            value={formData.deleteConfirmation}
            onChange={handleChange}
            className={`mt-1 block w-full border ${
              errors.deleteConfirmation ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500`}
            placeholder="DELETE"
          />
          {errors.deleteConfirmation && (
            <div className="text-red-600 text-sm mt-1">{errors.deleteConfirmation}</div>
          )}
        </div>

        {errors.general && <div className="text-red-600 text-sm">{errors.general}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex justify-center items-center"
        >
          {loading ? <Loader className="animate-spin h-5 w-5" /> : 'Permanently Delete Account'}
        </button>
      </form>
    </div>
  );
};

export default DeleteAccount;