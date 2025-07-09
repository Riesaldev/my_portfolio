import { getCharacterCount } from '../lib/formValidator';

/**
 * Componente de campo de entrada reutilizable con validación
 */
export function FormField({ 
  label, 
  name, 
  type = 'text', 
  required = false, 
  maxLength,
  minLength,
  rows,
  fieldProps,
  error,
  placeholder,
  autoFocus = false
}) {
  const isTextarea = type === 'textarea';
  const Component = isTextarea ? 'textarea' : 'input';
  
  const characterCount = maxLength ? getCharacterCount(fieldProps.value, maxLength) : null;

  return (
    <div>
      <label htmlFor={name} className="block text-amber-900 mb-4 font-bold text-3xl leading-tight">
        {label}
        {required && <span className="text-red-500 ml-3 text-4xl">*</span>}
      </label>
      
      <Component
        id={name}
        type={isTextarea ? undefined : type}
        rows={isTextarea ? rows : undefined}
        placeholder={placeholder}
        required={required}
        autoFocus={autoFocus}
        {...fieldProps}
      />
      
      {error && (
        <p className="mt-4 text-2xl text-red-600 font-bold bg-red-50 px-5 py-4 rounded-lg border-l-8 border-red-400 shadow-lg leading-relaxed">{error}</p>
      )}
      
      {characterCount && (
        <div className="mt-4 text-xl text-amber-700 bg-amber-50/70 px-5 py-4 rounded-lg border border-amber-300 shadow-md">
          <span className={characterCount.isNearLimit ? 'text-orange-600 font-bold text-2xl' : 'font-bold'}>
            {characterCount.count}/{characterCount.max} caracteres
          </span>
          {minLength && characterCount.count < minLength && (
            <span className="text-red-600 ml-5 font-bold text-2xl">
              Mínimo {minLength} caracteres
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Componente de botón de envío con validación
 */
export function SubmitButton({ 
  isSubmitting, 
  isFormValid, 
  hasTouchedFields, 
  children = 'Enviar',
  submittingText = 'Enviando...'
}) {
  const isDisabled = isSubmitting || !isFormValid;
  
  return (
    <div>
      <button 
        type="submit" 
        className={`w-full px-6 py-3 text-4xl rounded-lg transition-all duration-200 font-semibold shadow-md ${
          isDisabled
            ? 'bg-fuchsia-700 cursor-not-allowed text-gray-200 shadow-none' 
            : 'bg-fuchsia-500 hover:bg-fuchsia-600 hover:shadow-xl hover:shadow-fuchsia-400 active:transform active:scale-95'
        } text-white`}
        disabled={isDisabled}
      >
        {isSubmitting ? submittingText : children}
      </button>
      
      {!isFormValid && hasTouchedFields && (
        <p className="mt-5 text-2xl text-amber-700 font-bold bg-amber-50 px-5 py-4 rounded-lg border-l-8 border-amber-400 shadow-lg leading-relaxed">
          Por favor completa todos los campos correctamente
        </p>
      )}
    </div>
  );
}

/**
 * Componente de mensaje de error general
 */
export function ErrorMessage({ error }) {
  if (!error) return null;
  
  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-lg border-l-8 border-l-red-400 shadow-lg">
      <p className="text-red-700 text-2xl font-bold leading-relaxed">{error}</p>
    </div>
  );
}

/**
 * Componente de mensaje de éxito
 */
export function SuccessMessage({ message, onDismiss, actionText = 'Continuar' }) {
  return (
    <div className="text-center py-6">
      <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg shadow-lg">
        <p className="text-green-700 font-bold text-2xl leading-relaxed">{message}</p>
      </div>
      {onDismiss && (
        <button 
          onClick={onDismiss}
          className="px-8 py-4 text-2xl font-bold bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
