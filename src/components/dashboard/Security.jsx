import React, { useState, useCallback, useEffect } from "react";
import { z } from "zod";
import {
  useUpdatePasswordMutation,
  useEnable2FAMutation,
  useDisable2FAMutation,
} from "../api/authAPI/authApiSlice";
import { Key, Loader } from "lucide-react";
import { toast } from "../helper/toast";
import { jwtDecode } from "jwt-decode";

// Move schema outside component to prevent recreation on each render
const securitySchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Current Password must be at least 8 characters"),
    newPassword: z
      .string()
      .min(8, "New Password must be at least 8 characters"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

const Security = ({ userProfile = {} }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [is2FALoading, setIs2FALoading] = useState(false);
  const [is2FAEnabled, setIS2FAEnabled] = useState(
    userProfile?.is2FAEnabled || false
  );
  const [updatePassword] = useUpdatePasswordMutation();
  const [enable2FA] = useEnable2FAMutation();
  const [disable2FA] = useDisable2FAMutation();

  useEffect(() => {
    if (userProfile) {
      setIS2FAEnabled(userProfile.is2FAEnabled || false);
    }
  }, [userProfile]);

  // Get email from token
  const email = React.useMemo(() => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return null;
      const decodedToken = jwtDecode(token);
      return decodedToken?.email;
    } catch (e) {
      console.error("Error decoding token:", e);
      return null;
    }
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!email) {
      toast.error("Please login again");
      return;
    }

    try {
      const parsed = securitySchema.safeParse(formData);

      if (!parsed.success) {
        const fieldErrors = {};
        parsed.error.issues.forEach((issue) => {
          fieldErrors[issue.path[0]] = issue.message;
        });
        setErrors(fieldErrors);
        return;
      }

      setLoading(true);
      const response = await updatePassword({
        email,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      }).unwrap();

      if (response.success) {
        toast.success(response.message || "Password updated successfully!");
        // Clear form after successful update
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } else {
        toast.error(response.message || "Failed to update password");
      }
    } catch (err) {
      console.error("Error updating password:", err);
      const message = err.data?.message || "Something went wrong";
      setErrors({ general: message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleEnable2FA = async (e) => {
    try {
      setIs2FALoading(true);
      let response;

      if (!is2FAEnabled) {
        // Enable 2FA
        response = await enable2FA({ email }).unwrap();
        if (response.success) {
          setIS2FAEnabled(true);
          localStorage.setItem("is2FAEnabled", true)
          toast.success(response.message || "2FA enabled successfully!");
        }
      } else {
        // Disable 2FA
        response = await disable2FA({ email }).unwrap();
        if (response.success) {
          localStorage.setItem("is2FAEnabled", true)
          setIS2FAEnabled(false);
          toast.success(response.message || "2FA disabled successfully!");
        }
      }

      if (!response.success) {
        toast.error(
          response.message ||
            `Failed to ${is2FAEnabled ? "disable" : "enable"} 2FA`
        );
      }
    } catch (err) {
      console.error("Error enabling 2FA:", err);
      const message = err.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setIs2FALoading(false);
    }
  };
  const fields = [
    {
      label: "Current Password",
      name: "currentPassword",
      type: "password",
      placeholder: "Enter your current password",
    },
    {
      label: "New Password",
      name: "newPassword",
      type: "password",
      placeholder: "Enter your new password",
    },
    {
      label: "Confirm New Password",
      name: "confirmNewPassword",
      type: "password",
      placeholder: "Confirm your new password",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-4">Change Password</h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {fields.map(({ label, name, type, placeholder }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id={name}
                      name={name}
                      type={type}
                      value={formData[name]}
                      onChange={handleChange}
                      className={`block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                        errors[name] ? "border-red-600" : "border-gray-300"
                      }`}
                      placeholder={placeholder}
                    />
                    {errors[name] && (
                      <div className="text-red-600 text-sm mt-1">
                        {errors[name]}
                      </div>
                    )}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <Key className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {errors.general && (
              <div className="text-red-600 text-sm mt-2">{errors.general}</div>
            )}

            <div className="mt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 rounded-md ${
                  loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                } text-white transition-colors`}
              >
                {loading ? (
                  <Loader className="animate-spin h-5 w-5" />
                ) : (
                  "Update Password"
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="pt-6">
          <h3 className="text-lg font-medium mb-4">
            Two-Factor Authentication{" "}
            <span className="text-gray-600 p-2 text-sm font-normal  rounded-full bg-green-200 ">
              {is2FAEnabled ? "enabled" : "disabled"}
            </span>
          </h3>
          <button
            disabled={is2FALoading}
            onClick={handleEnable2FA}
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {is2FALoading ? (
              <Loader className="animate-spin h-5 w-5" />
            ) : is2FAEnabled ? (
              "Disable 2FA"
            ) : (
              "Enable 2FA"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Security;
