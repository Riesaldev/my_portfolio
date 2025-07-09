import { sanitizeHTML, sanitizeBasicHTML, sanitizeHTMLWithLinks } from '@/lib/htmlSanitizer';

/**
 * Componente seguro para renderizar HTML sanitizado
 * Reemplaza el uso de dangerouslySetInnerHTML con una alternativa más segura
 */
export default function SafeHTML({ 
  content, 
  type = 'basic', 
  className = '',
  tag = 'div',
  allowLinks = false,
  ...props 
}) {
  if (!content) {
    return null;
  }

  let sanitizedContent = '';

  switch (type) {
    case 'basic':
      sanitizedContent = sanitizeBasicHTML(content);
      break;
    case 'links':
      sanitizedContent = sanitizeHTMLWithLinks(content);
      break;
    case 'full':
      sanitizedContent = sanitizeHTML(content);
      break;
    default:
      sanitizedContent = sanitizeBasicHTML(content);
  }

  // Crear el componente dinámicamente con la etiqueta especificada
  const Tag = tag;

  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      {...props}
    />
  );
}

/**
 * Componente para texto seguro con formato básico (br, strong, em)
 */
export function SafeText({ content, className = '', tag = 'div', ...props }) {
  return (
    <SafeHTML
      content={content}
      type="basic"
      className={className}
      tag={tag}
      {...props}
    />
  );
}

/**
 * Componente para contenido con enlaces seguros
 */
export function SafeContent({ content, className = '', tag = 'div', ...props }) {
  return (
    <SafeHTML
      content={content}
      type="links"
      className={className}
      tag={tag}
      {...props}
    />
  );
}
