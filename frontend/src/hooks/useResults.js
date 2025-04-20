import { useState } from 'react';

export const useResults = () => {
  const [results, setResults] = useState(null);

  const handleDownload = () => {
    if (!results?.dna_sequence) return;

    const blob = new Blob([results.dna_sequence], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'encoded_sequence.dna';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return { results, setResults, handleDownload };
}; 