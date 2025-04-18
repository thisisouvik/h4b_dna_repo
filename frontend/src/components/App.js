import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import HowItWorks from './HowItWorks';
import DNAEncoderPage from './DNAEncoderPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/DNAencoder" element={<DNAEncoderPage />} />
      </Routes>
    </Router>
  );
}

export default App; 