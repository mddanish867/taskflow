import React from 'react'
import { CheckCircle, BarChart2, Calendar, Users, ArrowRight, EllipsisVertical, X } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: "Email and password",
      description: "Email and password login with just a few lines of code secured with state of the art Argon2 hashing.",
      icon: <CheckCircle className="w-6 h-6 text-blue-500" />,
      url: "/login"
    },
    {
      title: "Phone (SMS)",
      description: "Log in users without a password using their phone number and SMS verification.",
      icon: <BarChart2 className="w-6 h-6 text-blue-500" />,
      url: "/sms-login"
    },
    {
      title: "Magic URL",
      description: "Passwordless login with a magic link sent to the user's email.",
      icon: <Calendar className="w-6 h-6 text-blue-500" />,
      url: "/magic-login"
    },
    {
      title: "Email OTP",
      description: "Generate a time-based single-use password sent to the user's email.",
      icon: <Users className="w-6 h-6 text-blue-500" />,
      url: "/email-login"
    },
    {
      title: "OAuth 2",
      description: "Authenticate users with existing accounts from GitHub, Google, Facebook, and 30+ other providers.",
      icon: <Users className="w-6 h-6 text-blue-500" />,
      url: "/oAuth"
    },
    {
      title: "Anonymous",
      description: "Create guest sessions for visitors and convert to full accounts when they're ready.",
      icon: <Users className="w-6 h-6 text-blue-500" />,
      url: "/guest-login"
    },
    {
      title: "JWT",
      description: "Deligate access for a user through passing JWT tokens.",
      icon: <Users className="w-6 h-6 text-blue-500" />,
      url: "/login"
    },
    {
      title: "Custom token",
      description: "Implement custom authentication methods like biometric and passkey login by generating custom tokens.",
      icon: <Users className="w-6 h-6 text-blue-500" />,
      url: "/token-login"
    },
    {
      title: "Multi-factor authentication",
      description: "Implementing MFA to add extra layers of security to your app.",
      icon: <Users className="w-6 h-6 text-blue-500" />,
      url: "/enable-2fa"
    }
  ];
  return (
    <>
 {/* Features Section */}
 <div className="py-12 bg-gray-50 pt-32" >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to manage projects
              </p>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:shadow-blue-300 transition-shadow">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-100">
                      {feature.icon}
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">{feature.title}</h3>
                    <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Features