import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Dna, 
  Upload, 
  Settings, 
  Download, 
  AlertCircle, 
  Check, 
  FileText,
  QrCode,
  Loader2
} from 'lucide-react';

const DNAEncoderPage = () => {
  const [inputType, setInputType] = useState('text');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [encodingMethod, setEncodingMethod] = useState('ml');
  const [compression, setCompression] = useState(true);
  const [optimizationLevel, setOptimizationLevel] = useState('medium');
  const [optimizations, setOptimizations] = useState({
    gcContent: true,
    homopolymer: true,
    secondaryStructures: false
  });

  const handleEncode = async () => {
    setIsProcessing(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setResults({
      sequence: 'ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG',
      gcContent: 52,
      encodedSize: 1000,
      compressionRatio: 0.75,
      warnings: [],
      success: true
    });
    setIsProcessing(false);
  };

  const handleReset = () => {
    setResults(null);
    setTextInput('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Dna className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">DNAcode</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <span className="text-indigo-600 font-medium">DNA Encoder</span>
              <a href="#" className="text-gray-600 hover:text-gray-900">Documentation</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            DNA Encoder Demo
          </h1>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          {/* Input Type Toggle */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setInputType('text')}
                className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                  inputType === 'text'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FileText className="inline-block mr-2 h-4 w-4" />
                Text Input
              </button>
              <button
                onClick={() => setInputType('file')}
                className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                  inputType === 'file'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Upload className="inline-block mr-2 h-4 w-4" />
                File Upload
              </button>
            </div>
          </div>

          {/* Input Section */}
          <div className="mb-6">
            {inputType === 'text' ? (
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter text to encode..."
              />
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Drag and drop your file here, or click to select
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Maximum file size: 10MB
                </p>
              </div>
            )}
          </div>

          {/* Encoding Options */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Encoding Options</h3>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-indigo-600 hover:text-indigo-500"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="ml"
                  name="encoding"
                  checked={encodingMethod === 'ml'}
                  onChange={() => setEncodingMethod('ml')}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="ml" className="ml-2 text-sm text-gray-700">
                  ML-Based Encoding
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="basic"
                  name="encoding"
                  checked={encodingMethod === 'basic'}
                  onChange={() => setEncodingMethod('basic')}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="basic" className="ml-2 text-sm text-gray-700">
                  Basic Encoding
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="compression"
                  checked={compression}
                  onChange={(e) => setCompression(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="compression" className="ml-2 text-sm text-gray-700">
                  Enable Compression
                </label>
              </div>
            </div>

            {showAdvanced && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Optimization Level
                  </label>
                  <select
                    value={optimizationLevel}
                    onChange={(e) => setOptimizationLevel(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="gcContent"
                      checked={optimizations.gcContent}
                      onChange={(e) => setOptimizations({...optimizations, gcContent: e.target.checked})}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="gcContent" className="ml-2 text-sm text-gray-700">
                      GC Content Balance
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="homopolymer"
                      checked={optimizations.homopolymer}
                      onChange={(e) => setOptimizations({...optimizations, homopolymer: e.target.checked})}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="homopolymer" className="ml-2 text-sm text-gray-700">
                      Homopolymer Avoidance
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="secondaryStructures"
                      checked={optimizations.secondaryStructures}
                      onChange={(e) => setOptimizations({...optimizations, secondaryStructures: e.target.checked})}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="secondaryStructures" className="ml-2 text-sm text-gray-700">
                      Secondary Structure Avoidance
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Encode Button */}
          <div className="text-center">
            <button
              onClick={handleEncode}
              disabled={isProcessing}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                isProcessing ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Processing...
                </>
              ) : (
                <>
                  <Dna className="mr-2 h-5 w-5" />
                  Encode to DNA
                </>
              )}
            </button>
          </div>

          {/* Results Display */}
          {results && (
            <div className="mt-8">
              <div className="bg-gray-50 p-4 rounded-md overflow-x-auto">
                <pre className="text-sm text-gray-700">{results.sequence}</pre>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="bg-white shadow rounded-lg p-4">
                  <p className="text-sm text-gray-500">GC Content</p>
                  <p className="text-2xl font-semibold text-gray-900">{results.gcContent}%</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4">
                  <p className="text-sm text-gray-500">Encoded Size</p>
                  <p className="text-2xl font-semibold text-gray-900">{results.encodedSize} bp</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4">
                  <p className="text-sm text-gray-500">Compression Ratio</p>
                  <p className="text-2xl font-semibold text-gray-900">{results.compressionRatio}</p>
                </div>
              </div>

              {results.warnings.length > 0 ? (
                <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        {results.warnings.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
                  <div className="flex">
                    <Check className="h-5 w-5 text-green-400" />
                    <div className="ml-3">
                      <p className="text-sm text-green-700">
                        Encoding successful with no issues
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-center space-x-4">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  <Download className="mr-2 h-4 w-4" />
                  Download FASTA
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  <Download className="mr-2 h-4 w-4" />
                  Download CSV
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  <QrCode className="mr-2 h-4 w-4" />
                  Generate QR Code
                </button>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={handleReset}
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Encode New Data
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DNAEncoderPage; 