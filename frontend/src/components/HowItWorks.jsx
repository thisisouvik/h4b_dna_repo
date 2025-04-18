import React from 'react';
import { Binary, Code, Dna, ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Dna className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">DNAcode</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#docs" className="text-gray-600 hover:text-gray-900">Documentation</a>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Process Flow Section */}
        <section className="mb-20">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
            How DNA Data Storage Works
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1: Binary */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mx-auto mb-4">
                <Binary className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">Binary Data</h3>
              <p className="text-gray-600 text-center">
                Your digital files are converted into binary format (0s and 1s), the fundamental language of computers.
              </p>
            </motion.div>

            {/* Step 2: Encoded */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mx-auto mb-4">
                <Code className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">Encoding</h3>
              <p className="text-gray-600 text-center">
                Binary data is encoded into DNA bases (A, T, C, G) using our advanced encoding algorithm.
              </p>
            </motion.div>

            {/* Step 3: Optimized DNA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mx-auto mb-4">
                <Dna className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">Optimized DNA</h3>
              <p className="text-gray-600 text-center">
                The DNA sequence is optimized for synthesis, ensuring perfect GC content and avoiding problematic patterns.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Problems Avoided Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Problems Our Encoder Solves
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">Common Issues</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Unbalanced GC content leading to synthesis failures
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Homopolymer runs causing sequencing errors
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Secondary structure formation
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Repetitive sequences
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">Our Solutions</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  ML-powered GC content optimization
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Homopolymer length control
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Secondary structure prediction and avoidance
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Error correction encoding
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Visualization Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Optimization Metrics
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">GC Content Distribution</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">GC Content Visualization</p>
              </div>
              <p className="mt-4 text-gray-600">
                Our encoder maintains optimal GC content between 40-60%, ensuring successful DNA synthesis.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Homopolymer Analysis</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Homopolymer Length Distribution</p>
              </div>
              <p className="mt-4 text-gray-600">
                We limit homopolymer runs to 3 bases or less, preventing sequencing errors.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 mt-20">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <Dna className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-white">DNAcode</span>
            </div>
            <div className="mt-6 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-300">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-gray-300">Terms</a>
              <a href="#" className="text-gray-400 hover:text-gray-300">Contact</a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8">
            <p className="text-base text-gray-400 text-center">
              &copy; {new Date().getFullYear()} DNAcode. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HowItWorks; 