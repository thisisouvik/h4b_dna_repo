import React from 'react';
import { Binary, Code, Database, Dna, ArrowRight, Download, ChevronRight } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';
import DnaAnimation from './DnaAnimation';
import DNAencoder from './DNAencoder';

const Header = () => (
  <header className="bg-white shadow-sm">
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex items-center">
          <Dna className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">DNAcode</span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
          <Link to="/how-it-works" className="text-gray-600 hover:text-gray-900">How It Works</Link>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
          <a href="#docs" className="text-gray-600 hover:text-gray-900">Documentation</a>
          <Link to="/signin" className="px-4 py-2 text-gray-600 hover:text-gray-900">Sign in</Link>
          <Link to="/signup" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Sign up</Link>
        </div>
      </div>
    </nav>
  </header>
);

const Hero = () => (
  <section className="bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          Store Digital Data in DNA Sequences
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Convert your digital files into biologically viable DNA sequences using our ML-powered DNA Data Storage technology. Optimize for perfect GC content and avoid synthesis issues.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
              <Link to="/DNAencoder">Try It Now</Link>
            </a>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
              Learn More
            </a>
          </div>
        </div>
        <DnaAnimation />
      </div>
    </div>
  </section>
);

const Features = () => (
  <section id="features" className="bg-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          ML-Powered DNA Data Storage
        </h2>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-2">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <Binary className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Digital-to-DNA Conversion</h3>
                <p className="mt-1 text-sm text-gray-500">Convert any digital file into DNA sequences with high accuracy.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">ML Optimization</h3>
                <p className="mt-1 text-sm text-gray-500">Advanced algorithms ensure optimal DNA sequence generation.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <Dna className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Synthesis-Ready Output</h3>
                <p className="mt-1 text-sm text-gray-500">Get DNA sequences ready for physical synthesis.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <Database className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">High Density Storage</h3>
                <p className="mt-1 text-sm text-gray-500">Store massive amounts of data in minimal physical space.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section id="how-it-works" className="bg-gray-50 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          From Bits to Bases
        </h2>
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mx-auto">
                <span className="text-indigo-600 font-bold">1</span>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">Upload Data</h3>
              <p className="mt-2 text-sm text-gray-500 text-center">
                Upload your digital files through our secure platform.
              </p>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mx-auto">
                <span className="text-indigo-600 font-bold">2</span>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">ML Processing</h3>
              <p className="mt-2 text-sm text-gray-500 text-center">
                Our ML algorithms convert and optimize your data for DNA storage.
              </p>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mx-auto">
                <span className="text-indigo-600 font-bold">3</span>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">Download Sequence</h3>
              <p className="mt-2 text-sm text-gray-500 text-center">
                Receive your optimized DNA sequence ready for synthesis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TryItNow = () => (
  <section className="bg-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">

      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="bg-indigo-900">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
      <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        <span className="block">Ready to store your data in DNA?</span>
      </h2>
      <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
        <div className="inline-flex rounded-md shadow">
          <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
            Get started
          </a>
        </div>
        <div className="ml-3 inline-flex rounded-md shadow">
          <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            Learn more
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-900">
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
);

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <TryItNow />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage; 