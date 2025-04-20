import React, { useState, useRef, useEffect } from 'react';
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
import axios from 'axios';
import { useForm } from '../../hooks/useForm';
import { useFileUpload } from '../../hooks/useFileUpload';
import { useEncoding } from '../../hooks/useEncoding';
import { useResults } from '../../hooks/useResults';
import { useNavigation } from '../../hooks/useNavigation';
import { useValidation } from '../../hooks/useValidation';
import { useAdvancedOptions } from '../../hooks/useAdvancedOptions';
import DnaAnimation from '../DnaAnimation';

const DNAEncoder = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('text');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [useML, setUseML] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  // Hooks
  const { formData, setFormData, handleInputChange, resetForm } = useForm();
  const { handleFileDrop, handleDragOver, handleRemoveFile } = useFileUpload(setSelectedFile, fileInputRef);
  const { handleEncode, error: encodingError } = useEncoding(formData, selectedFile, setResults, setIsProcessing);
  const { handleDownload } = useResults(results);
  const { validateForm } = useValidation();
  const { toggleAdvanced } = useAdvancedOptions();

  // Effects
  useEffect(() => {
    validateForm(formData);
  }, [formData, validateForm]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const testBackend = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/test');
        console.log('Backend test:', response.data);
      } catch (error) {
        console.error('Backend connection error:', error);
      }
    };

    testBackend();
  }, []);

  // Handlers
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData(prev => ({ ...prev, text: '' }));
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      handleInputChange({ target: { name: 'file', value: file } });

      // Generate dummy DNA sequence
      const generateDummyDNA = () => {
        const bases = [0 , 1];
        let sequence = '';
        for (let i = 0; i < 100; i++) {
          sequence += bases[Math.floor(Math.random() * bases.length)];
        }
        return sequence;
      };

      // Create and download the .dna file
      const dummyDNA = generateDummyDNA();
      const blob = new Blob([dummyDNA], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name.split('.')[0]}_encoded.dna`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsProcessing(true);
      setError(null);

      // Show processing state for 2-3 seconds
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));

      // Generate dummy DNA sequence
      const generateDummyDNA = () => {
        const bases = [0 , 1];
        let sequence = '';
        for (let i = 0; i < 100; i++) {
          sequence += bases[Math.floor(Math.random() * bases.length)];
        }
        return sequence;
      };

      // Create and download the .dna file
      const dummyDNA = generateDummyDNA();
      const blob = new Blob([dummyDNA], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedFile ? selectedFile.name.split('.')[0] : 'text'}_encoded.dna`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Set results for display
      setResults({
        dna_sequence: dummyDNA,
        quality: 'high',
        length: dummyDNA.length
      });

    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during encoding');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    if (results?.dna_sequence) {
      navigator.clipboard.writeText(results.dna_sequence);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const calculateGCContent = (sequence) => {
    if (!sequence) return 0;
    const gcCount = (sequence.match(/[GC]/g) || []).length;
    return ((gcCount / sequence.length) * 100).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-black">
      <div className="relative z-10">
        {/* Navigation */}
        <nav className={`fixed w-full bg-black/80 backdrop-blur-sm z-50 transition-all duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-8">
                <div>
                  <button
                    onClick={() => navigate('/dna-options')}
                    className="flex items-center text-white hover:text-indigo-300"
                  >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back
                  </button>
                </div>
                
                <div>
                  <Link to="/" className="flex items-center">
                    <Dna className="h-8 w-8 text-indigo-600" />
                    <span className="ml-2 text-xl font-bold text-white">DNAStoreAI</span>
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-4">
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-32 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-white mb-8 text-center">DNA Data Encoder</h1>
            
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
                        Text to Encode
                      </label>
                      <textarea
                        name="text"
                        value={formData.text}
                        onChange={handleInputChange}
                        className="w-full h-32 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
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
                            Drag and drop your file here, or
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
                    </div>
                  )}

                  {/* ML Toggle */}
                  <div className="flex items-center space-x-4 bg-gray-800/50 p-4 rounded-lg">
                    <span className="text-gray-300">Encoding Method:</span>
                    <button
                      onClick={() => setUseML(!useML)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        useML ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'
                      }`}
                    >
                      ML-Based
                    </button>
                    <button
                      onClick={() => setUseML(!useML)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        !useML ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'
                      }`}
                    >
                      Traditional
                    </button>
                  </div>

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
                            Encoding Method
                          </label>
                          <select
                            name="encodingMethod"
                            value={formData.encodingMethod}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="standard">Standard</option>
                            <option value="optimized">Optimized</option>
                          
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
                            <span className="text-gray-300">Enable Compression</span>
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

                  {/* Error Message */}
                  {error && (
                    <div className="text-red-500 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <div className="flex items-center">
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Processing...
                        </div>
                      ) : (
                        'Encode'
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
                  <h2 className="text-2xl font-bold text-white mb-6">Encoding Summary</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h3 className="text-sm text-gray-400">Sequence Length</h3>
                      <p className="text-xl text-white">{results.dna_sequence.length} bases</p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h3 className="text-sm text-gray-400">GC Content</h3>
                      <p className="text-xl text-white">{calculateGCContent(results.dna_sequence)}%</p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h3 className="text-sm text-gray-400">Output Size</h3>
                      <p className="text-xl text-white">{Math.ceil(results.dna_sequence.length / 4)} bytes</p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h3 className="text-sm text-gray-400">Quality</h3>
                      <div className="flex items-center">
                        {results.quality === 'high' ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                        )}
                        <span className="text-xl text-white capitalize">{results.quality}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DNA Sequence */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-white">DNA Sequence</h2>
                    <div className="flex space-x-4">
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <Copy className="h-5 w-5 mr-2" />
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                      <button
                        onClick={handleDownload}
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <Download className="h-5 w-5 mr-2" />
                        Download .dna
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                      {results.dna_sequence}
                    </pre>
                  </div>
                </div>

                {/* Navigation to Decoder */}
                <div className="flex justify-center">
                  
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DNAEncoder;