import { useState, useEffect } from 'react';

export const useNavigation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return { isVisible };
}; 