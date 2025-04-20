import React, { useState, useEffect } from 'react';
import { Dna, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import DnaAnimation from './DnaAnimation';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in (you'll need to implement this based on your auth system)
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
    // Clear auth data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    // Redirect to home page
    window.location.href = '/';
  };

  return (
    <header className="fixed w-full bg-transparent z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Dna className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-white">DNAStoreAI</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-indigo-300">Home</Link>
            <Link to="/pricing" className="text-white hover:text-indigo-300">Pricing</Link>
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
              <div className="flex items-center space-x-4">
                <Link to="/signin" className="text-white hover:text-indigo-300">Sign In</Link>
                <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

const Hero = () => (
  <section className="relative h-screen bg-gradient-to-b from-indigo-900 to-black">
    <div className="absolute inset-0 z-0">
      <DnaAnimation />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-white sm:text-7xl md:text-8xl">
          Store Digital Data in DNA
        </h1>
        <p className="mt-6 text-xl text-indigo-200 max-w-3xl mx-auto">
          Convert your digital files into biologically viable DNA sequences using our ML-powered DNA Data Storage technology.
        </p>
        <div className="mt-10 flex justify-center space-x-4">
          <Link to="/dna-options" className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Try It Now
          </Link>
          <Link to="/ml-model" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-indigo-900 transition-colors">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section id="how-it-works" className="relative py-20 bg-black">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
          How It Works
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {[
          { number: "1", title: "Upload Data", description: "Upload your digital files through our secure platform." },
          { number: "2", title: "ML Processing", description: "Our ML algorithms convert and optimize your data for DNA storage." },
          { number: "3", title: "Download Sequence", description: "Receive your optimized DNA sequence ready for synthesis." }
        ].map((step, index) => (
          <div key={index} className="bg-indigo-900/50 backdrop-blur-sm p-8 rounded-xl transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-600 mx-auto mb-6">
              <span className="text-2xl font-bold text-white">{step.number}</span>
            </div>
            <h3 className="text-xl font-medium text-white text-center mb-4">{step.title}</h3>
            <p className="text-indigo-200 text-center">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-black py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center">
          <Dna className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-xl font-bold text-white">DNAStoreAI</span>
        </div>
        <div className="mt-6 md:mt-0 flex space-x-6">
          <a href="#" className="text-indigo-400 hover:text-indigo-300">Privacy</a>
          <a href="#" className="text-indigo-400 hover:text-indigo-300">Terms</a>
          <a href="#" className="text-indigo-400 hover:text-indigo-300">Contact</a>
        </div>
      </div>
      <div className="mt-8 border-t border-indigo-900 pt-8">
        <p className="text-base text-indigo-400 text-center">
          &copy; {new Date().getFullYear()} DNAStoreAI. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage; 