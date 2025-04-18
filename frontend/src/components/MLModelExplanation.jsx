import React from 'react';
import { Dna, Database, Brain, LineChart, BarChart3, Shield } from 'lucide-react';

const MLModelExplanation = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-indigo-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-white sm:text-6xl">
              ML Model for DNA Data Storage
            </h1>
            <p className="mt-6 text-xl text-indigo-200 max-w-3xl mx-auto">
              Understanding how machine learning optimizes DNA sequences for stable data storage
            </p>
          </div>
        </div>
      </section>

      {/* DNA Stability Problem */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Shield className="h-8 w-8 text-indigo-600 mr-4" />
            <h2 className="text-3xl font-bold">The DNA Stability Challenge</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-indigo-900/50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Key Challenges</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>GC content must be balanced (40-60%)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Avoid homopolymer runs (repeated bases)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Prevent secondary structure formation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Minimize sequence similarity</span>
                </li>
              </ul>
            </div>
            <div className="bg-indigo-900/50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Impact on Storage</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Unstable sequences lead to synthesis errors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Reduced data retrieval accuracy</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Increased storage costs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Limited storage density</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Dataset Section */}
      <section className="py-20 bg-gradient-to-b from-black to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Database className="h-8 w-8 text-indigo-600 mr-4" />
            <h2 className="text-3xl font-bold">Dataset & Training</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-indigo-900/50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Dataset Composition</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>1M+ synthetic DNA sequences</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Varied GC content (20-80%)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Multiple homopolymer lengths</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Secondary structure annotations</span>
                </li>
              </ul>
            </div>
            <div className="bg-indigo-900/50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Data Processing</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Sequence encoding (one-hot)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Feature extraction</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Stability scoring</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Train/validation split (80/20)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Model Architecture */}
      <section className="py-20 bg-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Brain className="h-8 w-8 text-indigo-600 mr-4" />
            <h2 className="text-3xl font-bold">Model Architecture</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-indigo-800/50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Neural Network Design</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Transformer-based architecture</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>12 attention heads</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>512-dimensional embeddings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>6 transformer layers</span>
                </li>
              </ul>
            </div>
            <div className="bg-indigo-800/50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Optimization Features</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>GC content prediction</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Homopolymer detection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Secondary structure prediction</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Sequence similarity scoring</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Training & Performance */}
      <section className="py-20 bg-gradient-to-b from-indigo-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <LineChart className="h-8 w-8 text-indigo-600 mr-4" />
            <h2 className="text-3xl font-bold">Training & Performance</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-indigo-900/50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Training Process</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Adam optimizer (lr=0.0001)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Batch size: 32</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>100 epochs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Early stopping</span>
                </li>
              </ul>
            </div>
            <div className="bg-indigo-900/50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Accuracy: 98.5%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Precision: 97.8%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Recall: 98.2%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>F1 Score: 98.0%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Visualizations */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <BarChart3 className="h-8 w-8 text-indigo-600 mr-4" />
            <h2 className="text-3xl font-bold">Model Predictions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-indigo-900/50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">GC Content Distribution</h3>
              <div className="h-64 bg-indigo-800/50 rounded-lg flex items-center justify-center">
                <p className="text-indigo-300">GC Content Visualization</p>
              </div>
            </div>
            <div className="bg-indigo-900/50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Sequence Stability</h3>
              <div className="h-64 bg-indigo-800/50 rounded-lg flex items-center justify-center">
                <p className="text-indigo-300">Stability Score Visualization</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MLModelExplanation; 