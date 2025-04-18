import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Dna, 
  Upload, 
  Settings, 
  Download, 
  AlertCircle, 
  Check, 
  FileText, 
  File, 
  QrCode,
  ChevronDown,
  ChevronUp,
  Loader2,
  X
} from 'lucide-react';

const DNAEncoder = () => {
  const [activeTab, setActiveTab] = useState('text');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    input: '',
    encodingMethod: 'ml',
    compression: true,
    optimizationLevel: 'medium',
    optimizations: {
      gcContent: true,
      homopolymer: true,
      secondaryStructures: true
    }
  });

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Read file content
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          input: event.target.result
        }));
      };
      reader.readAsText(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      // Read file content
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          input: event.target.result
        }));
      };
      reader.readAsText(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFormData(prev => ({
      ...prev,
      input: ''
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleOptimizationChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      optimizations: {
        ...prev.optimizations,
        [name]: checked
      }
    }));
  };

  const handleEncode = async () => {
    setIsProcessing(true);
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock results
    setResults({
      sequence: 'ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG',
      metrics: {
        gcContent: 52.3,
        encodedSize: 1000,
        compressionRatio: 0.75
      },
      quality: {
        status: 'success',
        message: 'Sequence meets all optimization criteria'
      }
    });
    
    setIsProcessing(false);
  };

  const handleReset = () => {
    setResults(null);
    setSelectedFile(null);
    setFormData({
      input: '',
      encodingMethod: 'ml',
      compression: true,
      optimizationLevel: 'medium',
      optimizations: {
        gcContent: true,
        homopolymer: true,
        secondaryStructures: true
      }
    });
  };

  const handleDownload = (format) => {
    if (!results) return;

    let content = '';
    let filename = '';

    if (format === 'dna') {
      content = results.sequence;
      filename = 'encoded_sequence.dna';
    } else if (format === 'qr') {
      // In a real implementation, this would generate a QR code
      content = results.sequence;
      filename = 'encoded_sequence_qr.png';
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className={`min-h-screen bg-black text-white transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Navigation */}
      <nav className={`fixed w-full bg-black/80 backdrop-blur-sm z-50 transition-all duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Dna className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-white">DNAStoreAI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-white hover:text-indigo-300">Home</Link>
              <Link to="/dna-encoder" className="text-indigo-400">DNA Encoder</Link>
              <Link to="/docs" className="text-white hover:text-indigo-300">Documentation</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className={`text-4xl font-extrabold text-white mb-8 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            DNA Encoder
          </h1>
          
          {/* Input Card */}
          <div className={`bg-indigo-900/50 backdrop-blur-sm rounded-xl p-6 mb-8 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            {/* Tab Navigation */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveTab('text')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  activeTab === 'text' ? 'bg-indigo-600 text-white' : 'text-indigo-200 hover:bg-indigo-800/50'
                }`}
              >
                <FileText className="inline-block mr-2" />
                Text Input
              </button>
              <button
                onClick={() => setActiveTab('file')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  activeTab === 'file' ? 'bg-indigo-600 text-white' : 'text-indigo-200 hover:bg-indigo-800/50'
                }`}
              >
                <File className="inline-block mr-2" />
                File Upload
              </button>
            </div>

            {/* Input Area */}
            {activeTab === 'text' ? (
              <textarea
                className="w-full h-32 bg-indigo-800/50 text-white rounded-lg p-4 mb-4 transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter text to encode..."
                value={formData.input}
                onChange={(e) => handleInputChange(e)}
                name="input"
              />
            ) : (
              <div 
                className="border-2 border-dashed border-indigo-400 rounded-lg p-8 text-center mb-4 transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-900/30 cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".txt,.csv,.json,.xml"
                />
                {selectedFile ? (
                  <div className="flex items-center justify-between bg-indigo-800/50 p-4 rounded-lg transition-all duration-300 hover:bg-indigo-800/70">
                    <span className="text-indigo-200">{selectedFile.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile();
                      }}
                      className="text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <X />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-12 w-12 text-indigo-400 mb-4 transition-transform duration-300 group-hover:scale-110" />
                    <p className="text-indigo-200">Click to upload or drag and drop your file here</p>
                    <p className="text-sm text-indigo-300 mt-2">Supported formats: .txt, .csv, .json, .xml</p>
                  </>
                )}
              </div>
            )}

            {/* Basic Options */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <label className="text-white">Encoding Method</label>
                <div className="flex space-x-4">
                  <button
                    className={`px-4 py-2 rounded-lg ${
                      formData.encodingMethod === 'ml' ? 'bg-indigo-600 text-white' : 'text-indigo-200'
                    }`}
                    onClick={() => handleInputChange({ target: { name: 'encodingMethod', value: 'ml' } })}
                  >
                    ML-Based
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg ${
                      formData.encodingMethod === 'basic' ? 'bg-indigo-600 text-white' : 'text-indigo-200'
                    }`}
                    onClick={() => handleInputChange({ target: { name: 'encodingMethod', value: 'basic' } })}
                  >
                    Basic
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-white">Enable Compression</label>
                <button
                  className={`w-12 h-6 rounded-full ${
                    formData.compression ? 'bg-indigo-600' : 'bg-indigo-800'
                  }`}
                  onClick={() => handleInputChange({ target: { name: 'compression', type: 'checkbox', checked: !formData.compression } })}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                    formData.compression ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>

            {/* Advanced Options Toggle */}
            <button
              className="flex items-center text-indigo-300 mb-4 transition-colors duration-300 hover:text-indigo-200"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? <ChevronUp className="mr-2" /> : <ChevronDown className="mr-2" />}
              {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
            </button>

            {/* Advanced Options */}
            {showAdvanced && (
              <div className="space-y-4 mb-6 transition-all duration-500 ease-in-out">
                <div className="flex items-center justify-between">
                  <label className="text-white">Optimization Level</label>
                  <select
                    className="bg-indigo-800/50 text-white rounded-lg px-4 py-2"
                    value={formData.optimizationLevel}
                    onChange={(e) => handleInputChange(e)}
                    name="optimizationLevel"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={formData.optimizations.gcContent}
                      onChange={handleOptimizationChange}
                      name="gcContent"
                    />
                    Balance GC Content
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={formData.optimizations.homopolymer}
                      onChange={handleOptimizationChange}
                      name="homopolymer"
                    />
                    Avoid Homopolymers
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={formData.optimizations.secondaryStructures}
                      onChange={handleOptimizationChange}
                      name="secondaryStructures"
                    />
                    Prevent Secondary Structures
                  </label>
                </div>
              </div>
            )}

            {/* Encode Button */}
            <button
              className={`w-full bg-indigo-600 text-white rounded-lg py-3 flex items-center justify-center transition-all duration-300 transform hover:scale-105 hover:bg-indigo-700 ${
                isProcessing || (!formData.input && !selectedFile) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleEncode}
              disabled={isProcessing || (!formData.input && !selectedFile)}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Dna className="mr-2" />
                  Encode to DNA
                </>
              )}
            </button>
          </div>

          {/* Results Display */}
          {results && (
            <div className={`bg-indigo-900/50 backdrop-blur-sm rounded-xl p-6 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <h2 className="text-2xl font-bold text-white mb-6">Results</h2>
              
              {/* DNA Sequence */}
              <div className="bg-indigo-800/50 rounded-lg p-4 mb-6 transition-all duration-300 hover:bg-indigo-800/70">
                <h3 className="text-lg font-semibold text-white mb-2">DNA Sequence</h3>
                <div className="font-mono text-sm text-indigo-200 overflow-x-auto">
                  {results.sequence}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {Object.entries(results.metrics).map(([key, value]) => (
                  <div key={key} className="bg-indigo-800/50 rounded-lg p-4 transition-all duration-300 hover:bg-indigo-800/70">
                    <h4 className="text-indigo-300 mb-2">{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
                    <p className="text-2xl font-bold text-white">{value}{key === 'gcContent' ? '%' : key === 'encodedSize' ? ' bp' : ''}</p>
                  </div>
                ))}
              </div>

              {/* Quality Indicator */}
              <div className={`rounded-lg p-4 mb-6 transition-all duration-300 ${
                results.quality.status === 'success' ? 'bg-green-900/50' : 'bg-yellow-900/50'
              }`}>
                <div className="flex items-center">
                  {results.quality.status === 'success' ? (
                    <Check className="text-green-400 mr-2" />
                  ) : (
                    <AlertCircle className="text-yellow-400 mr-2" />
                  )}
                  <p className="text-white">{results.quality.message}</p>
                </div>
              </div>

              {/* Download Options */}
              <div className="flex flex-wrap gap-4 mb-6">
                <button 
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-indigo-700"
                  onClick={() => handleDownload('dna')}
                >
                  <Download className="inline-block mr-2" />
                  Download .dna File
                </button>
                <button 
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-indigo-700"
                  onClick={() => handleDownload('qr')}
                >
                  <QrCode className="inline-block mr-2" />
                  Download QR Code
                </button>
              </div>

              {/* Reset Button */}
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-indigo-700"
                onClick={handleReset}
              >
                Encode New Data
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DNAEncoder; 