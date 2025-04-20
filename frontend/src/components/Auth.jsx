import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dna } from 'lucide-react';

const Auth = () => {
  const location = useLocation();
  const isSignUp = location.pathname === '/signup';
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: isSignUp ? '' : undefined,
    confirmPassword: isSignUp ? '' : undefined
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log('Form submitted:', formData);
  };

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
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-32 pb-12">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white">
                  {isSignUp ? 'Create an Account' : 'Sign In to Your Account'}
                </h1>
                <p className="mt-2 text-indigo-200">
                  {isSignUp 
                    ? 'Join DNAStoreAI to start encoding your data'
                    : 'Welcome back! Please sign in to continue'
                  }
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {isSignUp && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                {isSignUp && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-gray-300">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <Link
                      to={isSignUp ? '/signin' : '/signup'}
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      {isSignUp ? 'Sign In' : 'Sign Up'}
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Auth; 