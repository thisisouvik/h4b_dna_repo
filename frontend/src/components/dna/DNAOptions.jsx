import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dna, ArrowRight } from 'lucide-react';

const DNAOptions = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-32 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-white mb-12 text-center">DNA Data Tools</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Encoder Option */}
              <div 
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 cursor-pointer transition-all duration-300 hover:bg-gray-800/50"
                onClick={() => navigate('/dna-encoder')}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">DNA Encoder</h2>
                  <ArrowRight className="h-6 w-6 text-indigo-400" />
                </div>
                <p className="mt-4 text-gray-300">
                  Convert your text or files into DNA sequences. Perfect for data storage and transmission.
                </p>
              </div>

              {/* Decoder Option */}
              <div 
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 cursor-pointer transition-all duration-300 hover:bg-gray-800/50"
                onClick={() => navigate('/dna-decoder')}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">DNA Decoder</h2>
                  <ArrowRight className="h-6 w-6 text-indigo-400" />
                </div>
                <p className="mt-4 text-gray-300">
                  Convert DNA sequences back into their original text or file format.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DNAOptions; 