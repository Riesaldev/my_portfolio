
export function getValidationMessage(key, params = {}, locale = 'es') {
  const messages = {
    es: {
      'name.required': 'El nombre es requerido',
      'name.minLength': 'El nombre debe tener al menos 2 caracteres',
      'name.maxLength': 'El nombre no puede tener más de 50 caracteres',
      'name.invalid': 'El nombre solo puede contener letras y espacios',
      'email.required': 'El email es requerido',
      'email.maxLength': 'El email no puede tener más de 100 caracteres',
      'email.invalid': 'El formato del email no es válido',
      'message.required': 'El mensaje es requerido',
      'message.minLength': 'El mensaje debe tener al menos 10 caracteres',
      'message.maxLength': 'El mensaje no puede tener más de 1000 caracteres'
    },
    en: {
      'name.required': 'Name is required',
      'name.minLength': 'Name must have at least 2 characters',
      'name.maxLength': 'Name cannot have more than 50 characters',
      'name.invalid': 'Name can only contain letters and spaces',
      'email.required': 'Email is required',
      'email.maxLength': 'Email cannot have more than 100 characters',
      'email.invalid': 'Email format is not valid',
      'message.required': 'Message is required',
      'message.minLength': 'Message must have at least 10 characters',
      'message.maxLength': 'Message cannot have more than 1000 characters'
    }
  };

  let message = messages[locale]?.[key] || messages['es'][key] || key;
  
  // Reemplazar parámetros
  Object.keys(params).forEach(param => {
    message = message.replace(`{{${param}}}`, params[param]);
  });
  
  return message;
}

// Función para detectar el idioma actual del navegador o localStorage
export function getCurrentLocale() {
  if (typeof window === 'undefined') return 'es';
  
  return localStorage.getItem('preferred-language') || 
         navigator.language?.split('-')[0] || 
         'es';
}
