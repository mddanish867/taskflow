import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      description: 'Perfect for individuals and small projects',
      features: [
        'Up to 5 projects',
        '2 team members',
        'Basic task management',
        '5GB storage',
        'Email support'
      ],
      buttonText: 'Get Started',
      highlighted: false
    },
    {
      name: 'Pro',
      price: '$12',
      period: 'per user/month',
      description: 'Best for growing teams and organizations',
      features: [
        'Unlimited projects',
        'Unlimited team members',
        'Advanced task management',
        '50GB storage',
        'Priority email support',
        'Custom workflows',
        'Advanced analytics',
        'Team collaboration tools'
      ],
      buttonText: 'Start Free Trial',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large-scale organizations and special requirements',
      features: [
        'Everything in Pro',
        'Unlimited storage',
        'Dedicated support',
        'Custom integrations',
        'Advanced security',
        'API access',
        'Audit logs',
        'SLA guarantee'
      ],
      buttonText: 'Contact Sales',
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the perfect plan for your needs
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl shadow-xl overflow-hidden ${
                plan.highlighted
                  ? 'border-2 border-blue-600 transform scale-105'
                  : 'border border-gray-200'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 inset-x-0 bg-blue-600 text-white text-xs text-center py-2 px-4">
                  Most Popular
                </div>
              )}
              <div className="bg-white p-8">
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-gray-500">{plan.description}</p>
                </div>
                <div className="mt-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="ml-2 text-gray-500">{plan.period}</span>
                    )}
                  </div>
                </div>
                <div className="mt-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <button
                    type="button"
                    className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md ${
                      plan.highlighted
                        ? 'text-white bg-blue-600 hover:bg-blue-700'
                        : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    {plan.buttonText}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600">
            Need a custom solution?{' '}
            <a href="/contact" className="text-blue-600 hover:text-blue-500">
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;