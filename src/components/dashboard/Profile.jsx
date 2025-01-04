
import React, { useState } from 'react';
import { Camera, Loader } from "lucide-react";
import { useUpdateProfileMutation } from "../api/authAPI/authApiSlice";
import { toast } from "../helper/toast";
  //const [errors, setErrors] = useState({});
  

const Profile = ({ userProfile }) => {
  const [loading, setLoading] = useState(false);
  const [profile] = useUpdateProfileMutation();  
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    email: userProfile?.email || '',
    mobile: userProfile?.mobile || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit= async (e) => {
    e.preventDefault();
     setLoading(true);
     try {
             const response = await profile({
               email: formData.email, 
               name: formData.name,
               mobile: formData.mobile         
             }).unwrap();
         if(response.status === 200){
           toast.success(response.message || `Profile updated succesfully`);          
         }
         else{
           toast.error(response.message || 'Something went wrong');
         }
           } catch (err) {
             console.error('Error updating profile:', err);
             const message = err.data?.message || 'Something went wrong';
            // setErrors({ general: message });
             toast.error(message);
           } finally {
             setLoading(false);
           }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gray-100 text-3xl font-bold text-blue-500 flex items-center justify-center">
            {userProfile?.name ? (
              userProfile.name.slice(0, 2).toUpperCase()
            ) : (
              userProfile?.email.slice(0, 2).toUpperCase()
            )}
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700">
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-medium">
            {userProfile?.name || userProfile?.email}
          </h3>
          <p className="text-gray-500">
            Joined on {formatDate(userProfile?.createdAt)}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mobile
          </label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end">
          <button 
          disabled={loading}          
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {loading ? (
                  <Loader className="animate-spin h-5 w-5" />
                ) : (
                  <>
                    Save Changes                    
                  </>
                )}
            
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;