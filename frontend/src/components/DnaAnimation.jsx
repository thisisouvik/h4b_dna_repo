import React from 'react';
import { Dna } from 'lucide-react';

const DnaAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <div className="absolute top-0 left-0 w-full h-full animate-float">
        <Dna className="w-64 h-64 text-indigo-500" />
      </div>
      <div className="absolute top-1/4 right-0 w-full h-full animate-float-delayed">
        <Dna className="w-48 h-48 text-indigo-400" />
      </div>
      <div className="absolute bottom-0 left-1/4 w-full h-full animate-float-reverse">
        <Dna className="w-56 h-56 text-indigo-300" />
      </div>
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          100% { transform: translateY(0) rotate(360deg); }
        }
        @keyframes float-delayed {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-180deg); }
          100% { transform: translateY(0) rotate(-360deg); }
        }
        @keyframes float-reverse {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(90deg); }
          100% { transform: translateY(0) rotate(180deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default DnaAnimation; 