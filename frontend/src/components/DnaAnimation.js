import React from 'react';
import { motion } from 'framer-motion';

const DnaAnimation = () => {
  const binaryCode = '10110101';
  const dnaSequence = 'ATGCTCGA';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const arrowVariants = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: {
        duration: 0.8,
        delay: 1,
      },
    },
  };

  const helixVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        delay: 1.5,
      },
    },
  };

  return (
    <motion.div
      className="flex items-center justify-center space-x-8 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Binary Code */}
      <motion.div className="text-2xl font-mono" variants={itemVariants}>
        {binaryCode.split('').map((bit, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={itemVariants}
          >
            {bit}
          </motion.span>
        ))}
      </motion.div>

      {/* Arrow */}
      <motion.div
        className="text-indigo-600"
        variants={arrowVariants}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="24"
          viewBox="0 0 48 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="0" y1="12" x2="40" y2="12" />
          <polyline points="30 4 40 12 30 20" />
        </svg>
      </motion.div>

      {/* DNA Helix */}
      <motion.div
        className="relative w-16 h-16"
        variants={helixVariants}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="w-full h-full text-indigo-600"
        >
          <path
            d="M32 0v64M16 8s16 6 32 0M16 24s16 6 32 0M16 40s16 6 32 0M16 56s16 6 32 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </motion.div>

      {/* DNA Sequence */}
      <motion.div className="text-2xl font-mono" variants={itemVariants}>
        {dnaSequence.split('').map((base, index) => (
          <motion.span
            key={index}
            className={`inline-block ${
              base === 'A' || base === 'T' ? 'text-indigo-600' : 'text-indigo-400'
            }`}
            variants={itemVariants}
          >
            {base}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default DnaAnimation; 