import DOMPurify from 'isomorphic-dompurify';

/**
 * Configuración segura para DOMPurify
 */
const SAFE_HTML_CONFIG = {
  // Etiquetas HTML permitidas
  ALLOWED_TAGS: [
    'p', 'br', 'strong', 'em', 'b', 'i', 'u', 
    'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'a'
  ],
  // Atributos permitidos
  ALLOWED_ATTR: ['class', 'href', 'target'],
  // No permitir JavaScript
  FORBID_ATTR: ['onclick', 'onload', 'onerror', 'onmouseover'],
  // No permitir scripts
  FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input'],
  // Remover elementos peligrosos completamente
  FORBID_CONTENTS: ['script'],
};

/**
 * Sanitiza HTML de forma segura
 * @param {string} html - HTML a sanitizar
 * @param {object} options - Opciones adicionales para DOMPurify
 * @returns {string} HTML sanitizado y seguro
 */
export function sanitizeHTML(html, options = {}) {
  if (typeof window === 'undefined') {
    // En el servidor, retornar el texto sin HTML
    return html?.replace(/<[^>]*>/g, '') || '';
  }

  if (!html || typeof html !== 'string') {
    return '';
  }

  // Combinar configuración por defecto con opciones personalizadas
  const config = { ...SAFE_HTML_CONFIG, ...options };

  try {
    return DOMPurify.sanitize(html, config);
  } catch (error) {
    console.warn('Error sanitizando HTML:', error);
    // En caso de error, retornar texto sin HTML
    return html.replace(/<[^>]*>/g, '');
  }
}

/**
 * Sanitiza HTML para contenido de texto básico (solo br, strong, em)
 * @param {string} html - HTML a sanitizar
 * @returns {string} HTML sanitizado con etiquetas básicas
 */
export function sanitizeBasicHTML(html) {
  return sanitizeHTML(html, {
    ALLOWED_TAGS: ['br', 'strong', 'em', 'b', 'i', 'span'],
    ALLOWED_ATTR: ['class']
  });
}

/**
 * Sanitiza HTML para enlaces (permite a, br, strong, em)
 * @param {string} html - HTML a sanitizar  
 * @returns {string} HTML sanitizado con enlaces seguros
 */
export function sanitizeHTMLWithLinks(html) {
  return sanitizeHTML(html, {
    ALLOWED_TAGS: ['a', 'br', 'strong', 'em', 'b', 'i', 'span'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    // Asegurar que los enlaces externos abran en nueva pestaña de forma segura
    ADD_ATTR: { 'target': '_blank', 'rel': 'noopener noreferrer' }
  });
}

/**
 * Escapar HTML completamente (convierte < > & " ' en entidades)
 * @param {string} text - Texto a escapar
 * @returns {string} Texto con caracteres HTML escapados
 */
export function escapeHTML(text) {
  if (!text || typeof text !== 'string') {
    return '';
  }

  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Validar que el contenido HTML es seguro antes de renderizar
 * @param {string} html - HTML a validar
 * @returns {boolean} true si es seguro, false si contiene elementos peligrosos
 */
export function isHTMLSafe(html) {
  if (!html || typeof html !== 'string') {
    return true;
  }

  // Patrones peligrosos a detectar
  const dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /data:/gi,
    /vbscript:/gi,
    /on\w+\s*=/gi, // onclick, onload, etc.
    /<iframe\b/gi,
    /<object\b/gi,
    /<embed\b/gi,
    /<form\b/gi,
    /<input\b/gi
  ];

  return !dangerousPatterns.some(pattern => pattern.test(html));
}

export default {
  sanitizeHTML,
  sanitizeBasicHTML,
  sanitizeHTMLWithLinks,
  escapeHTML,
  isHTMLSafe
};
