import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import DNAOptions from './components/dna/DNAOptions';
import DNAEncoder from './components/dna/DNAEncoder';
import DNADecoder from './components/dna/DNADecoder';
import HowItWorks from './components/HowItWorks';
import MLModelExplanation from './components/MLModelExplanation';
import Auth from './components/Auth';
import Pricing from './components/Pricing';
import './App.css';

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/dna-options" element={<DNAOptions />} />
        <Route path="/dna-encoder" element={<DNAEncoder />} />
        <Route path="/dna-decoder" element={<DNADecoder />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/ml-model" element={<MLModelExplanation />} />
        <Route path="/signin" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
