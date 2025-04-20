import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const useDecoding = (formData, selectedFile) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleDecode = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      const formDataToSend = new FormData();
      if (formData.text) {
        formDataToSend.append('text', formData.text);
      } else if (selectedFile) {
        formDataToSend.append('file', selectedFile);
      }
      formDataToSend.append('encodingMethod', formData.encodingMethod);
      formDataToSend.append('compression', formData.compression);
      formDataToSend.append('optimizationLevel', formData.optimizationLevel);

      const response = await axios.post(`${API_URL}/decode`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (!response.data.success) {
        throw new Error(response.data.error || 'Decoding failed');
      }

      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'An error occurred during decoding';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return { isProcessing, handleDecode, error };
}; 