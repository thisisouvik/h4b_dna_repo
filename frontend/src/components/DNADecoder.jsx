import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Dna, 
  Upload, 
  Download, 
  AlertCircle, 
  Check, 
  File, 
  FileText,
  FileJson,
  FileSpreadsheet,
  X,
  Loader2
} from 'lucide-react';

const DNADecoder = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [outputFormat, setOutputFormat] = useState('txt');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.dna')) {
      setSelectedFile(file);
      // Read file content
      const reader = new FileReader();
      reader.onload = (event) => {
        // In a real implementation, this would decode the DNA sequence
        // For now, we'll just store the content
        setResults({
          content: event.target.result,
          format: outputFormat
        });
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a .dna file');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.dna')) {
      setSelectedFile(file);
      // Read file content
      const reader = new FileReader();
      reader.onload = (event) => {
        setResults({
          content: event.target.result,
          format: outputFormat
        });
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a .dna file');
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setResults(null);
  };

  const handleDecode = async () => {
    setIsProcessing(true);
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock decoding process
    const decodedContent = "This is a mock decoded content. In a real implementation, this would be the actual decoded data from the DNA sequence.";
    
    setResults({
      content: decodedContent,
      format: outputFormat
    });
    
    setIsProcessing(false);
  };

  const handleDownload = () => {
    if (!results) return;

    let content = results.content;
    let filename = 'decoded_data';
    let mimeType = 'text/plain';

    switch (outputFormat) {
      case 'json':
        filename += '.json';
        mimeType = 'application/json';
        // Convert to JSON format if needed
        try {
          content = JSON.stringify({ data: content }, null, 2);
        } catch (e) {
          console.error('Error converting to JSON:', e);
        }
        break;
      case 'csv':
        filename += '.csv';
        mimeType = 'text/csv';
        // Convert to CSV format if needed
        content = `Data\n"${content}"`;
        break;
      default:
        filename += '.txt';
    }

    const blob = new Blob([content], { type: mimeType });
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
              <Link to="/" className="text-white hover:text-indigo-300">Home</Link>
              <Link to="/dna-operations" className="text-indigo-400">DNA Operations</Link>
              <Link to="/docs" className="text-white hover:text-indigo-300">Documentation</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-white mb-8">DNA Decoder</h1>
          
          {/* Input Card */}
          <div className="bg-indigo-900/50 backdrop-blur-sm rounded-xl p-6 mb-8">
            <div 
              className="border-2 border-dashed border-indigo-400 rounded-lg p-8 text-center mb-6 transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-900/30 cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".dna"
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
                  <Upload className="mx-auto h-12 w-12 text-indigo-400 mb-4" />
                  <p className="text-indigo-200">Click to upload or drag and drop your .dna file here</p>
                  <p className="text-sm text-indigo-300 mt-2">Only .dna files are accepted</p>
                </>
              )}
            </div>

            {/* Output Format Selection */}
            <div className="mb-6">
              <label className="block text-white mb-2">Output Format</label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setOutputFormat('txt')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    outputFormat === 'txt' ? 'bg-indigo-600 text-white' : 'text-indigo-200 hover:bg-indigo-800/50'
                  }`}
                >
                  <FileText className="inline-block mr-2" />
                  Text (.txt)
                </button>
                <button
                  onClick={() => setOutputFormat('json')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    outputFormat === 'json' ? 'bg-indigo-600 text-white' : 'text-indigo-200 hover:bg-indigo-800/50'
                  }`}
                >
                  <FileJson className="inline-block mr-2" />
                  JSON (.json)
                </button>
                <button
                  onClick={() => setOutputFormat('csv')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    outputFormat === 'csv' ? 'bg-indigo-600 text-white' : 'text-indigo-200 hover:bg-indigo-800/50'
                  }`}
                >
                  <FileSpreadsheet className="inline-block mr-2" />
                  CSV (.csv)
                </button>
              </div>
            </div>

            {/* Decode Button */}
            <button
              className={`w-full bg-indigo-600 text-white rounded-lg py-3 flex items-center justify-center transition-all duration-300 transform hover:scale-105 hover:bg-indigo-700 ${
                isProcessing || !selectedFile ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleDecode}
              disabled={isProcessing || !selectedFile}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  Decoding...
                </>
              ) : (
                <>
                  <Dna className="mr-2" />
                  Decode DNA
                </>
              )}
            </button>
          </div>

          {/* Results Display */}
          {results && (
            <div className="bg-indigo-900/50 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Decoded Results</h2>
              
              {/* Decoded Content */}
              <div className="bg-indigo-800/50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Decoded Data</h3>
                <div className="font-mono text-sm text-indigo-200 overflow-x-auto whitespace-pre-wrap">
                  {results.content}
                </div>
              </div>

              {/* Download Button */}
              <button
                className="w-full bg-indigo-600 text-white rounded-lg py-3 flex items-center justify-center transition-all duration-300 transform hover:scale-105 hover:bg-indigo-700"
                onClick={handleDownload}
              >
                <Download className="mr-2" />
                Download Decoded Data
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DNADecoder; 