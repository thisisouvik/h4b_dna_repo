import { useState } from 'react';

export const useAdvancedOptions = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  return { showAdvanced, toggleAdvanced };
}; 