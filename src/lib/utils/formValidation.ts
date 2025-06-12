import { FieldValues, FieldErrors } from "react-hook-form";

export interface ValidationResult {
  isValid: boolean;
  completedFields: number;
  totalFields: number;
  completionPercentage: number;
  errors: string[];
}

/**
 * Validates form fields and returns completion statistics
 */
export function validateFormFields<T extends FieldValues>(
  fields: Record<string, any>,
  errors: FieldErrors<T>,
  requiredFields?: string[]
): ValidationResult {
  const fieldEntries = Object.entries(fields);
  const totalFields = requiredFields ? requiredFields.length : fieldEntries.length;
  
  const completedFields = fieldEntries.filter(([key, value]) => {
    // Skip validation if field is not in required fields
    if (requiredFields && !requiredFields.includes(key)) {
      return true;
    }
    
    // Check if field has a value
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    
    if (typeof value === 'object' && value !== null) {
      return Object.keys(value).length > 0;
    }
    
    return !!value;
  }).length;

  const validationErrors = Object.entries(errors)
    .filter(([key]) => !requiredFields || requiredFields.includes(key))
    .map(([key, error]) => {
      if (error?.message && typeof error.message === 'string') {
        return error.message;
      }
      return `${key} is invalid`;
    });

  const completionPercentage = totalFields > 0 ? (completedFields / totalFields) * 100 : 0;

  return {
    isValid: completedFields === totalFields && validationErrors.length === 0,
    completedFields,
    totalFields,
    completionPercentage,
    errors: validationErrors,
  };
}

/**
 * Validates a single field value
 */
export function validateField(value: any, fieldName: string): { isValid: boolean; error?: string } {
  if (value === undefined || value === null) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (typeof value === 'string') {
    if (value.trim().length === 0) {
      return { isValid: false, error: `${fieldName} cannot be empty` };
    }
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return { isValid: false, error: `${fieldName} must have at least one item` };
    }
  }

  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    if (Object.keys(value).length === 0) {
      return { isValid: false, error: `${fieldName} must have at least one property` };
    }
  }

  return { isValid: true };
}

/**
 * Validates email format
 */
export function validateEmail(email: string): { isValid: boolean; error?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email.trim()) {
    return { isValid: false, error: "Email is required" };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }
  
  return { isValid: true };
}

/**
 * Validates password strength
 */
export function validatePassword(password: string): { isValid: boolean; error?: string } {
  if (!password) {
    return { isValid: false, error: "Password is required" };
  }
  
  if (password.length < 8) {
    return { isValid: false, error: "Password must be at least 8 characters long" };
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, error: "Password must contain at least one lowercase letter" };
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, error: "Password must contain at least one uppercase letter" };
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, error: "Password must contain at least one number" };
  }
  
  return { isValid: true };
}

/**
 * Validates age input
 */
export function validateAge(age: number | undefined): { isValid: boolean; error?: string } {
  if (age === undefined || age === null) {
    return { isValid: false, error: "Age is required" };
  }
  
  if (age <= 0) {
    return { isValid: false, error: "Age must be greater than 0" };
  }
  
  if (age > 150) {
    return { isValid: false, error: "Age must be less than 150" };
  }
  
  return { isValid: true };
}

/**
 * Validates URL format
 */
export function validateUrl(url: string): { isValid: boolean; error?: string } {
  if (!url.trim()) {
    return { isValid: false, error: "URL is required" };
  }
  
  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, error: "Please enter a valid URL" };
  }
} 