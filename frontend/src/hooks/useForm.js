import { useState } from 'react';

export const useForm = () => {
  const [formData, setFormData] = useState({
    text: '',
    encodingMethod: 'standard',
    compression: false,
    optimizationLevel: 'medium'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setFormData({
      text: '',
      encodingMethod: 'standard',
      compression: false,
      optimizationLevel: 'medium'
    });
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    resetForm
  };
};