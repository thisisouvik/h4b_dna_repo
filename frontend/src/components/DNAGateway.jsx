import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dna, Binary, ArrowRight, User, LogOut } from 'lucide-react';

const DNAGateway = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-black/80 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Dna className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-white">DNAStoreAI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/how-it-works" className="text-white hover:text-indigo-300">How It Works</Link>
              <a href="#pricing" className="text-white hover:text-indigo-300">Pricing</a>
              <a href="#docs" className="text-white hover:text-indigo-300">Documentation</a>
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-indigo-900/50 px-4 py-2 rounded-lg">
                    <User className="h-5 w-5 text-indigo-400" />
                    <span className="text-white">{user?.name || user?.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-white hover:text-indigo-300"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/signin" className="px-4 py-2 text-white hover:text-indigo-300">Sign in</Link>
                  <Link to="/signup" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Sign up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-white mb-8 text-center">DNA Data Operations</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Encode Option */}
            <div 
              className="bg-indigo-900/50 backdrop-blur-sm rounded-xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-indigo-900/70"
              onClick={() => navigate('/dna-encoder')}
            >
              <div className="flex flex-col items-center text-center">
                <Dna className="h-16 w-16 text-indigo-400 mb-4" />
                <h2 className="text-2xl font-bold text-white mb-4">Encode to DNA</h2>
                <p className="text-indigo-200 mb-6">
                  Convert your digital data into DNA sequences using our advanced encoding algorithms.
                </p>
                <div className="flex items-center text-indigo-300">
                  <span>Start Encoding</span>
                  <ArrowRight className="ml-2" />
                </div>
              </div>
            </div>

            {/* Decode Option */}
            <div 
              className="bg-indigo-900/50 backdrop-blur-sm rounded-xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-indigo-900/70"
              onClick={() => navigate('/dna-decoder')}
            >
              <div className="flex flex-col items-center text-center">
                <Binary className="h-16 w-16 text-indigo-400 mb-4" />
                <h2 className="text-2xl font-bold text-white mb-4">Decode from DNA</h2>
                <p className="text-indigo-200 mb-6">
                  Convert DNA sequences back into digital data using our decoding technology.
                </p>
                <div className="flex items-center text-indigo-300">
                  <span>Start Decoding</span>
                  <ArrowRight className="ml-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default DNAGateway; 
