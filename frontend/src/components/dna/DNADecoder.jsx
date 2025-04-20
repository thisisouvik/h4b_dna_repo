import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Dna, 
  Upload, 
  FileText, 
  ChevronDown,
  ChevronUp,
  Loader2,
  X,
  ArrowLeft,
  Copy,
  Download,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const DNADecoder = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('text');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [useML, setUseML] = useState(false);
  const [formData, setFormData] = useState({
    text: '',
    encodingMethod: 'standard',
    compression: false,
    optimizationLevel: 'medium'
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = React.useRef(null);
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData(prev => ({ ...prev, text: '' }));
    setSelectedFile(null);
    setValidationError('');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (name === 'text') {
      validateDNA(value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      readFileContent(file);
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      readFileContent(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setValidationError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const readFileContent = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      validateDNA(content);
    };
    reader.readAsText(file);
  };

  const validateDNA = (sequence) => {
    if (!sequence) {
      setValidationError('');
      return;
    }
    const invalidChars = sequence.replace(/[ATGC]/gi, '');
    if (invalidChars) {
      setValidationError(`Invalid characters found: ${invalidChars.split('').join(', ')}`);
    } else {
      setValidationError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsProcessing(true);
      setError(null);

      // Show processing state for 2-3 seconds
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));

      if (selectedFile) {
        // Read the .dna file content
        const reader = new FileReader();
        reader.onload = async (e) => {
          const dnaSequence = e.target.result;
          
          // Convert DNA sequence to text (dummy conversion)
          const convertDNAToText = (sequence) => {
            // Simple dummy conversion - in reality, this would be more complex
            let text = '';
            for (let i = 0; i < sequence.length; i += 4) {
              const chunk = sequence.slice(i, i + 4);
              if (chunk.length === 4) {
                // Simple mapping of DNA to ASCII
                const asciiCode = chunk.split('').reduce((acc, base) => {
                  switch (base) {
                    case 'A': return acc + 0;
                    case 'T': return acc + 1;
                    case 'C': return acc + 2;
                    case 'G': return acc + 3;
                    default: return acc;
                  }
                }, 0);
                text += String.fromCharCode(65 + (asciiCode % 26)); // Convert to A-Z
              }
            }
            return text;
          };

          const decodedText = convertDNAToText(dnaSequence);
          
          // Set results for display
          setResults({
            original_sequence: dnaSequence,
            decoded_text: decodedText,
            length: dnaSequence.length
          });

          // Create and download the decoded text file
          const blob = new Blob([decodedText], { type: 'text/plain' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${selectedFile.name.split('.')[0]}_decoded.txt`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        };
        reader.readAsText(selectedFile);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during decoding');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    if (results?.decoded_text) {
      navigator.clipboard.writeText(results.decoded_text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-black">
      <div className="relative z-10">
        {/* Navigation */}
        <nav className={`fixed w-full bg-black/80 backdrop-blur-sm z-50 transition-all duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => navigate('/dna-options')}
                  className="flex items-center text-white hover:text-indigo-300 mr-4"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back
                </button>
                <Link to="/" className="flex items-center">
                  <Dna className="h-8 w-8 text-indigo-600" />
                  <span className="ml-2 text-xl font-bold text-white">DNAStoreAI</span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                {/* Navigation links removed */}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-32 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-white mb-8 text-center">DNA Data Decoder</h1>
            
            {/* Tabs */}
            <div className="flex justify-center mb-8">
              <div className="flex space-x-4">
                <button
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === 'text' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300'
                  }`}
                  onClick={() => handleTabChange('text')}
                >
                  Text Input
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === 'file' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300'
                  }`}
                  onClick={() => handleTabChange('file')}
                >
                  File Upload
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="max-w-3xl mx-auto bg-gray-900/50 backdrop-blur-sm rounded-xl p-8">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Text Input */}
                  {activeTab === 'text' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        DNA Sequence to Decode
                      </label>
                      <textarea
                        name="text"
                        value={formData.text}
                        onChange={handleInputChange}
                        className="w-full h-32 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                      {validationError && (
                        <div className="mt-2 text-red-500 text-sm flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          {validationError}
                        </div>
                      )}
                    </div>
                  )}

                  {/* File Upload */}
                  {activeTab === 'file' && (
                    <div
                      className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center"
                      onDrop={handleFileDrop}
                      onDragOver={handleDragOver}
                    >
                      {selectedFile ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="h-6 w-6 text-indigo-400 mr-2" />
                            <span className="text-white">{selectedFile.name}</span>
                          </div>
                          <button
                            onClick={handleRemoveFile}
                            className="text-gray-400 hover:text-white"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
                          <p className="text-gray-300 mb-2">
                            Drag and drop your .dna file here, or
                          </p>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-indigo-400 hover:text-indigo-300"
                          >
                            browse files
                          </button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </div>
                      )}
                      {validationError && (
                        <div className="mt-4 text-red-500 text-sm flex items-center justify-center">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          {validationError}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Advanced Options */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="flex items-center text-gray-300 hover:text-white"
                    >
                      {showAdvanced ? (
                        <ChevronUp className="h-5 w-5 mr-2" />
                      ) : (
                        <ChevronDown className="h-5 w-5 mr-2" />
                      )}
                      Advanced Options
                    </button>

                    {showAdvanced && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Decoding Method
                          </label>
                          <select
                            name="encodingMethod"
                            value={formData.encodingMethod}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="standard">Standard</option>
                            <option value="optimized">Optimized</option>
                            <option value="custom">Custom</option>
                          </select>
                        </div>

                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              name="compression"
                              checked={formData.compression}
                              onChange={handleInputChange}
                              className="rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="text-gray-300">Enable Decompression</span>
                          </label>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Optimization Level
                          </label>
                          <select
                            name="optimizationLevel"
                            value={formData.optimizationLevel}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isProcessing || validationError}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <div className="flex items-center">
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Processing...
                        </div>
                      ) : (
                        'Decode'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Results */}
            {results && (
              <div className="max-w-3xl mx-auto mt-8 space-y-8">
                {/* Summary Panel */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Decoding Summary</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h3 className="text-sm text-gray-400">Original Length</h3>
                      <p className="text-xl text-white">{results.length} bases</p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h3 className="text-sm text-gray-400">Decoded Size</h3>
                      <p className="text-xl text-white">{results.decoded_text.length} bytes</p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h3 className="text-sm text-gray-400">Decoding Time</h3>
                      <p className="text-xl text-white">{results.decoding_time}ms</p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h3 className="text-sm text-gray-400">Status</h3>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-xl text-white capitalize">success</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decoded Output */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-white">Decoded Output</h2>
                    <div className="flex space-x-4">
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <Copy className="h-5 w-5 mr-2" />
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                      <button
                        onClick={() => {
                          const blob = new Blob([results.decoded_text], { type: 'text/plain' });
                          const url = window.URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'decoded_output.txt';
                          document.body.appendChild(a);
                          a.click();
                          window.URL.revokeObjectURL(url);
                          document.body.removeChild(a);
                        }}
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <Download className="h-5 w-5 mr-2" />
                        Download Original
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                      {results.decoded_text}
                    </pre>
                  </div>
                </div>

                {/* Navigation to Encoder */}
                <div className="flex justify-center">
                  <button
                    onClick={() => navigate('/dna-encoder')}
                    className="flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Go to Encoder
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DNADecoder; 