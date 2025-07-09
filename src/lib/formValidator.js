/**
 * Utilidades para validación de formularios
 */
import { getValidationMessage, getCurrentLocale } from './validationMessages';

// Patrones de validación
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/;

/**
 * Validador para el campo nombre
 * @param {string} name - Nombre a validar
 * @returns {Object} - Objeto con isValid y error
 */
export function validateName(name) {
  const locale = getCurrentLocale();
  
  if (!name || name.trim() === '') {
    return { isValid: false, error: getValidationMessage('name.required', {}, locale) };
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, error: getValidationMessage('name.minLength', {}, locale) };
  }
  
  if (name.trim().length > 50) {
    return { isValid: false, error: getValidationMessage('name.maxLength', {}, locale) };
  }
  
  if (!NAME_REGEX.test(name.trim())) {
    return { isValid: false, error: getValidationMessage('name.invalid', {}, locale) };
  }
  
  return { isValid: true, error: '' };
}

/**
 * Validador para el campo email
 * @param {string} email - Email a validar
 * @returns {Object} - Objeto con isValid y error
 */
export function validateEmail(email) {
  const locale = getCurrentLocale();
  
  if (!email || email.trim() === '') {
    return { isValid: false, error: getValidationMessage('email.required', {}, locale) };
  }
  
  if (!EMAIL_REGEX.test(email.trim())) {
    return { isValid: false, error: getValidationMessage('email.invalid', {}, locale) };
  }
  
  if (email.trim().length > 254) {
    return { isValid: false, error: getValidationMessage('email.maxLength', {}, locale) };
  }
  
  return { isValid: true, error: '' };
}

/**
 * Validador para el campo mensaje
 * @param {string} message - Mensaje a validar
 * @returns {Object} - Objeto con isValid y error
 */
export function validateMessage(message) {
  const locale = getCurrentLocale();
  
  if (!message || message.trim() === '') {
    return { isValid: false, error: getValidationMessage('message.required', {}, locale) };
  }
  
  if (message.trim().length < 10) {
    return { isValid: false, error: getValidationMessage('message.minLength', {}, locale) };
  }
  
  if (message.trim().length > 1000) {
    return { isValid: false, error: getValidationMessage('message.maxLength', {}, locale) };
  }
  
  return { isValid: true, error: '' };
}

/**
 * Validador completo del formulario
 * @param {Object} formData - Datos del formulario
 * @returns {Object} - Objeto con isValid y errors
 */
export function validateForm(formData) {
  const errors = {};
  let isValid = true;
  
  // Validar nombre
  const nameValidation = validateName(formData.name);
  if (!nameValidation.isValid) {
    errors.name = nameValidation.error;
    isValid = false;
  }
  
  // Validar email
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
    isValid = false;
  }
  
  // Validar mensaje
  const messageValidation = validateMessage(formData.message);
  if (!messageValidation.isValid) {
    errors.message = messageValidation.error;
    isValid = false;
  }
  
  return { isValid, errors };
}

/**
 * Sanitiza los datos del formulario
 * @param {Object} formData - Datos del formulario
 * @returns {Object} - Datos sanitizados
 */
export function sanitizeFormData(formData) {
  return {
    name: formData.name ? formData.name.trim() : '',
    email: formData.email ? formData.email.trim().toLowerCase() : '',
    message: formData.message ? formData.message.trim() : ''
  };
}

/**
 * Obtiene el conteo de caracteres para un campo
 * @param {string} text - Texto a contar
 * @param {number} maxLength - Longitud máxima
 * @returns {Object} - Objeto con count, max y isNearLimit
 */
export function getCharacterCount(text, maxLength) {
  const count = text ? text.length : 0;
  const isNearLimit = count > maxLength * 0.8; // 80% del límite
  
  return {
    count,
    max: maxLength,
    isNearLimit,
    remaining: maxLength - count
  };
}
