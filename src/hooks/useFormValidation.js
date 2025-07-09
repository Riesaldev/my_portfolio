import { useState, useEffect } from 'react';
import { validateForm, validateName, validateEmail, validateMessage, sanitizeFormData } from '../lib/formValidator';

/**
 * Hook personalizado para manejar la validación de formularios
 * @param {Object} initialData - Datos iniciales del formulario
 * @returns {Object} - Objeto con todos los estados y funciones necesarias
 */
export function useFormValidation(initialData = {}) {
  const [formData, setFormData] = useState(initialData);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Validar formulario cuando cambie formData
  useEffect(() => {
    const { isValid } = validateForm(formData);
    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validar campo en tiempo real si ya ha sido tocado
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let validation;
    
    switch (fieldName) {
      case 'name':
        validation = validateName(value);
        break;
      case 'email':
        validation = validateEmail(value);
        break;
      case 'message':
        validation = validateMessage(value);
        break;
      default:
        return;
    }
    
    setFieldErrors(prev => ({
      ...prev,
      [fieldName]: validation.isValid ? '' : validation.error
    }));
  };

  const validateAllFields = () => {
    // Marcar todos los campos como tocados
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    // Sanitizar datos
    const sanitizedData = sanitizeFormData(formData);
    
    // Validar formulario completo
    const validation = validateForm(sanitizedData);
    
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      return { isValid: false, errors: validation.errors, sanitizedData };
    }
    
    return { isValid: true, errors: {}, sanitizedData };
  };

  const resetForm = () => {
    setFormData(initialData);
    setFieldErrors({});
    setTouched({});
  };

  const getFieldProps = (fieldName) => ({
    value: formData[fieldName] || '',
    onChange: handleChange,
    onBlur: handleBlur,
    name: fieldName,
    className: `w-full px-5 py-5 text-2xl placeholder:text-2xl bg-amber-50/70 border-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 ${
      fieldErrors[fieldName] ? 'border-red-500 bg-red-50/20' : 'border-amber-700/30 hover:border-amber-700/50'
    }`
  });

  return {
    formData,
    fieldErrors,
    touched,
    isFormValid,
    handleChange,
    handleBlur,
    validateField,
    validateAllFields,
    resetForm,
    getFieldProps,
    setFormData
  };
}
