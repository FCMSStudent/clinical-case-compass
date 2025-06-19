import { useMemo } from 'react';
import { useFormContext, FieldValues, FieldErrors } from 'react-hook-form';
import { validateFormFields, ValidationResult } from '@/lib/utils/formValidation';

export interface UseFormValidationOptions {
  requiredFields?: string[];
  watchFields?: string[];
}

export function useFormValidation<T extends FieldValues>(options: UseFormValidationOptions = {}) {
  const { watch, formState } = useFormContext<T>();
  const { errors } = formState;
  
  // Watch specific fields if provided, otherwise watch all fields
  const watchedFields = options.watchFields 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? watch(options.watchFields as any) // Complex react-hook-form typing requires any here
    : watch();
  
  const validationResult = useMemo<ValidationResult>(() => {
    return validateFormFields<T>(
      watchedFields,
      errors,
      options.requiredFields
    );
  }, [watchedFields, errors, options.requiredFields]);
  
  return {
    ...validationResult,
    errors,
    watchedFields,
  };
} 
