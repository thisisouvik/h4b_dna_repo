import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dna, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import DnaAnimation from './DnaAnimation';

const Auth = ({ mode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: mode === 'signup' ? '' : undefined
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Here you would typically make an API call to your backend
      console.log('Form submitted:', formData);
      navigate('/dna-encoder');
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Animation */}
      <DnaAnimation />

      {/* Main Content */}
      <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-indigo-900/50 backdrop-blur-sm rounded-xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <Dna className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-white">
                {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
              </h1>
              <p className="mt-2 text-indigo-200">
                {mode === 'signup' 
                  ? 'Join us to start encoding your data in DNA'
                  : 'Sign in to continue your DNA encoding journey'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {mode === 'signup' && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-indigo-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-3 bg-indigo-800/50 border border-indigo-700 rounded-lg text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-indigo-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-3 bg-indigo-800/50 border border-indigo-700 rounded-lg text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-indigo-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-3 bg-indigo-800/50 border border-indigo-700 rounded-lg text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-900 transition-colors"
              >
                {mode === 'signup' ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-indigo-200">
                {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
                <Link
                  to={mode === 'signup' ? '/signin' : '/signup'}
                  className="ml-2 text-indigo-400 hover:text-indigo-300"
                >
                  {mode === 'signup' ? 'Sign In' : 'Create Account'}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth; 