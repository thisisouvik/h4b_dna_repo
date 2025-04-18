import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HowItWorks from './components/HowItWorks';
import MLModelExplanation from './components/MLModelExplanation';
import DNAEncoder from './components/DNAEncoder';
import Auth from './components/Auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/ml-model" element={<MLModelExplanation />} />
        <Route path="/signin" element={<Auth mode="signin" />} />
        <Route path="/signup" element={<Auth mode="signup" />} />
        <Route path="/dna-encoder" element={<DNAEncoder />} />
      </Routes>
    </Router>
  );
}

export default App;
