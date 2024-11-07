import React from 'react';
import { CheckCircle, BarChart2, Calendar, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TaskFlow = () => {
 const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/login")
  }
  const features = [
    {
      title: "Task Management",
      description: "Organize and track tasks with easy drag-and-drop interfaces",
      icon: <CheckCircle className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Analytics Dashboard",
      description: "Get insights into team performance and project progress",
      icon: <BarChart2 className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Team Calendar",
      description: "Coordinate deadlines and meetings in a shared calendar",
      icon: <Calendar className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Collaboration Tools",
      description: "Work together seamlessly with real-time updates",
      icon: <Users className="w-6 h-6 text-blue-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Added fixed positioning and backdrop blur */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/75 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">TaskFlow</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
              <button 
              onClick={handleGetStarted}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Added padding-top to account for fixed navbar */}
      <div className="pt-16">
        {/* Hero Section */}
        <div className="relative bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block">Streamline Your</span>
                    <span className="block text-blue-600">Project Management</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Boost productivity and collaboration with our intuitive project management platform. 
                    Track tasks, manage teams, and deliver projects on time.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
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

        {/* Footer */}
        <footer className="py-12 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-2xl font-thin tracking-wider mb-6">
                <div className="items-center">
                  <span className="text-2xl font-bold text-blue-600">TaskFlow</span>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                © {new Date().getFullYear()} TaskFlow All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TaskFlow;