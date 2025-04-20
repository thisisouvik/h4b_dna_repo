import React from 'react';
import { Link } from 'react-router-dom';
import { Dna, Check, X } from 'lucide-react';

const Pricing = () => {
  const tiers = [
    {
      name: 'Basic',
      price: '$1.99/month',
      description: 'Perfect for personal use and small projects',
      features: [
        'Up to 1MB data encoding',
        'Basic encoding methods',
        'Standard compression',
        'Email support',
        '5 encoding jobs per month',
        'No ML-based encoding',
        'No advanced options',
        'No priority support'
      ],
      included: [true, true, true, true, true, false, false, false]
    },
    {
      name: 'Standard',
      price: '$9.99/month',
      description: 'Ideal for professionals and small businesses',
      features: [
        'Up to 10MB data encoding',
        'Advanced encoding methods',
        'Optimized compression',
        'Priority email support',
        'Unlimited encoding jobs',
        'ML-based encoding',
        'Advanced options',
        'Priority support'
      ],
      included: [true, true, true, true, true, true, true, false]
    },
    {
      name: 'Pro',
      price: '$19.99/month',
      description: 'For enterprises and research institutions',
      features: [
        'Unlimited data encoding',
        'Custom encoding methods',
        'Maximum compression',
        '24/7 priority support',
        'Unlimited encoding jobs',
        'Advanced ML-based encoding',
        'Custom advanced options',
        'Dedicated support team'
      ],
      included: [true, true, true, true, true, true, true, true]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-black">
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed w-full bg-black/80 backdrop-blur-sm z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <Dna className="h-8 w-8 text-indigo-600" />
                  <span className="ml-2 text-xl font-bold text-white">DNAStoreAI</span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                {/* Navigation buttons removed */}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-32 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                Simple, Transparent Pricing
              </h1>
              <p className="mt-4 text-xl text-indigo-200">
                Choose the plan that's right for you
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 transform hover:scale-105 transition-transform"
                >
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">{tier.name}</h2>
                    <p className="mt-4 text-4xl font-extrabold text-white">{tier.price}</p>
                    <p className="mt-2 text-indigo-200">{tier.description}</p>
                  </div>

                  <ul className="mt-8 space-y-4">
                    {tier.features.map((feature, index) => (
                      <li key={feature} className="flex items-center">
                        {tier.included[index] ? (
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                        ) : (
                          <X className="h-5 w-5 text-red-500 mr-2" />
                        )}
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Link
                      to="/signup"
                      className="block w-full px-6 py-3 text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-indigo-200">
                Need a custom plan?{' '}
                <Link to="/contact" className="text-white hover:text-indigo-300">
                  Contact us
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Pricing; 