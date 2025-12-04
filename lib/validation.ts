/**
 * Form validation utilities for Koeo marketing website
 */

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message: string;
}

export interface FieldValidation {
  [fieldName: string]: ValidationRule[];
}

/**
 * Validates an email address format
 * @param email - The email string to validate
 * @returns Error message if invalid, undefined if valid
 */
export function validateEmail(email: string): string | undefined {
  if (!email || email.trim() === '') {
    return undefined; // Let validateRequired handle empty check
  }
  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return 'Please enter a valid email address';
  }
  
  return undefined;
}

/**
 * Validates that a field is not empty
 * @param value - The value to check
 * @param fieldName - The name of the field for error message
 * @returns Error message if empty, undefined if valid
 */
export function validateRequired(value: string, fieldName: string): string | undefined {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  return undefined;
}

/**
 * Validates minimum length of a string
 * @param value - The value to check
 * @param minLength - Minimum required length
 * @param fieldName - The name of the field for error message
 * @returns Error message if too short, undefined if valid
 */
export function validateMinLength(
  value: string,
  minLength: number,
  fieldName: string
): string | undefined {
  if (value && value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return undefined;
}


/**
 * Validates a single field against its validation rules
 * @param value - The field value
 * @param rules - Array of validation rules
 * @returns First error message found, or undefined if valid
 */
export function validateField(value: string, rules: ValidationRule[]): string | undefined {
  for (const rule of rules) {
    if (rule.required && (!value || value.trim() === '')) {
      return rule.message;
    }
    
    if (rule.minLength && value && value.length < rule.minLength) {
      return rule.message;
    }
    
    if (rule.maxLength && value && value.length > rule.maxLength) {
      return rule.message;
    }
    
    if (rule.pattern && value && !rule.pattern.test(value)) {
      return rule.message;
    }
  }
  
  return undefined;
}

/**
 * Validates all fields in a form against their validation rules
 * @param formData - Object containing field names and values
 * @param validationRules - Object mapping field names to validation rules
 * @returns Array of validation errors, empty if all valid
 */
export function validateForm(
  formData: Record<string, string>,
  validationRules: FieldValidation
): ValidationError[] {
  const errors: ValidationError[] = [];
  
  for (const [fieldName, rules] of Object.entries(validationRules)) {
    const value = formData[fieldName] || '';
    const error = validateField(value, rules);
    
    if (error) {
      errors.push({ field: fieldName, message: error });
    }
  }
  
  return errors;
}

/**
 * Beta form validation rules
 */
export const BETA_FORM_VALIDATION: FieldValidation = {
  name: [
    { required: true, message: 'Full name is required' },
    { minLength: 2, message: 'Name must be at least 2 characters' },
  ],
  email: [
    { required: true, message: 'Work email is required' },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email' },
  ],
  company: [
    { required: true, message: 'Company or project is required' },
  ],
  role: [
    { required: true, message: 'Your role is required' },
  ],
  useCase: [
    { required: true, message: 'Please describe your AI use case' },
    { minLength: 20, message: 'Please provide more detail (at least 20 characters)' },
  ],
};
