"use client";
import { useState } from 'react';
import { useI18n } from './I18nProvider';
import { useFormValidation } from '../hooks/useFormValidation';
import { FormField, SubmitButton, ErrorMessage, SuccessMessage } from './FormComponents';

export default function ContactForm() {
  const { t } = useI18n();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  
  const {
    formData,
    fieldErrors,
    touched,
    isFormValid,
    validateAllFields,
    resetForm,
    getFieldProps
  } = useFormValidation({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    const validation = validateAllFields();
    
    if (!validation.isValid) {
      setSubmitting(false);
      setError(t('contact.error'));
      return;
    }
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validation.sanitizedData),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setSubmitted(true);
        resetForm();
      } else {
        setError(result.error || t('contact.error'));
      }
    } catch (err) {
      setError(t('contact.error'));
      console.error('Error al enviar formulario:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const hasTouchedFields = Object.keys(touched).length > 0;

  return (
    <div className="mt-4 p-4 bg-amber-50/30 rounded-lg border border-amber-800/20">
      {submitted ? (
        <SuccessMessage 
          message={t('contact.success')}
          onDismiss={() => setSubmitted(false)}
          actionText={t('contact.send')}
        />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-10">
          <FormField
            label={t('contact.name')}
            name="name"
            type="text"
            required
            maxLength={50}
            minLength={2}
            placeholder={t('contact.placeholder.name')}
            fieldProps={getFieldProps('name')}
            error={fieldErrors.name}
            autoFocus={true}
          />
          
          <FormField
            label={t('contact.email')}
            name="email"
            type="email"
            required
            placeholder={t('contact.placeholder.email')}
            fieldProps={getFieldProps('email')}
            error={fieldErrors.email}
          />
          
          <FormField
            label={t('contact.message')}
            name="message"
            type="textarea"
            required
            rows={4}
            maxLength={1000}
            minLength={10}
            placeholder={t('contact.placeholder.message')}
            fieldProps={getFieldProps('message')}
            error={fieldErrors.message}
          />
          
          <ErrorMessage error={error} />
          
          <SubmitButton 
            isSubmitting={submitting}
            isFormValid={isFormValid}
            hasTouchedFields={hasTouchedFields}
            submittingText={t('contact.sending')}
          >
            {t('contact.send')}
          </SubmitButton>
        </form>
      )}
    </div>
  );
}