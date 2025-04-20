export const useValidation = () => {
  const validateForm = (formData) => {
    if (!formData.name || !formData.email) {
      return false;
    }
    if (!formData.text && !formData.file) {
      return false;
    }
    return true;
  };

  return { validateForm };
}; 