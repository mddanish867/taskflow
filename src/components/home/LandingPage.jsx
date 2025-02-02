import React from 'react';
import { CheckCircle, BarChart2, Calendar, Users, ArrowRight, EllipsisVertical, X } from 'lucide-react';

const TaskFlow = () => {
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
    <div className="min-h-screen bg-white">  
      <div className="pt-16">
        {/* Hero Section */}
        <div className="relative bg-white overflow-hidden mt-2">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
              <main className="mx-auto max-w-7xl px-4 sm:py-20 py-16 sm:px-6 lg:px-8">
                <div className="text-center">
                  <span className='border border-blue-400 mt-12 rounded-full p-2 text-blue-500'>VERSION 2.0 NOW AVAILABLE</span>

                  <h1 className="text-4xl mt-8 tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block">Streamline Your</span>
                    <span className="block text-blue-600">Authentication with Soora Auth.</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                    Boost productivity and collaboration with our intuitive project management platform. 
                    Track tasks, manage teams, and deliver projects on time.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                    <div className="rounded-md shadow">
                      <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                        Start Free Trial
                      </button>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10">
                        Watch Demo
                      </button>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12 bg-gray-50" id="features">
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

        {/* CTA Section */}
        <div className="bg-blue-600">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="block text-blue-200">Start your free trial today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50">
                  Get started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>     
      </div>
    </div>
  );
};

export default TaskFlow;