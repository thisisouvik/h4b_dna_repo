import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HowItWorks from './components/HowItWorks';
import Auth from './components/Auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/signin" element={<Auth mode="signin" />} />
        <Route path="/signup" element={<Auth mode="signup" />} />
      </Routes>
    </Router>
  );
}

export default App;
